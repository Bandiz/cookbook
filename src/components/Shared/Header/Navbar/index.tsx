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
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@material-ui/core";
import logo from "../Logo/icon.png";
import "./HeaderNav.scss";
import useStyles from "./styles";

const Navbar = () => {
  const [openSubmenu, setOpenSubmenu] = useState<null | HTMLElement>(null);

  const classes = useStyles();

  const sublinks = [
    { label: "breakfast", icon: <CgBowl />, subUrl: "/category/breakfast" },
    { label: "lunch", icon: <GiHamburger />, subUrl: "/category/lunch" },
    { label: "dinner", icon: <GiSteak />, subUrl: "/category/dinner" },
    { label: "snacks", icon: <GiFruitBowl />, subUrl: "/category/snacks" },
    { label: "soups", icon: <GiCookingPot />, subUrl: "/category/soups" },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenSubmenu(event.currentTarget);
  };

  const handleClose = () => {
    setOpenSubmenu(null);
  };

  return (
    <nav className="nav">
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} className="nav-logo" alt="logo" />
          </Link>
          <button className="nav-btn">
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
            <button className="link-btn" onClick={handleClick}>
              Recipes
            </button>
            <Menu
              anchorEl={openSubmenu}
              keepMounted
              open={Boolean(openSubmenu)}
              onClose={handleClose}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <div className={classes.submenu}>
                <MenuItem
                  className={classes.item}
                  onClick={handleClose}
                  component={Link}
                  to={`/recipes`}
                >
                  Show All
                </MenuItem>
                {sublinks.map((link, index) => {
                  const { label, icon, subUrl } = link;

                  return (
                    <MenuItem
                      className={classes.item}
                      onClick={handleClose}
                      key={index}
                      component={Link}
                      to={subUrl}
                    >
                      <ListItemIcon className={classes.icon}>
                        {icon}
                      </ListItemIcon>
                      <ListItemText className={classes.label} primary={label} />
                    </MenuItem>
                  );
                })}
              </div>
            </Menu>
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
