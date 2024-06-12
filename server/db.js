// import pg and create client

const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/synthstorm_db"
);

// import uuid and bcrypt

const uuid = require("uuid");
const bcrypt = require("bcrypt");

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
                        name VARCHAR (50) NOT NULL,
                        price VARCHAR(50) NOT NULL,
                        details VARCHAR(255),
                        quantity VARCHAR(50) NOT NULL,
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
  const SQL = ` INSERT INTO users (id, username, password, address, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const response = await client.query(SQL, [
    uuid.v4(),
    username,
    await bcrypt.hash(password, 5),
    address,
    phone,
  ]);
  return response.rows[0];
};

// createProduct

const createProduct = async ({
  name,
  price,
  details,
  quantity,
  rating,
  review,
}) => {
  const SQL = ` INSERT INTO products (id, name, price, details, quantity, rating, review) VALUES ($1, $2, $3, $4, $5, $6, $7) `;
  const response = await client.query(SQL, [
    uuid.v4(),
    name,
    price,
    details,
    quantity,
    rating,
    review,
  ]);
  return response.rows[0];
};

// createWishlist

const createWishlist = async ({ user_id, product_id }) => {
  const SQL = ` INSERT INTO product (id, user_id, product_id) VALUES ($1, $2, $3) RETURNING *`;
  const response = await client.query(SQL, [uuid.v4(), user_id, product_id]);
  return response.rows[0];
};

// createOrder

const createOrder = async ({ user_id, product_id }) => {
  const SQL = ` INSERT INTO orders (id, user_id, product_id) VALUES ($1, $2, $3) RETURNING *`;
  const response = await client.query(SQL, [uuid.v4(), user_id, product_id]);
  return response.rows[0];
};

// createFavorite

const createFavorite = async ({ user_id, product_id }) => {
  const SQL = ` INSERT INTO favorite (user_id, product_id) VALUES ($1, $2, $3) RETURNING *`;
  const response = await client.query(SQL, [uuid.v4(), user_id, product_id]);
  return response.rows[0];
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
  const SQL = ` SELECT * FROM products`;
  const response = await client.query(SQL);
  return response.rows;
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

const fetchFavorites = async () => {
  const SQL = ` SELECT * FROM favorites`;
  const response = await client.query(SQL);
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

const deleteProduct = async ({ id, user_id }) => {
  const SQL = ` DELETE FROM products 
                  WHERE id = $1
                  AND user_id = $2`;
  await client.query(SQL, [uuid.v4(), user_id]);
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
};
