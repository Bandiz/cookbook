import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { GiHamburger, GiSteak, GiFruitBowl, GiCookingPot } from 'react-icons/gi';
import { CgBowl } from 'react-icons/cg';
import { Avatar, Box, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Logout from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import logo from '../Logo/icon.png';
import './HeaderNav.scss';
import Hamburger from '../Hamburger';
// import Submenu from '../Submenu';
import { useRecipes } from '../../../../contexts/RecipesContext';
import { ABOUT, ADMIN, HOME, RECIPES, LOGIN } from '../../../../constants/routes';
import { useAuth } from '../../../../contexts/AuthContext';
import { User } from '../../../../types';

const Navbar = () => {
    // const { userData } = useGlobalContext();
    const [openSubmenu, setOpenSubmenu] = useState<null | HTMLElement>(null);
    const [openHamburger, setOpenHamburger] = useState(false);
    const navigate = useNavigate();

    const { categories } = useRecipes();
    const { isAuthenticated, user, logout } = useAuth();

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

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function stringToColor(string: string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.substr(-2);
        }

        return color;
    }

    function stringAvatar(user: User) {
        const { name, lastName } = user;
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name[0]}${lastName[0]}`,
        };
    }

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
                            <Box
                                to={LOGIN}
                                component={Link}
                                className="link-btn"
                                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            >
                                <LoginIcon sx={{ mr: 1 }} />
                                Login
                            </Box>
                        )}
                        {isAuthenticated && user && (
                            <>
                                <Tooltip title="Account">
                                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                                        <Avatar {...stringAvatar(user)} sx={{ width: 32, height: 32 }}></Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem>
                                        <Avatar /> Profile
                                    </MenuItem>
                                    <Divider />
                                    {user.isAdmin && (
                                        <MenuItem
                                            onClick={() => {
                                                navigate(ADMIN);
                                            }}
                                        >
                                            <ListItemIcon>
                                                <AdminPanelSettingsIcon fontSize="small" />
                                            </ListItemIcon>
                                            Admin
                                        </MenuItem>
                                    )}
                                    <MenuItem onClick={logout}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                            // <Link to={ADMIN} className="link-btn">
                            //     Admin
                            // </Link>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};
export default Navbar;
