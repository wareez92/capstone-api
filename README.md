# capstone-api

	    o------ DATABASE SCHEMA ------o

USERS
	- id UUID
	- username (string) unique
	- password (string)
	- isAdmin (Boolean) default false
PRODUCTS
	- id UUID
	- name (string)
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
	

	

	
