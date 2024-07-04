import { useEffect, useState } from "react";
import Product from "./Components/Product";
import "./App.css";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import Account from "./Components/Account";
import Register from "./Components/Register";
import Cart from "./Components/Cart";
import Products from "./Components/Proudcts";
import Orders from "./Components/Orders";
import SingleProductPage from "./Components/SingleProductPage";

function App({
  setFilteredProducts,
  setProducts,
  products,
  filteredProducts,
  cart,
  setCart,
}) {
  const [user, setUser] = useState(null);
  // console.log(setUser);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} user={user} />} />
        <Route path="/products" element={<Products user={user} />} />
        <Route
          path="/account"
          element={<Account user={user} setUser={setUser} />}
        />
        <Route
          path="/products/:productId"
          element={<Product user={user} cart={cart} setCart={setCart} />}
        />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/cart" element={<Cart user={user} />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
