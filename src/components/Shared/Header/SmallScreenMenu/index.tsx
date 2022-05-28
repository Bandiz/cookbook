import React, { useState } from 'react';
import RecipesMenu from '../RecipesMenu';
import { ABOUT, HOME, LOGIN } from '../../../../constants/routes';

import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';

interface SmallScreenMenuProps {
    categories: string[];
    isAuthenticated: boolean;
}

const SmallScreenMenu = ({ categories, isAuthenticated }: SmallScreenMenuProps) => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Box sx={{ height: '39px', display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
            </IconButton>
            <Menu
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
            >
                <MenuItem onClick={handleCloseNavMenu}>
                    <Typography component="a" href={HOME} textAlign="center">
                        Home
                    </Typography>
                </MenuItem>
                <MenuItem>
                    <RecipesMenu categories={categories} handleCloseNavMenu={handleCloseNavMenu} />
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                    <Typography component="a" href={ABOUT} textAlign="center">
                        About
                    </Typography>
                </MenuItem>
                {!isAuthenticated && (
                    <MenuItem onClick={handleCloseNavMenu}>
                        <Typography component="a" href={LOGIN} sx={{ display: 'flex' }}>
                            <LoginIcon sx={{ mr: 1 }} />
                            Login
                        </Typography>
                    </MenuItem>
                )}
            </Menu>
        </Box>
    );
};

export default SmallScreenMenu;
