import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <>
      <nav>
        <ul>
          <Link to="/">Login</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/account">Account</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
        </ul>
      </nav>
    </>
  );
}
