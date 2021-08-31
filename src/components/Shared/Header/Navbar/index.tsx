import { useState } from "react";

import { Menu, Link } from "@material-ui/core";
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
import { useGlobalContext } from "../../../../RecipesContext";

const Navbar = () => {
  const { userData } = useGlobalContext();
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
  ];

  const handleOpenSubmenu = (event: React.MouseEvent<any>) => {
    setOpenSubmenu(event.currentTarget);
  };

  const handleCloseSubmenu = () => {
    setOpenSubmenu(null);
  };

  const handleOpenHamburger = () => {
    setOpenHamburger(true);
  };
  const handleCloseHamburger = () => {
    setOpenHamburger(false);
    handleCloseSubmenu();
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-center">
          <div className="nav-header">
            <Link href="/" className="nav-link-logo">
              <img src={logo} className="nav-logo" alt="logo" />
            </Link>
            <button className="nav-btn" onClick={handleOpenHamburger}>
              <FaBars />
            </button>
            <Hamburger
              menuLinks={menuLinks}
              handleClose={handleCloseHamburger}
              open={openHamburger}
            />
          </div>
          <div className="nav-links">
            {menuLinks.map((link, index) => {
              const { label, url } = link;
              return label === "Recipes" ? (
                <div key={index}>
                  <Link
                    href={url}
                    className="link-btn"
                    onMouseOver={handleOpenSubmenu}
                  >
                    {label}
                  </Link>
                  <Menu
                    anchorEl={openSubmenu}
                    keepMounted
                    open={Boolean(openSubmenu)}
                    onClose={handleCloseSubmenu}
                    onMouseLeave={handleCloseSubmenu}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    style={{ position: "absolute" }}
                  >
                    <Submenu
                      menuLinks={menuLinks}
                      handleClose={handleCloseSubmenu}
                    />
                  </Menu>
                </div>
              ) : (
                <Link href={url} key={index} className="link-btn">
                  {label}
                </Link>
              );
            })}
            {userData?.user.isAdmin && (
              <Link href={"/admin"} className="link-btn">
                Admin
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
