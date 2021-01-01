import React, { useState, useEffect } from "react";
import { createProduct } from "../Admin/apiAdmin";
import { getCart, RemoveItem } from "./cartHelper";
import Layout from "./Layout";
import Card from "./Card";
import { Link } from "react-router-dom";
export const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, [items]);

  const showItems = (items) => {
    return (
      <div>
        <h2> Your cart has {`${items.length}`}</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showViewProduct
            showAddCart
            cartUpdate={true}
            showRemoveButton={true}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => {
    return (
      <h2>
        Your cart is empty .<br /> <Link to="/shop"> countinue to shoping</Link>
      </h2>
    );
  };

  return (
    <>
      <Layout
        title="Shoping Cart"
        description="Manage yout cart for Items. Add remove checout or countinue shoping"
        classnames="container"
      >
        <div className="row">
          <div className="col-6">
            {items.length > 0 ? showItems(items) : noItemsMessage()}
          </div>
          <div className="col-6">
            <p>Show Checkout options/shiping adress/total/update quantity</p>
          </div>
        </div>
      </Layout>
    </>
  );
};
