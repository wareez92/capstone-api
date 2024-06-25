import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = ({ token, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
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
      console.log("data", data.token);

      if (data.token) {
        setToken(data.token);
      } else {
        console.error("Login Error!");
      }
    } catch (error) {
      console.error(error);
    }
    loginWithToken();
  };

  const loginWithToken = async () => {
    const response = await fetch("/api/auth/me", {
      headers: {
        authorization: `${token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      setUser(json);
      navigate("/Account");
    } else {
      console.log(error);
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
          value={username}
          onChange={nameHandler}
        ></input>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={passwordHandler}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
