// importing methods

const {
  client,
  createUser,
  createProduct,
  createWishlist,
  createOrder,
  createFavorites,
  fetchUsers,
  fetchProducts,
  fetchWishlist,
  fetchOrders,
  fetchFavorites,
  banUser,
  authorizeUser,
  deleteUser,
  deleteProduct,
  deleteWishlist,
  deleteOrder,
  deleteFavorite,
} = require("./db");

// import express and store in app

const express = require("express");
const app = express();

// json parsing middleware

app.use(express.json());

// init function

const init = async () => {};

// invoke init

init();

// ROUTES

// GET

app.get("", async (req, res, next) => {});
app.get("", async (req, res, next) => {});
app.get("", async (req, res, next) => {});
app.get("", async (req, res, next) => {});
app.get("", async (req, res, next) => {});

// POST

app.post("", async (req, res, next) => {});
app.post("", async (req, res, next) => {});
app.post("", async (req, res, next) => {});
app.post("", async (req, res, next) => {});
app.post("", async (req, res, next) => {});
app.post("", async (req, res, next) => {});

// DELETE

app.delete("", async (req, res, next) => {});
app.delete("", async (req, res, next) => {});
app.delete("", async (req, res, next) => {});
app.delete("", async (req, res, next) => {});
app.delete("", async (req, res, next) => {});
