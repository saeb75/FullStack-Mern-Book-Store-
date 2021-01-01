import { API } from "./../Config";

import React from "react";

export const signUp = (user) => {
  return fetch(`http://localhost:8000/api/signup `, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  return fetch(` http://localhost:8000/api/signin `, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const SignOut = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");

    next();

    return fetch(` http://localhost:8000/api/signout `, {
      method: "get",
    })
      .then((res) => {
        console.log("SignOut");
      })
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (
    JSON.parse(localStorage.getItem("jwt")) &&
    JSON.parse(localStorage.getItem("jwt")).token
  ) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    SignOut(() => {
      console.log("");
    });
    localStorage.removeItem("jwt");
    return false;
  }
};
