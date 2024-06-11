// import pg and create client

const pg = requrie("pg");
const client = new pg.client(
  process.env.DATABASE_URL || "postgres://localhost/synthstorm_db"
);

// import uuid and bcrypt

const uuid = require("uuid");
const bcrypt = require("bcrypt");

// createTables

const createTables = async () => {
  const SQL = ` DROP TABLE IF EXISTS users;
                DROP TABLE IF EXISTS products;
                DROP TABLE IF EXISTS orders;
                DROP TABLE IF EXISTS favorites;
                DROP TABLE IF EXISTS wishlist;
                DROP TABLE IF EXISTS cart;
                    CREATE TABLE users(
                        id UUID PRIMARY KEY,
                        username VARCHAR(50) NOT NULL UNIQUE,
                        password VARCHAR(50) NOT NULL,
                        isAdmin BOOLEAN DEFAULT FALSE,
                        isBanned BOOLEAN DEFAULT FALSE,
                        address VARCHAR(255)
                    );  
                    CREATE TABLE products(
                        id UUID PRIMARY KEY,
                        name VARCHAR (50) NOT NULL,
                        price INTEGER NOT NULL,
                        details VARCHAR(255),
                        quantity VARCHAR(50) NOT NULL,
                        reviews INTEGER,  
                        outOfStock BOOLEAN DEFAULT FALSE
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
                        CONSTRAINT user_id_product_id UNIQUE (user_id, product_id),
                    );
                    CREATE TABLE wishlist(
                        id UUID PRIMARY KEY,
                        user_id UUID REFERENCES users(id) NOT NULL,
                        product_id UUID REFERENCES products(id) NOT NULL,
                        CONSTRAINT user_id_product_id UNIQUE (user_id, product_id)
                    );
                    CREATE TABLE cart(
                        id UUID PRIMARY KEY,
                        user_id UUID REFERENCES users(id) NOT NULL,
                        product_id UUID REFERENCES products(id) NOT NULL
                    );
            `;
  await client.query(SQL);
};

// Create

const createUser = async () => {};
const createProduct = async () => {};
const createWishlist = async () => {};
const createOrder = async () => {};
const createFavorites = async () => {};

// Read

const fetchUsers = async () => {};
const fetchProducts = async () => {};
const fetchWishlist = async () => {};
const fetchOrders = async () => {};
const fetchFavorites = async () => {};

// Upadte

const banUser = async () => {};
const authorizeUser = async () => {};

// Delete

const deleteUser = async () => {};
const deleteProduct = async () => {};
const deleteWishlist = async () => {};
const deleteOrder = async () => {};
const deleteFavorite = async () => {};

// module exports

module.exports = {
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
};
