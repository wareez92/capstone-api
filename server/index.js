// importing methods

const {
  client,
  createUser,
  createProduct,
  createWishlist,
  createOrder,
  createFavorite,
  createTables,
  fetchUsers,
  fetchProducts,
  fetchWishlist,
  fetchOrders,
  fetchFavorites,
  banUser,
  authorizeUser,
  deleteUser,
  deleteProduct,
  deleteFromWishlist,
  deleteOrder,
  deleteFavorite,
} = require("./db");

// import express and store in app

const express = require("express");
const app = express();

// json parsing middleware

app.use(express.json());

// init function

const init = async () => {
  // connect to databases

  console.log("connecting to database...");
  await client.connect();
  console.log("connected to the database");

  // instantiate tables

  await createTables();

  // add dummy users

  const [jill, robin, kelechi, Elyran] = await Promise.all([
    createUser({
      username: "jill",
      password: "S3cr3t",
      address: "555 West nomans str",
      phone: "1(800)-222-2222",
    }),
    createUser({
      username: "robin",
      password: "S3cr3t",
      address: "555 West nomans str",
      phone: "1(800)-333-3333",
    }),
    createUser({
      username: "kelechi",
      password: "S3cr3t",
      address: "555 West nomans str",
      phone: "1(800)-444-4444",
    }),
    createUser({
      username: "Elyran",
      password: "S3cr3t",
      address: "555 West nomans str",
      phone: "1(800)-555-5555",
    }),
  ]);

  // products

  const [
    microbrute,
    virus,
    micron,
    microfreak,
    monologue,
    hydrasynth,
    opsix,
    mininova,
  ] = await Promise.all([
    createProduct({
      name: "microbrute",
      price: "$199.99",
      details: "",
      quantity: "20",
    }),
    createProduct({
      name: "virus",
      price: "2,929.99",
      details: "",
      quantity: "20",
    }),
    createProduct({
      name: "micron",
      price: "$299.99",
      details: "",
      quantity: "20",
    }),
    createProduct({
      name: "microfreak",
      price: "$349.99",
      details: "",
      quantity: "20",
    }),
    createProduct({
      name: "monologue",
      price: "$369.99",
      details: "",
      quantity: "20",
    }),
    createProduct({
      name: "hydrasynth",
      price: "$599.99",
      details: "",
      quantity: "20",
    }),
    createProduct({
      name: "opsix",
      price: "$749.99",
      details: "",
      quantity: "20",
    }),
    createProduct({
      name: "mininova",
      price: "$449.99",
      details: "",
      quantity: "20",
    }),
  ]);

  console.log("o------ TABLES ------o");
  console.log("---users---");
  console.log(await fetchUsers());
  console.log("---products---");
  console.log(await fetchProducts());

  // create a port and a listener

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

// invoke init

init();

// ROUTES

// GET

// fetchUsers

app.get("/api/users", async (req, res, next) => {
  try {
    res.send(await fetchUsers());
  } catch (error) {
    next(error);
  }
});

// fetchProducts

app.get("/api/product", async (req, res, next) => {
  try {
    res.send(await fetchProducts());
  } catch (error) {
    next(error);
  }
});

// fetchFavorites

app.get("/api/users/:id/favorites", async (req, res, next) => {
  try {
    const SQL = ` SELECT * FROM favorites WHERE id= $1
                  AND user_id = $2 `;
    const response = await client.query(SQL, [req.params.id, req.body.user_id]);
  } catch (error) {
    next(error);
  }
});

app.get("/api/users/:id/wishlist", async (req, res, next) => {});
app.get("/api/users/:id/cart", async (req, res, next) => {});

// POST

app.post("/api/", async (req, res, next) => {});
app.post("/api/", async (req, res, next) => {});
app.post("/api/", async (req, res, next) => {});
app.post("/api/", async (req, res, next) => {});
app.post("/api/", async (req, res, next) => {});
app.post("/api/", async (req, res, next) => {});

// DELETE

app.delete("/api/", async (req, res, next) => {});
app.delete("/api/", async (req, res, next) => {});
app.delete("/api/", async (req, res, next) => {});
app.delete("/api/", async (req, res, next) => {});
app.delete("/api/", async (req, res, next) => {});
