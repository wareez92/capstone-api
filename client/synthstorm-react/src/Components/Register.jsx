import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/register/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          address: address,
          phone: phone,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        window.localStorage.setItem("token", result.token);
        navigate("/login");
      } else {
        throw result;
      }
      console.log(result);
      return result;
    } catch (ex) {
      console.error("failed to register user", ex);
    }
  };

  return (
    <form onSubmit={registerUser}>
      <h4>Register</h4>
      <label>Username: </label>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <label>Password: </label>
      <input
        type="text"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <label>Address: </label>
      <input
        type="text"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
      />

      <label>Phone: </label>
      <input
        type="text"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />

      <button type="submit">Create</button>
    </form>
  );
}
