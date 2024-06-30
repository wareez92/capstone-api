import { useNavigate } from "react-router-dom";
import Home from "./Home";

export default function Account({ setUser, user }) {
  const navigate = useNavigate();
  const logoutUser = () => {
    window.localStorage.removeItem(`token`);
    setUser({});
    navigate("/login");
  };
  console.log(user);

  return (
    <>
      <h1>Hi, {user.username}</h1>
      <button onClick={logoutUser}>Logout</button>
      <Home />
    </>
  );
}
