import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Menu, MenuItem, Typography } from '@mui/material';

interface RecipesMenuProps {
    categories: string[];
    handleCloseNavMenu?: () => void;
}
const RecipesMenu = ({ categories, handleCloseNavMenu }: RecipesMenuProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button sx={{ color: 'white', display: { xs: 'none', md: 'block' } }} onClick={handleClick}>
                Recipes
            </Button>
            <Menu
                sx={{ display: { xs: 'none', md: 'block' } }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {categories.map((c: string) => {
                    return (
                        <MenuItem
                            key={c}
                            onClick={() => {
                                navigate(`/category/${c.toLowerCase()}`);
                                handleClose();
                            }}
                        >
                            {c}
                        </MenuItem>
                    );
                })}
            </Menu>
            <Typography
                sx={{ display: { xs: 'block', md: 'none' } }}
                component="a"
                onClick={handleClick}
                textAlign="center"
            >
                Recipes
            </Typography>
            <Menu
                sx={{ display: { xs: 'block', md: 'none' } }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: -20,
                }}
            >
                {categories.map((c: string) => {
                    return (
                        <MenuItem
                            key={c}
                            onClick={() => {
                                navigate(`/category/${c.toLowerCase()}`);
                                handleClose();
                                handleCloseNavMenu && handleCloseNavMenu();
                            }}
                        >
                            {c}
                        </MenuItem>
                    );
                })}
            </Menu>
        </div>
    );
};

export default RecipesMenu;
