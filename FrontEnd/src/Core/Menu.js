import React from "react";
import { Link, withRouter } from "react-router-dom";
import { SignOut, isAuthenticated } from "../auth";
import UserDashboard from "../user/UserDashboard";
import { itemTotal } from "./cartHelper";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#000" };
  } else {
    return { color: "orange" };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link to="/" style={isActive(history, "/")} className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/shop"
            style={isActive(history, "/shop")}
            className="nav-link"
          >
            Shop
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/cart"
            style={isActive(history, "/shop")}
            className="nav-link"
          >
            Cart{" "}
            <sup className="cart-badge bg-info">
              <small>{itemTotal()}</small>
            </sup>
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              to="/user/dashboard"
              style={isActive(history, "/user/dashboard")}
              className="nav-link"
            >
              {" "}
              Dashboard{" "}
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              to="/admin/dashboard"
              style={isActive(history, "/admin/dashboard")}
              className="nav-link"
            >
              Admin Dashboard{" "}
            </Link>
          </li>
        )}

        {!isAuthenticated() ? (
          <>
            <li className="nav-item">
              <Link
                to="/signup"
                className="nav-link"
                style={isActive(history, "/signup")}
              >
                {" "}
                Signup{" "}
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to={{
                  pathname: "/signin",
                  state: { prevPath: history.location.pathname },
                }}
                className="nav-link"
                style={isActive(history, "/signin")}
              >
                {" "}
                Signin{" "}
              </Link>
            </li>
          </>
        ) : (
          <li className="nav-item">
            <span
              to="/signin"
              className="nav-link"
              onClick={() =>
                SignOut(() => {
                  history.push("/");
                })
              }
              style={{ color: "#fff", cursor: "pointer" }}
            >
              {" "}
              SignOut{" "}
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
