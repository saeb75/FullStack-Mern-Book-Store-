import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "../user/SignIn";
import SignUp from "../user/SignUp";
import Home from "../Core/Home";
import PrivateRout from "../auth/PrivateRout";
import AdminRout from "../auth/AdminRout";
import UserDashboard from "../user/UserDashboard";
import AdminDashboard from "../user/AdminDashboard";
import AddCategory from "../Admin/AddCategory";
import AddProduct from "../Admin/AddProduct";
import Shop from "./../Core/Shop";
import Product from "./../Core/Product";
import { Cart } from "./../Core/Cart";

const Routes = () => {
  useEffect(() => {
    console.log("aylar");
  }, []);
  return (
    <>
      <Router>
        <Switch>
          <AdminRout Component={AdminDashboard} path="/admin/dashboard" exact />
          <Route path="/shop" component={Shop} exact />
          <Route path="/cart" component={Cart} exact />
          <Route path="/product/:productid" component={Product} exact />
          <Route path="/" component={Home} exact />
          <Route path="/signin" component={SignIn} exact />
          <Route path="/signup" component={SignUp} exact />
          <PrivateRout Component={UserDashboard} path="/user/dashboard" exact />
          <PrivateRout Component={AddCategory} path="/create/category" exact />
          <PrivateRout Component={AddProduct} path="/create/product" exact />
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
