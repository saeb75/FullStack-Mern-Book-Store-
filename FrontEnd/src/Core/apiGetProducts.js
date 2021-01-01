import queryString from "query-string";

export const getProducts = (sortBy) => {
  return fetch(
    `http://localhost:8000/api/products?sortBy=${sortBy}&orderBy=desc&limit=6`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const getCategories = () => {
  return fetch(`http://localhost:8000/api/catogories`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const getFilterProduct = (skip, limit, filters = {}) => {
  let data = {
    skip,
    limit,
    filters,
  };
  return fetch(`http://localhost:8000/api/products/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const list = (params) => {
  const query = queryString.stringify(params);

  return fetch(`http://localhost:8000/api/products/search?${query}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const read = (id) => {
  return fetch(`http://localhost:8000/api/product/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const listRealeted = (productId) => {
  return fetch(`http://localhost:8000/api/products/related/${productId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
