const Product = require("./../Models/Product");
const { errorHandler } = require("../Helpers/ErrorHamdler");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const { myProductTransforms } = require("../Transform/userTransform");

exports.productById = (req, res, next, id) => {
  Product.findById(id)
    .populate("catogory")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Not Found A Product With This Id",
        });
      }

      req.product = product;
      console.log(product);
      next();
    });
};

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "desc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()

    .populate("catogory")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Not Found Product",
          succes: false,
        });
      }

      res.json(product);
    });
};

exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find({
    _id: { $ne: req.product._id },
    catogory: req.product.catogory,
  })
    .limit(limit)
    .populate("catogory", "_id name")
    .select("-photo")
    .exec((err, product) => {
      if (err) {
        res.json({
          error: "Not Found",
        });
      }

      res.json({
        data: product,
      });
    });
};

exports.listCatogories = (req, res) => {
  Product.distinct("catogory", {}, (err, catogory) => {
    if (err) {
      res.json({
        error: "Not Found",
      });
    }

    res.json(catogory);
  });
};

exports.searchProduct = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};
  console.log(limit);
  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)

    .populate("catogory")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

exports.searchList = (req, res) => {
  const query = {};

  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };

    if (req.query.catogory && req.query.catogory != "All") {
      query.catogory = req.query.catogory;
    }
    console.log(query);
    Product.find(query)
      .select("-photo")
      .populate("catogory", "_id name")
      .exec((err, product) => {
        if (err) {
          return res.json({
            error: err,
          });
        } else {
          res.json(product);
        }
      });
  }
};

exports.single = (req, res) => {
  req.product.photo = undefined;
  return res.json({
    data: req.product,
    succes: true,
  });
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();

  (form.keepExtensions = true),
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "image dont uploaded",
        });
      }

      const { name, description, price, catogory, quantity, shipping } = fields;

      if (
        !name ||
        !description ||
        !price ||
        !catogory ||
        !quantity ||
        !shipping
      ) {
        return res.status(400).json({
          error: "Fill all fields",
        });
      }

      let product = new Product(fields);

      if (files.photo) {
        product.photo.photoPath = files.photo.path;
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      }

      product.save((err, product) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }

        return res.json({
          Data: product,
          success: true,
        });
      });
    });
};

exports.remove = (req, res) => {
  let product = req.product;

  product.remove((err, product) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.json({
      msg: `${product.name} is deleted`,
    });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();

  (form.keepExtensions = true),
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "image dont uploaded",
        });
      }

      const { name, description, price, catogory, quantity, shipping } = fields;

      if (
        !name ||
        !description ||
        !price ||
        !catogory ||
        !quantity ||
        !shipping
      ) {
        return res.status(400).json({
          Error: "Fill all fields",
        });
      }

      let product = req.product;
      product = _.extend(product, fields);

      if (files.photo) {
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      }

      product.save((err, product) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }

        return res.json({
          Data: product,
          success: true,
        });
      });
    });
};

exports.photo = (req, res, next) => {
  console.log("hello");
  if (req.product.photo.data) {
    res.contentType(req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};
