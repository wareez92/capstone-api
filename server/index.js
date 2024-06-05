// --- import pg and client ---

const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/tundra_db"
);

// --- import express and store in app ---

const express = require("express");
const app = express();

// --- invoke init ---

const init = async () => {
  // --- connect client to database ---

  await client.connect();

  // --- query tables and seed data ---

  const SQL = `DROP TABLE IF EXISTS products;
               DROP TABLE IF EXSITS users;
               DROP TABLE IF EXSITS categories;
               DROP TABLE IF EXISTS cart_item;
               DROP TABLE IF EXISTS orders;
                    CREATE TABLE products(
                            id SERIAL PRIMARY KEY,
                            name VARCHAR(100) NOT NULL,
                            SKU INTEGER,
                            in_stock BOOLEAN DEFAULT TRUE
                            created_at TIMESTAMP DEFAULT now(),
                            updated_at TIMESTAMP DEFAULT now()
                            price INTEGERnext(error)
                            category_id INTEGER REFERENCE categories(id) NOT NULL     
                        );
                    CREATE TABLE users(
                           id SERIAL PRIMARY KEY,
                           username VARCHAR(50) NOT NULL,
                           password VARCHAR(50) NOT NULL,   
                           firstname VARCHAR(50) NOT NULL,
                           lastname VARCHAR(50)  NOT NULL,
                           address VARCHAR (100) NOT NULL,
                           created_at TIMESTAMP DEFAULT now()
                           updated_at TIMESTAMP DEFAULT now()
                        );
                    CREATE TABLE categories(
                           id SERIAL PRIMARY KEY,
                           name VARCHAR(50),
                           created_at TIMESTAMP DEFAULT now()
                           updated_at TIMESTAMP DEFAULT now()
                        );
                    CREATE TABLE cart_item(
                           id SERIAL PRIMARY KEY,
                           product_id INTEGER REFERENCE products(id),
                           quantity INTEGER,
                           created_at TIMESTAMP DEFAULT now()
                           updated_at TIMESTAMP DEFAULT now()
                        );
                    CREATE TABLE orders(
                           id SERIAL PRIMARY KEY,
                           products_id INTEGER REFERENCE products(id)
                           quantity INTEGER,
                           created_at TIMESTAMP DEFAULT now(),
                           updated_at TIMESTAMP DEFAULT now()
                        );
                `;
  await client.query(SQL);
  console.log("tables created");

  // --- setup port and listener ---

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening for port ${port}`));
};

// --- JSON parsing and logger ---

app.use(express.json());
app.use(require("morgan")("dev"));

// --- CRUD SECTION ---

//  ~~~ create ~~~

app.post("", async (req, res, next) => {
  try {
    const SQL = `INSERT INTO categories (name) VALUES ('household items')`;
    const response = await client.query(SQL);
    res.send(response.rows);
  } catch (error) {
    next(error);
  }
});

//   ~~~ read ~~~

app.get("", async (req, res, next) => {
  try {
    const SQL = ``;
    const response = await client.query(SQL);
    res.send();
  } catch (error) {
    next(error);
  }
});

//   ~~~ update ~~~

app.put("", async (req, res, next) => {
  try {
    const SQL = ``;
    const response = await client.query(SQL);
    res.send();
  } catch (error) {
    next(error);
  }
});

//   ~~~ delete ~~~

app.delete("", async (req, res, next) => {
  try {
    const SQL = ``;
    const response = await client.query(SQL);
    res.send();
  } catch (error) {
    next(error);
  }
});
