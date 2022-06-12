import React from 'react';
import { Link } from 'react-router-dom';
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
    const { isAuthenticated } = useAuth();

    return (
        <>
            <CssBaseline />
            <HideOnScroll>
                <AppBar>
                    <Toolbar style={{ display: 'flex', gap: '10px', padding: '10px', justifyContent: 'center' }}>
                        <SmallScreenMenu />

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
                                <Button component={Link} to={HOME} sx={{ color: 'white', display: 'block' }}>
                                    Home
                                </Button>
                                <RecipesMenu />
                                <Button component={Link} to={ABOUT} sx={{ color: 'white', display: 'block' }}>
                                    About
                                </Button>
                                {!isAuthenticated && (
                                    <Button component={Link} to={LOGIN} sx={{ color: 'white', display: 'flex' }}>
                                        <LoginIcon sx={{ mr: 1 }} />
                                        Login
                                    </Button>
                                )}
                                {isAuthenticated && <UserMenu />}
                            </Box>
                            <Search />

                            {isAuthenticated && (
                                <Box
                                    sx={{
                                        display: { xs: 'flex', md: 'none' },
                                    }}
                                >
                                    <UserMenu />
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
