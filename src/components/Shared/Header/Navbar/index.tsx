import React from 'react';
import { useRecipes } from '../../../../contexts/RecipesContext';
import { ABOUT, HOME, LOGIN } from '../../../../constants/routes';
import { useAuth } from '../../../../contexts/AuthContext';
import Search from '../Search';
import RecipesMenu from '../RecipesMenu';
import Logo from '../Logo';
import UserMenu from '../UserMenu';
import SmallScreenMenu from '../SmallScreenMenu';

import { AppBar, Box, Button, CssBaseline, Slide, Toolbar, useScrollTrigger } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

interface Props {
    children: React.ReactElement;
}

function HideOnScroll(props: Props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        target: window,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const Navbar = () => {
    const { categories } = useRecipes();
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <>
            <CssBaseline />
            <HideOnScroll>
                <AppBar>
                    <Toolbar style={{ display: 'flex', gap: '10px', padding: '10px', justifyContent: 'center' }}>
                        <SmallScreenMenu categories={categories} isAuthenticated={isAuthenticated} />

                        <Logo />

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'row', md: 'column' },
                                gap: '10px',
                                width: '80%',
                            }}
                        >
                            <Box
                                sx={{
                                    flexWrap: 'wrap',
                                    display: { xs: 'none', md: 'flex' },
                                    gap: '20px',
                                    justifyContent: 'center',
                                }}
                            >
                                <Button href={HOME} sx={{ color: 'white', display: 'block' }}>
                                    Home
                                </Button>
                                <RecipesMenu categories={categories} />
                                <Button href={ABOUT} sx={{ color: 'white', display: 'block' }}>
                                    About
                                </Button>
                                {!isAuthenticated && (
                                    <Button href={LOGIN} sx={{ color: 'white', display: 'flex' }}>
                                        <LoginIcon sx={{ mr: 1 }} />
                                        Login
                                    </Button>
                                )}
                                {isAuthenticated && user && <UserMenu user={user} logout={logout} />}
                            </Box>
                            <Search />

                            {isAuthenticated && user && (
                                <Box
                                    sx={{
                                        display: { xs: 'flex', md: 'none' },
                                    }}
                                >
                                    <UserMenu user={user} logout={logout} />
                                </Box>
                            )}
                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </>
    );
};
export default Navbar;
