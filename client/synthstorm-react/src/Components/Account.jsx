import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Products from "./Proudcts";
import Hero from "./Hero";
import Header from "./Header";

export default function Account({ setUser, user }) {
  return (
    <>
      <Nav />
      <h1>Hi, {user.username}</h1>
      <Header />
      <Hero />
      <Products />
    </>
  );
}
