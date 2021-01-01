import React, { useState, useEffect } from "react";
import Card from "./Card";
import Layout from "./Layout";
import { listRealeted, read } from "../Core/apiGetProducts";
import Search from "./Search";
import { useParams } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [releatedProduct, serRlatedProduct] = useState([]);

  const { productid } = useParams();

  const loadProduct = productId => {
    read(productId).then(data => {
      if (data.error) {
        console.log(data.error);
        setError(data.error);
      } else {
        setProduct(data.data);
      }
    });
  };

  const realatedProduct = productId => {
    listRealeted(productId).then(data => {
      if (data.error) {
        console.log(data.error);
        setError(data.error);
      } else {
        serRlatedProduct(data.data);
      }
    });
  };

  useEffect(() => {
    loadProduct(productid);
    realatedProduct(productid);
    console.log("saeb olurda");
  }, []);

  return (
    <>
      <Layout
        title={product && product.name}
        description={product && product.description}
        classnames="container"
      >
        <div className="row">
          <div className="col-8">
            <h2 className="mb-4"> Single Product</h2>
            {product && product.description && (
              <Card product={product} showViewProduct />
            )}
          </div>

          <div className="col-4 ">
            <h2 className="mb-4"> Realated Products </h2>
            {releatedProduct.map(item => {
              return <Card product={item} showViewProduct />;
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Product;
