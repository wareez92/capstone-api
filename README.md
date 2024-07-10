Synthstorm
Synthstorm is an e-commerce platform for music equipment, allowing users to browse and purchase products, manage their orders, favorites, wishlist, and cart.

Table of Contents
Features
Database Schema
Data Layer Functions
Setup
Usage
License
Features
User management with authentication and authorization.
Product catalog with detailed information.
Order management for purchasing products.
Favorites and wishlist functionalities for user convenience.
Cart system for managing ongoing purchases.
Database Schema
USERS
id: UUID
username: String, unique
password: String
isAdmin: Boolean, default false
isBanned: Boolean, default false
address: String
PRODUCTS
id: UUID
name: String
price: Integer
details: String
quantity: Integer
reviews: String
outOfStock: Boolean, default false
ORDERS
id: UUID
user_id: UUID, references users(id)
product_id: UUID, references products(id)
FAVORITES
id: UUID
user_id: UUID, references users(id)
product_id: UUID, references products(id)
Unique constraint: combination of user_id and product_id
WISHLIST
id: UUID
user_id: UUID, references users(id)
product_id: UUID, references products(id)
Unique constraint: combination of user_id and product_id
CART
id: UUID
user_id: UUID, references users(id)
product_id: UUID, references products(id)
Data Layer Functions
CREATE
createTables: Create all database tables.
createUser: Add a new user.
createProduct: Add a new product.
createWishlist: Add a product to the wishlist.
createOrder: Create a new order.
createFavorite: Add a product to favorites.
READ
fetchUsers: Retrieve all users.
fetchProducts: Retrieve all products.
fetchWishlist: Retrieve wishlist items.
fetchOrders: Retrieve orders.
fetchFavorites: Retrieve favorite items.
UPDATE
banUser: Ban a user.
authorizeUser: Grant admin access to a user.
DELETE
deleteUser: Remove a user.
deleteProduct: Remove a product.
deleteWishlist: Remove a wishlist item.
deleteOrder: Remove an order.
deleteFavorite: Remove a favorite item.
Setup
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/synthstorm.git
Navigate to the project directory:

bash
Copy code
cd synthstorm
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file and add necessary environment variables.
Run database migrations:

bash
Copy code
npm run migrate
Usage
Start the development server:
bash
Copy code
npm start
Open your browser and navigate to http://localhost:3000 to see the application in action.
License
