import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { GiHamburger, GiSteak, GiFruitBowl, GiCookingPot } from 'react-icons/gi';
import { CgBowl } from 'react-icons/cg';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

import logo from '../Logo/icon.png';
import './HeaderNav.scss';
import Hamburger from '../Hamburger';
// import Submenu from '../Submenu';
import { useRecipes } from '../../../../contexts/RecipesContext';
import { ABOUT, ADMIN, HOME, RECIPES, LOGIN } from '../../../../constants/routes';
import { useAuth } from '../../../../contexts/AuthContext';

const Navbar = () => {
    // const { userData } = useGlobalContext();
    const [openSubmenu, setOpenSubmenu] = useState<null | HTMLElement>(null);
    const [openHamburger, setOpenHamburger] = useState(false);

    const { categories } = useRecipes();
    const { isAuthenticated } = useAuth();

    const menuLinks = [
        { label: 'Home', url: HOME, sublinks: [] },
        {
            label: 'Recipes',
            url: RECIPES,
            sublinks: [
                { label: 'Breakfast', icon: <CgBowl /> },
                { label: 'Lunch', icon: <GiHamburger /> },
                { label: 'Dinner', icon: <GiSteak /> },
                { label: 'Snacks', icon: <GiFruitBowl /> },
                { label: 'Soups', icon: <GiCookingPot /> },
            ],
        },
        { label: 'About', url: ABOUT, sublinks: [] },
    ];

    const handleOpenSubmenu = (event: React.MouseEvent<HTMLAnchorElement>) => {
        setOpenSubmenu(event.currentTarget);
    };

    const handleOnFocus = (event: React.FocusEvent<HTMLAnchorElement>) => {
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
                        <Link to={HOME} className="nav-link-logo">
                            <img src={logo} className="nav-logo" alt="logo" />
                        </Link>
                        <button className="nav-btn" onClick={handleOpenHamburger}>
                            <FaBars />
                        </button>
                        <Hamburger menuLinks={menuLinks} handleClose={handleCloseHamburger} open={openHamburger} />
                    </div>
                    <div className="nav-links">
                        <Link to={HOME} className="link-btn">
                            Home
                        </Link>
                        <Link
                            to={RECIPES}
                            className="link-btn"
                            onMouseEnter={handleOpenSubmenu}
                            onFocus={handleOnFocus}
                        >
                            Recipes
                        </Link>
                        <Menu
                            anchorEl={openSubmenu}
                            keepMounted
                            open={Boolean(openSubmenu)}
                            onClose={handleCloseSubmenu}
                            onMouseLeave={handleCloseSubmenu}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            className="categories"
                        >
                            {categories.map((category, index) => {
                                const icon = menuLinks
                                    .find((x) => x.label === 'Recipes')
                                    ?.sublinks.filter((c) => c.label === category)
                                    .map((c, index) => {
                                        return <div key={index}>{c.icon}</div>;
                                    });
                                return (
                                    <MenuItem key={index} className="item" onClick={handleCloseSubmenu}>
                                        <Link to={`/category/${category.toLowerCase()}`}>
                                            <ListItemIcon className="icon">{icon}</ListItemIcon>
                                            <ListItemText className="label" primary={category} />
                                        </Link>
                                    </MenuItem>
                                );
                            })}
                        </Menu>
                        <Link to={ABOUT} className="link-btn">
                            About
                        </Link>
                        {!isAuthenticated && (
                            <Link to={LOGIN} className="link-btn">
                                Login
                            </Link>
                        )}
                        {isAuthenticated && (
                            <Link to={ADMIN} className="link-btn">
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
