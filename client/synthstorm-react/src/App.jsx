import { useEffect, useState } from "react";
import Product from "./Components/Product";
import "./App.css";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import Account from "./Components/Account";
import Home from "./Components/Home";
import Register from "./Components/Register";

function App({ setFilteredProducts, setProducts, products, filteredProducts }) {
  const [user, setUser] = useState({});

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setUser={setUser} user={user} />}
        />
        <Route
          path="/account"
          element={<Account user={user} setUser={setUser} />}
        />
        <Route path="/products/:productId" element={<Product user={user} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
    </>
  );
}

export default App;
