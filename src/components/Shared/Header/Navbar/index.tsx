import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { GiHamburger, GiSteak, GiFruitBowl, GiCookingPot } from 'react-icons/gi';
import { CgBowl } from 'react-icons/cg';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

import logo from '../Logo/icon.png';
import './HeaderNav.scss';
import Hamburger from '../Hamburger';
// import Submenu from '../Submenu';
import { useGlobalContext } from '../../../../RecipesContext';
import { ABOUT, ADMIN, HOME, RECIPES } from '../../../../constants/routes';
import { GetCategories } from '../../../../api/categories/getCategories';

const Navbar = () => {
    const { userData } = useGlobalContext();
    const [openSubmenu, setOpenSubmenu] = useState<null | HTMLElement>(null);
    const [openHamburger, setOpenHamburger] = useState(false);

    const { categories } = useGlobalContext();
    const { getCategoriesRequest } = GetCategories();

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

    useEffect(() => {
        getCategoriesRequest();
    }, []);

    return (
        <nav className="nav">
            <div className="nav-center">
                <div className="nav-header">
                    <Link to={HOME} className="nav-link-logo">
                        <img src={logo} className="nav-logo" alt="logo" />
                    </Link>
                    <button className="nav-btn" onClick={handleOpenHamburger}>
                        <FaBars />
                    </button>
                    <Hamburger
                        categories={categories}
                        menuLinks={menuLinks}
                        handleClose={handleCloseHamburger}
                        open={openHamburger}
                    />
                </div>
                <div className="nav-links">
                    {menuLinks.map((link, index) => {
                        const { label, url, sublinks } = link;
                        return label === 'Recipes' ? (
                            <div key={index}>
                                <Link to={url} className="link-btn" onMouseOver={handleOpenSubmenu}>
                                    {label}
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
                                    style={{ position: 'absolute' }}
                                >
                                    <div className="categories">
                                        {categories.map((category, index) => {
                                            const icon = sublinks
                                                .filter((c) => c.label === category)
                                                .map((c, index) => {
                                                    return <div key={index}>{c.icon}</div>;
                                                });
                                            return (
                                                <MenuItem
                                                    key={index}
                                                    className="item"
                                                    onClick={handleCloseSubmenu}
                                                    component={Link}
                                                    to={`/category/${category.toLowerCase()}`}
                                                >
                                                    <ListItemIcon className="icon">{icon}</ListItemIcon>
                                                    <ListItemText className="label" primary={category} />
                                                </MenuItem>
                                            );
                                        })}
                                    </div>
                                </Menu>
                            </div>
                        ) : (
                            <Link to={url} key={index} className="link-btn">
                                {label}
                            </Link>
                        );
                    })}
                    {userData?.user.isAdmin && (
                        <Link to={ADMIN} className="link-btn">
                            Admin
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
