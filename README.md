# capstone-api

	    o------ DATABASE SCHEMA ------o

USERS
	- id UUID
	- username (string) unique
	- password (string)
	- isAdmin (Boolean) default false
	- isBanned (Boolean) default false
	- address (string)
PRODUCTS
	- id UUID
	- name (string)
	- price (integer)
	- details (string)
	- quantity (integer)
	- reviews (string)
	- outOfStock (Boolean) default false
ORDERS
	- id UUID
	- user_id ---> references users(id)
	- product_id ---> references users(id)
FAVORITES
	- id UUID	
	- user_id ---> references users(id)
	- product_id ---> references users(id)
	- constraint user_id and product_id combo is unique
WISHLIST
	- id UUID
	- user_id ---> references users(id)
	- product_id ---> references users(id)
	- constraint user_id and product_id combo is 
CART
	- id UUID
	- user_id ---> references users(id)
	- product_id ---> references users(id)

	


	

	
