import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";
import { RiLogoutCircleFill } from "react-icons/ri";
import { FaStore } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Nav({ user, loggedIn, setLoggedIn }) {
  const logoutUser = () => {
    window.localStorage.removeItem(`token`);
    setLoggedIn(false);
    setUser({});
  };

  const openMenu = (event) => {
    event.preventDefault();
    const menu = document.getElementById("main-menu");
    menu.classList.toggle("is-open");
  };

  console.log(user);
  return (
    <>
      <nav className="menu" id="main-menu">
        <button className="menu-toggle" id="toggle-menu" onClick={openMenu}>
          toggle menu
        </button>
        <div className="menu-dropdown">
          <ul className="nav-menu">
            <li>
              {loggedIn ? (
                <Link to="/">
                  <RiLoginCircleFill />
                  Login
                </Link>
              ) : (
                <Link to="/" onClick={logoutUser}>
                  <RiLogoutCircleFill />
                  Logout
                </Link>
              )}{" "}
            </li>
            <li>
              <Link to="/account">
                <FaUser />
                Account
              </Link>
            </li>
            <li>
              <Link to="/products">
                <FaStore />
                Products
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <FaShoppingCart />
                Cart
              </Link>
            </li>
            <li>
              <Link to="/orders">
                <FaClipboardList />
                Orders
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
