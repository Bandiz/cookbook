import { useState } from "react";
import { Link } from "react-router-dom";

import { FaBars } from "react-icons/fa";
import {
  GiHamburger,
  GiSteak,
  GiFruitBowl,
  GiCookingPot,
} from "react-icons/gi";
import { CgBowl } from "react-icons/cg";
import logo from "../Logo/icon.png";
import "./HeaderNav.scss";
import Hamburger from "../Hamburger";
import Submenu from "../Submenu";

const Navbar = () => {
  const [openSubmenu, setOpenSubmenu] = useState<null | HTMLElement>(null);
  const [openHamburger, setOpenHamburger] = useState(false);

  const menuLinks = [
    { label: "Home", url: "/" },
    {
      label: "Recipes",
      url: "/recipes",
      sublinks: [
        { label: "breakfast", icon: <CgBowl />, subUrl: "/category/breakfast" },
        { label: "lunch", icon: <GiHamburger />, subUrl: "/category/lunch" },
        { label: "dinner", icon: <GiSteak />, subUrl: "/category/dinner" },
        { label: "snacks", icon: <GiFruitBowl />, subUrl: "/category/snacks" },
        { label: "soups", icon: <GiCookingPot />, subUrl: "/category/soups" },
      ],
    },
    { label: "About", url: "/about" },
    { label: "Admin", url: "/administration" },
  ];

  const handleOpenSubmenu = (event: React.MouseEvent<any>) => {
    setOpenSubmenu(event.currentTarget);
  };

  const handleCloseSubmenu = () => {
    setOpenSubmenu(null);
  };

  const handleOpenHamburber = () => {
    setOpenHamburger(true);
  };
  const handleCloseHamburber = () => {
    setOpenHamburger(false);
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-center">
          <div className="nav-header">
            <Link to="/" className="nav-link-logo">
              <img src={logo} className="nav-logo" alt="logo" />
            </Link>
            <button className="nav-btn" onClick={handleOpenHamburber}>
              <FaBars />
            </button>
            <Hamburger
              menuLinks={menuLinks}
              handleClose={handleCloseHamburber}
              open={openHamburger}
            />
          </div>
          <div className="nav-links">
            {menuLinks.map((link, index) => {
              const { label, url } = link;
              return label === "Recipes" ? (
                <>
                  <Link
                    to="#"
                    key={index}
                    className="link-btn"
                    onClick={handleOpenSubmenu}
                  >
                    {label}
                  </Link>
                  <Submenu
                    menuLinks={menuLinks}
                    handleClose={handleCloseSubmenu}
                    open={openSubmenu}
                  />
                </>
              ) : (
                <Link to={url} key={index} className="link-btn">
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
