import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Products from "./Proudcts";
import Hero from "./Hero";

export default function Account({ setUser, user }) {
  return (
    <>
      <div>
        <Nav />
      </div>
      <Hero />
      <h1>Hi, {user.username}</h1>
      <Products />
    </>
  );
}
