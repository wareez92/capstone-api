// import pg and create client

const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/synthstorm_db"
);

// import uuid and bcrypt

const uuid = require("uuid");
const bcrypt = require("bcrypt");

// import json webtoken and create a secret

const jwt = require("jsonwebtoken");
const JWT = process.env.JWT || "shhh";

// createTables

const createTables = async () => {
  const SQL = ` DROP TABLE IF EXISTS users CASCADE;
                DROP TABLE IF EXISTS products CASCADE;
                DROP TABLE IF EXISTS orders CASCADE;
                DROP TABLE IF EXISTS favorites CASCADE;
                DROP TABLE IF EXISTS wishlist CASCADE;
                DROP TABLE IF EXISTS cart CASCADE;
                    CREATE TABLE users(
                        id UUID PRIMARY KEY,
                        username VARCHAR(50) NOT NULL UNIQUE,
                        password VARCHAR(255) NOT NULL,
                        isAdmin BOOLEAN DEFAULT FALSE,
                        isBanned BOOLEAN DEFAULT FALSE,
                        address VARCHAR(255),
                        phone VARCHAR(50)
                    );  
                    CREATE TABLE products(
                        id UUID PRIMARY KEY,
                        img TEXT,
                        name VARCHAR (50) NOT NULL,
                        price DECIMAL (6,2) NOT NULL,
                        details VARCHAR(255),
                        quantity INTEGER NOT NULL,
                        rating INTEGER, 
                        review VARCHAR(50)
                    );
                    CREATE TABLE orders(
                        id UUID PRIMARY KEY,
                        user_id UUID REFERENCES users(id) NOT NULL,
                        product_id UUID REFERENCES products(id) NOT NULL
                    );
                    CREATE TABLE favorites(
                        id UUID PRIMARY KEY,
                        user_id UUID REFERENCES users(id) NOT NULL,
                        product_id UUID REFERENCES products(id) NOT NULL,
                        CONSTRAINT user_id_product_id_favorite UNIQUE (user_id, product_id)
                    );
                    CREATE TABLE wishlist(
                        id UUID PRIMARY KEY,
                        user_id UUID REFERENCES users(id) NOT NULL,
                        product_id UUID REFERENCES products(id) NOT NULL,
                        CONSTRAINT unique_user_product_wishlist UNIQUE (user_id, product_id)
                    );
                    CREATE TABLE cart(
                        id UUID PRIMARY KEY,
                        user_id UUID REFERENCES users(id) NOT NULL,
                        product_id UUID REFERENCES products(id) NOT NULL
                    );
            `;
  await client.query(SQL);
};

// CREATE

// createUser

