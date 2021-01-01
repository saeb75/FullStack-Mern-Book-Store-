import React, { useState, useEffect } from "react";
import Card from "./Card";
import Layout from "./Layout";
import { getProducts } from "../Core/apiGetProducts";
import Search from "./Search";

const Home = () => {
  const [GetArrivalProduct, setGetArrivalProduct] = useState([]);
  const [GetSellProduct, setGetSellProduct] = useState([]);
  const [error, setError] = useState("");

  const loadingArrivalProduct = () => {
    getProducts("createdAt").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setGetArrivalProduct(data);
      }
    });
  };

  let list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

  list = Array.from(new Set(list.map(item => item.id))).map(id => {
    return list.find(p => p === id);
  });

  const loadingSellProduct = () => {
    getProducts("sold").then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setGetSellProduct(data);
      }
    });
  };

  useEffect(() => {
    loadingSellProduct();
    loadingArrivalProduct();
  }, []);
  return (
    <>
      <Layout
        title="Home Page"
        description="Node React FullStack App"
        classnames="container"
      >
        <Search />
        <h2 className="mb-3 mt-5">New Arrival</h2>
        <div className="row">
          {GetArrivalProduct.map((item, i) => {
            return <Card key={i} product={item} />;
          })}
        </div>

        <h2 className="mb-3 mt-5">Best Seller</h2>
        <div className="row">
          {GetSellProduct.map((item, i) => {
            return <Card key={i} product={item} />;
          })}
        </div>
      </Layout>
    </>
  );
};

export default Home;
