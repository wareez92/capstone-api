// importing methods

const {
  client,
  createUser,
  createProduct,
  createWishlistItem,
  createOrder,
  createFavorite,
  createTables,
  createCartItem,
  fetchUsers,
  fetchProducts,
  fetchWishlist,
  fetchOrders,
  fetchFavorites,
  fetchCart,
  banUser,
  authorizeUser,
  deleteUser,
  deleteProduct,
  deleteFromWishlist,
  deleteOrder,
  deleteFavorite,
  authenticate,
  findUserByToken,
  fetchProduct,
  createUserAndGenerateToken,
  createRating,
} = require("./db");

// import express and store in app

const express = require("express");
const app = express();

// json parsing middleware

app.use(express.json());

// deployment

const path = require("path");
const { send } = require("process");
app.get("/", (req, res) =>
  res.sendFile(
    path.join(__dirname, "../client/synthstorm-react/dist/index.html")
  )
);

app.use(
  "/assets",
  express.static(path.join(__dirname, "../client/synthstorm-react/dist/assets"))
);

// init function

const init = async () => {
  // connect to databases

  console.log("connecting to database...");
  await client.connect();
  console.log("connected to the database");

  // instantiate tables

  // await createTables();

  // add dummy users

  const seedDatabase = async () => {};

  // const [jill, robin, kelechi, Elyran] = await Promise.all([
  //   createUser({
  //     username: "jill",
  //     password: "S3cr3t",
  //     address: "555 West nomans str",
  //     phone: "1(800)-222-2222",
  //   }),
  //   createUser({
  //     username: "robin",
  //     password: "S3cr3t",
  //     address: "555 West nomans str",
  //     phone: "1(800)-333-3333",
  //   }),
  //   createUser({
  //     username: "kelechi",
  //     password: "S3cr3t",
  //     address: "555 West nomans str",
  //     phone: "1(800)-444-4444",
  //   }),
  //   createUser({
  //     username: "Elyran",
  //     password: "S3cr3t",
  //     address: "555 West nomans str",
  //     phone: "1(800)-555-5555",
  //   }),
  // ]);

  // // products

  // const [] = await Promise.all([
  //   createProduct({
  //     name: "microbrute",
  //     img: "https://media.sweetwater.com/m/products/image/09ef4b6b86eNmKtR0UJlzbuShj1e4zpLRU0afa85.jpg?quality=82&width=750&ha=09ef4b6b86eb4bb9",
  //     price: 199.99,
  //     details: "",
  //     quantity: 8,
  //   }),
  //   createProduct({
  //     name: "virus",
  //     img: "https://media.sweetwater.com/m/products/image/791b586f8cMIlzf8ZP1kDe0NStdw4h6gIRg9TZfj.jpg?quality=82&width=750&ha=791b586f8c81927c",
  //     price: 2929.99,
  //     details: "",
  //     quantity: 3,
  //   }),
  //   createProduct({
  //     name: "micron",
  //     img: "https://media.sweetwater.com/api/i/q-82__w-750__f-webp__ha-2a7e6864b6507588__hmac-dc8fbf74995eb5e447147dbad88a6015a2e5561c/images/items/750/Micron-large.jpg.auto.webp",
  //     price: 299.99,
  //     details: "",
  //     quantity: 4,
  //   }),
  //   createProduct({
  //     name: "microfreak",
  //     img: "https://media.sweetwater.com/m/products/image/5596c24efeOZRE6DgDhE5sdjFWqw4e0atlnSfuAb.jpg?quality=82&width=750&ha=5596c24efe511dba",
  //     price: 349.99,
  //     details: "",
  //     quantity: 8,
  //   }),
  //   createProduct({
  //     name: "monologue",
  //     img: "https://media.sweetwater.com/m/products/image/5299620bc772QuI7U1iOdjQd3oIkVCWQ9F8O7SUn.jpg?quality=82&width=750&ha=5299620bc75d601d",
  //     price: 369.99,
  //     details: "",
  //     quantity: 6,
  //   }),
  //   createProduct({
  //     name: "hydrasynth",
  //     img: "https://media.sweetwater.com/m/products/image/5f260e3842zTojuMrFI194SBttja9tCQ501LN6RR.jpg?quality=82&width=750&ha=5f260e3842b7ac33",
  //     price: 599.99,
  //     details: "",
  //     quantity: 5,
  //   }),
  //   createProduct({
  //     name: "opsix",
  //     img: "https://media.sweetwater.com/m/products/image/9b2de4e8d9ZdFTTjl0X3B6hVCU3X0DbsX0VM5Cmm.jpg?quality=82&width=750&ha=9b2de4e8d9840f50",
  //     price: 749.99,
  //     details: "",
  //     quantity: 7,
  //   }),
  //   createProduct({
  //     name: "mininova",
  //     img: "https://media.sweetwater.com/m/products/image/fbcef721c79n4bPKOgnwkphyNlCIICz8j74LOPOl.jpg?quality=82&width=750&ha=fbcef721c71b0984",
  //     price: 449.99,
  //     details: "",
  //     quantity: 3,
  //   }),
  //   createProduct({
  //     name: "Bass Station",
  //     img: "https://media.sweetwater.com/m/products/image/286064d053BQTTy0J6kjyrJN5rwbKjIb1w1ZAwvP.jpg?quality=82&width=750&ha=286064d05362d6bd",
  //     price: 449.99,
  //     details: "",
  //     quantity: 7,
  //   }),
  // ]);

  // console.log("o------ TABLES ------o");
  // console.log("---users---");
  // console.log(await fetchUsers());
  // console.log("---products---");
  // console.log(await fetchProducts());

  // create a port and a listener

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

// invoke init

init();

// LOGIN

// isLoggedIn

const isLoggedIn = async (req, res, next) => {
  console.log("is logged in. route is hit");
  try {
    req.users = await findUserByToken(req.headers.authorization);
    next();
  } catch (ex) {
    next(ex);
  }
};
// ROUTES

// GET

//

app.get("/api/auth/me", isLoggedIn, async (req, res, next) => {
  console.log("route hit");
  try {
    res.send(req.users);
  } catch (error) {
    next(ex);
  }
});

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

app.get("/api/product/:id", async (req, res, next) => {
  try {
    res.send(await fetchProduct({ id: req.params.id }));
  } catch (error) {
    next(error);
  }
});

// fetchFavorites

app.get("/api/users/:id/favorites", isLoggedIn, async (req, res, next) => {
  try {
    const SQL = ` SELECT * FROM favorites WHERE id= 1
                  AND user_id = 2 `;
    const response = await client.query(SQL, [req.params.id, req.body.user_id]);
  } catch (error) {
    next(error);
  }
});

app.get("/api/users/:id/wishlist", async (req, res, next) => {});

// fetchCart

app.get("/api/users/:user_id/cart/:product_id", async (req, res, next) => {
  try {
    res.send(await fetchCart(req.params.user_id, req.params.product_id));
  } catch (error) {
    next(ex);
  }
});

// POST

// authenticateLogin

app.post("/api/auth/login", async (req, res, next) => {
  console.log("route hit");
  try {
    res.send(await authenticate(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/register/user", async (req, res, next) => {
  console.log("route hit");
  try {
    res.send(await createUserAndGenerateToken(req.body));
    console.log("o----Users----o");
    console.log(await fetchUsers());
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/users/:user_id/cart", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await fetchCart(req.params.user_id));
  } catch (ex) {
    next(ex);
  }
});

// postCart

app.post("/api/users/:userId/cart/:productId", async (req, res, next) => {
  console.log("route hit");
  try {
    const { userId, productId } = req.params;
    console.log("userId:", userId, "productId:", productId); // Log the IDs

    res.send(
      await createCartItem({
        user_id: userId,
        product_id: productId,
      })
    );
    console.log("o----Carts----o");
    console.log(await fetchCart());
  } catch (ex) {
    console.error("Error in route:", ex); // Log the error
    next(ex);
  }
});

app.post("/api/product/:id/rating", async (req, res, next) => {
      console.log("route hit")
});
app.post("/api/", async (req, res, next) => {});
app.post("/api/", async (req, res, next) => {});
app.post("/api/", async (req, res, next) => {});

// DELETE

app.delete("/api/", async (req, res, next) => {});
app.delete("/api/", async (req, res, next) => {});
app.delete("/api/", async (req, res, next) => {});
app.delete("/api/", async (req, res, next) => {});
app.delete("/api/", async (req, res, next) => {});
