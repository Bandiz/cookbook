import React from "react";
import { FaBars } from "react-icons/fa";
import logo from "./icon.png";
import { useGlobalContext } from "../../../../context";
import "./HeaderNav.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { openSidebar, openSubmenu, closeSubmenu } = useGlobalContext();

  const displaySubmenu = (e) => {
    const page = e.target.textContent;
    const tempBtn = e.target.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom - 3;
    openSubmenu(page, { center, bottom });
  };

  const handleSubmenu = (e) => {
    // if (!e.target.classList.contains("link-btn recipes")) {
    //   closeSubmenu();
    // }
    if (e.target.textContent !== "Recipes") {
      closeSubmenu();
    }
  };
  return (
    <nav className="nav" onMouseOver={handleSubmenu}>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} className="nav-logo" alt="logo" />
          </Link>
          <button className="nav-btn toggle-btn" onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/" className="link-btn">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/recipes"
              className="link-btn recipes"
              onMouseOver={displaySubmenu}
            >
              Recipes
            </Link>
          </li>
          <li>
            <Link to="/about" className="link-btn">
              About
            </Link>
          </li>
          <li>
            <Link to="/administration" className="link-btn">
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
