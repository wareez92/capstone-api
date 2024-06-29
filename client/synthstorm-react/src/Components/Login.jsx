import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser, user }) => {
  console.log(setUser);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      console.log("data", data);
      window.localStorage.setItem("token", data.token);
      loginWithToken();
    } catch (error) {
      console.error(error);
    }
  };

  const loginWithToken = async () => {
    const token = window.localStorage.getItem(`token`);
    try {
      const response = await fetch("/api/auth/me", {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const json = await response.json();
      console.log(json);
      setUser(json);
      navigate("/account");
    } catch (error) {
      console.error("Failed to fetch user details", error);
      alert("invalid credentials");
    }
  };
  const nameHandler = (event) => {
    console.log("Event --->", event.target.value);
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    console.log("Event --->", event.target.value);
    setPassword(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="name"
          placeholder="name"
          required
          value={username}
          onChange={nameHandler}
        ></input>
        <input
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={passwordHandler}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
