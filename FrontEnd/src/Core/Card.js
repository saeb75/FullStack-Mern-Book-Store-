import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImages from "./ShowImages";
import moment from "moment";
import "./App.css";
import {
  addItem,
  RemoveItem,
  updateItem,
  showRemoveButton,
} from "./cartHelper";

const Card = ({
  product,
  showViewProduct,
  showAddCart,
  cartUpdate = false,
  showRemoveButton = false,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shoudRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const handleChange = productId => e => {
    setCount(e.target.value < 1 ? 1 : e.target.value);
    if (e.target.value >= 1) {
      updateItem(productId, e.target.value);
    }
  };
  const showCartUpdateOption = cartUpdate => {
    return (
      <div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Adjust Quantity</span>
          </div>
          <input
            type="number"
            className="form-control"
            value={count}
            onChange={handleChange(product._id)}
          />
        </div>
      </div>
    );
  };
  return (
    <div className={`mb-3 ${showViewProduct ? "col-12 " : "col-4"}`}>
      <div className="card">
        <div className="card-header bg-primary text-white">{product.name}</div>
        <div className="card-body">
          <ShowImages item={product} URL="product" />
          <p className="lead mt-2">{product.description}</p>
          <p className="black-9">{product.price}</p>
          <p className="black-8">
            Catogery : {product.catogory && product.catogory.name}
          </p>
          {shoudRedirect(redirect)}
          <p className="black-8">
            Added on {moment(product.createdAt).fromNow()}
          </p>
          {product.quantity > 0 ? (
            <span className="badge badge-primary bafge-pill">In stock </span>
          ) : (
            <span className="badge badge-primary bafge-pill">Out of stock</span>
          )}
          <br />
          {!showViewProduct ? (
            <button className="btn btn-outline-primary mt-2 mb-2">
              <Link to={`/product/${product._id}`}>View Product</Link>
            </button>
          ) : null}
          {!showAddCart ? (
            <button className="btn btn-outline-warning mt-2 mb-2">
              <Link onClick={addToCart}>Add To Card</Link>
            </button>
          ) : null}
          {showRemoveButton && showCartUpdateOption(cartUpdate)}
          {showRemoveButton && (
            <button
              onClick={() => RemoveItem(product._id)}
              className="btn btn-outline-denger mt-2 mb-2"
            >
              Remove the product
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
