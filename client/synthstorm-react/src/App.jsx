import { useEffect, useState } from "react";
import Product from "./Components/Product";
import "./App.css";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import Account from "./Components/Account";
import Home from "./Components/Home";

function App() {
  const [token, setToken] = useState({});
  const [user, setUser] = useState({});

  return (
    <>
      <Routes>
        <Route path="/" element={<Home token={token} user={user} />} />
        <Route
          path="/login"
          element={
            <Login setToken={setToken} token={token} setUser={setUser} />
          }
        />
        <Route
          path="/account"
          element={<Account token={token} user={user} />}
        />
        <Route path="/products/:productId" element={<Product token={token} user={user} />} />
      </Routes>
    </>
  );
}

export default App;