const createUser = async ({ username, password, address, phone }) => {
  const SQL = ` INSERT INTO users (id, username, password, address, phone) 
                VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const response = await client.query(SQL, [
    uuid.v4(),
    username,
    await bcrypt.hash(password, 5),
    address,
    phone,
  ]);
  return response.rows[0];
};

// createCart

const createCart = async ({ user_id }) => {
  const SQL = ` INSERT INTO cart (id, user_id)
                VALUES ($1, $2) RETURNING *`;
  const response = await client.query(SQL, [uuid.v4(), user_id]);
  return response.rows[0];
};

// createProduct

const createProduct = async ({
  name,
  img,
  price,
  details,
  quantity,
  rating,
  review,
}) => {
  const SQL = ` INSERT INTO products (id, name, img, price, details, quantity, rating, review) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) `;
  const response = await client.query(SQL, [
    uuid.v4(),
    name,
    img,
    price,
    details,
    quantity,
    rating,
    review,
  ]);
  return response.rows[0];
};

// createWishlist

const createWishlistItem = async ({ user_id, product_id }) => {
  const SQL = ` INSERT INTO wishlist (id, user_id, product_id) 
                VALUES ($1, $2, $3) 
                RETURNING *`;
  const response = await client.query(SQL, [uuid.v4(), user_id, product_id]);
  return response.rows[0];
};

// createCartItem

const createCartItem = async ({ user_id, product_id }) => {
  const SQL = ` INSERT INTO cart (id, user_id, product_id)
                VALUES ($1, $2, $3)
                RETURNING *`;
  const response = await client.query(SQL, [uuid.v4(), user_id, product_id]);
  return response.rows[0];
};

// createOrder

const createOrder = async ({ user_id, product_id }) => {
  const SQL = ` INSERT INTO orders (id, user_id, product_id) 
                VALUES ($1, $2, $3) 
                RETURNING *`;
  const response = await client.query(SQL, [uuid.v4(), user_id, product_id]);
  return response.rows[0];
};

// createFavorite

const createFavorite = async ({ user_id, product_id }) => {
  const SQL = ` INSERT INTO favorite (user_id, product_id) 
                VALUES ($1, $2, $3) 
                RETURNING *`;
  const response = await client.query(SQL, [uuid.v4(), user_id, product_id]);
  return response.rows[0];
};

// AUTHENTICATION

// authenticate

const authenticate = async ({ username, password }) => {
  console.log(username, password);
  const SQL = ` SELECT id, password
                FROM users
                WHERE username = $1`;
  const response = await client.query(SQL, [username]);
  if (
    !response.rows.length ||
    (await bcrypt.compare(password, response.rows[0].password)) === false
  ) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  const token = jwt.sign({ id: response.rows[0].id }, JWT);
  return { token };
};

// findUserByToken

const findUserByToken = async (token) => {
  console.log(token);
  let id;
  try {
    const payload = jwt.verify(token, JWT);
    id = payload.id;
  } catch (ex) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  const SQL = ` SELECT id, username
                FROM users
                WHERE id = $1`;
  const response = await client.query(SQL, [id]);
  if (!response.rows.length) {
    const error = Error("not authorized");
    error.status = 401;

    throw error;
  }
  console.log(response.rows[0]);
  return response.rows[0];
};

// createUserandGenerateToken

const createUserAndGenerateToken = async ({
  username,
  password,
  address,
  phone,
}) => {
  const user = await createUser({ username, password, address, phone });
  const token = jwt.sign({ id: user.id }, JWT);
  return { token };
};

// READ

// fetchUsers

const fetchUsers = async () => {
  const SQL = ` SELECT * FROM users`;
  const response = await client.query(SQL);
  return response.rows;
};

// fetchProducts

const fetchProducts = async () => {
  console.log("fetch products route is hit");
  const SQL = ` SELECT * FROM products`;
  const response = await client.query(SQL);
  console.log(response.rows);
  return response.rows;
};

// fetchProduct

const fetchProduct = async ({ id }) => {
  console.log("fetch product route is hit");
  const SQL = ` SELECT * FROM products WHERE id = $1`;
  const response = await client.query(SQL, [id]);
  console.log(response.rows[0]);
  return response.rows[0];
};

// fetchWishlist

const fetchWishlist = async () => {
  const SQL = ` SELECT * FROM wishlist`;
  const response = await client.query(SQL);
  return response.rows;
};

// fetchOrders

const fetchOrders = async () => {
  const SQL = ` SELECT * FROM orders`;
  const response = await client.query(SQL);
  return response.rows;
};

// fetchFavorites

const fetchFavorites = async ({ user_id }) => {
  const SQL = ` SELECT * FROM favorites`;
  const response = await client.query(SQL);
  return response.rows;
};

// fetchCart

const fetchCart = async ({ user_id }) => {
  const SQL = ` SELECT * FROM cart 
                WHERE user_id = $1`;
  const response = await client.query(SQL, [id_]);
  return response.rows;
};

// UPDATE

// banUser

const banUser = async ({ id, username }) => {
  const SQL = ` UPDATE users 
                SET isBanned = true 
                WHERE id = $1 
                AND username = $2`;
  const response = await client.query(SQL, [uuid.v4(), username]);
  return response.rows;
};

// authorizeUser

const authorizeUser = async ({ id, username }) => {
  const SQL = ` UPDATE users 
                SET isAdmin = true
                WHERE id = $1
                AND username`;
  const response = await client.query(SQL, [uuid.v4(), username]);
  return response.rows;
};

// DELETE

// deleteUser

const deleteUser = async ({ id, username }) => {
  const SQL = ` DELETE FROM users 
                WHERE id = $1
                AND username = $2`;
  await client.query(SQL, [uuid.v4(), username]);
};

// deleteProduct

const deleteProduct = async ({ id, name }) => {
  const SQL = ` DELETE FROM products 
                  WHERE id = $1
                  AND name = $2`;
  await client.query(SQL, [uuid.v4(), name]);
};

// deleteFromWishlist

const deleteFromWishlist = async ({ id, user_id, product_id }) => {
  const SQL = ` DELETE FROM wishlist 
                  WHERE product_id = $1
                    AND user_id = $2
                    AND product_id = $4`;
  await client.query(SQL, [uuid.v4(), user_id, product_id]);
};

// deleteOrder

const deleteOrder = async ({ id, user_id, product_id }) => {
  const SQL = ` DELETE FROM orders
                  WHERE id = $1 
                  AND user_id = $2
                  AND product_id = $3`;
  await client.query(SQL, [uuid.v4(), user_id, product_id]);
};

// deleteFavorite

const deleteFavorite = async ({ id, user_id, product_id }) => {
  const SQL = ` DELETE FROM favorites
                  WHERE id = $1
                  AND user_id = $2
                  AND product_id = $3`;
  await client.query(SQL, [uuid.v4(), user_id, product_id]);
};

// module exports

module.exports = {
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
};
