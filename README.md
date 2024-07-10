Synthstorm
Synthstorm is an e-commerce platform for music equipment, allowing users to browse and purchase products, manage their orders, favorites, wishlist, and cart.

TABLE OF CONTENTS

- Features
- Database Schema
- Data Layer Functions
- Setup
- Usage
-License
- Features
- User management with authentication and authorization.
- Product catalog with detailed information.
- Order management for purchasing products.
- Favorites and wishlist functionalities for user convenience.
- Cart system for managing ongoing purchases.
- Database Schema
  
USERS

- id: UUID
- username: String, unique
- password: String
- isAdmin: Boolean, default false
- isBanned: Boolean, default false
- address: String

PRODUCTS

- id: UUID
- name: String
- price: Integer
- details: String
- quantity: Integer
- reviews: String
- outOfStock: Boolean, default false

ORDERS

-id: UUID
- user_id: UUID, references users(id)
- product_id: UUID, references products(id)

FAVORITES

- id: UUID
- user_id: UUID, references users(id)
- product_id: UUID, references products(id)
- Unique constraint: combination of user_id and product_id

WISHLIST

- id: UUID
- user_id: UUID, references users(id)
- product_id: UUID, references products(id)
- Unique constraint: combination of user_id and product_id

CART

- id: UUID
- user_id: UUID, references users(id)
- product_id: UUID, references products(id)

DATA LAYER FUNCTIONS

CREATE
- createTables: Create all database tables.
- createUser: Add a new user.
- createProduct: Add a new product.
- createWishlist: Add a product to the wishlist.
- createOrder: Create a new order.
- createFavorite: Add a product to favorites.
READ
- fetchUsers: Retrieve all users.
- fetchProducts: Retrieve all products.
- fetchWishlist: Retrieve wishlist items.
- fetchOrders: Retrieve orders.
- fetchFavorites: Retrieve favorite items.
UPDATE
- banUser: Ban a user.
- authorizeUser: Grant admin access to a user.
DELETE
- deleteUser: Remove a user.
- deleteProduct: Remove a product.
- deleteWishlist: Remove a wishlist item.
- deleteOrder: Remove an order.
- deleteFavorite: Remove a favorite item.

SETUP

1. Clone the repository:
  Copy code: 
  git clone https://github.com/your-username/synthstorm.git

2. Navigate to the project directory:

  Copy code: 
  cd synthstorm

3. Install dependencies:
  Copy code: 
  npm install

4. Set up environment variables:
    Create a .env file and add necessary environment variables.

5. Run database migrations:
    Copy code: 
    npm run migrate

USAGE

  Start the development server:
   1. Copy code:
      npm start
    
  2. Open your browser and navigate to http://localhost:3000 to see the application in action.

WEBISTE LINK : https://synthstorm.onrender.com/
