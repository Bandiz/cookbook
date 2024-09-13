import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    Box,
    Button,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useGoogleSessionMutation, useLoginSessionMutation } from '../../api/session';
import { useStyles } from './Login';

interface FormState {
    username?: string;
    password?: string;
    showPassword: boolean;
}

export default function Login() {
    const [{ username, password, showPassword }, setFormState] = useState<FormState>({ showPassword: false });
    const formRef = useRef<HTMLFormElement>();
    const googleSessionMutation = useGoogleSessionMutation();
    const loginSessionMutation = useLoginSessionMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const { classes } = useStyles();

    function handleOnSuccess(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
        if (response.hasOwnProperty('code')) {
            return;
        }
        googleSessionMutation.mutate((response as GoogleLoginResponse).tokenId);
        handleLogin();
    }

    function handleOnFailure(error: unknown) {
        console.log(error);
    }

    function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!username || !password) {
            return;
        }
        const formData = new FormData(event.currentTarget);
        loginSessionMutation.mutate(formData);
        handleLogin();
    }

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        setFormState((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    }

    function handleOnClickShowPassword() {
        setFormState((prev) => ({
            ...prev,
            showPassword: !prev.showPassword,
        }));
    }

    function handleOnMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
    }

    function handleLogin() {
        const params = new URLSearchParams(location.search);
        const returnUrl = params.get('returnTo');
        if (returnUrl) {
            navigate(decodeURIComponent(returnUrl));
        } else {
            navigate('/');
        }
    }

    return (
        <Box>
            <Grid container className={classes.container} rowSpacing={3}>
                <Grid item>
                    <Paper className={classes.paper} elevation={3}>
                        <Box ref={formRef} component="form" onSubmit={handleOnSubmit} className={classes.form}>
                            <Typography variant="h5" sx={{ flex: '0 0 100%', textAlign: 'center' }}>
                                Login with an existing account
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    flex: '0 0 100%',
                                    m: (theme) => theme.spacing(2, 0),
                                }}
                            >
                                <TextField
                                    id="username"
                                    name="username"
                                    label="User name"
                                    placeholder="User name"
                                    required
                                    onChange={handleOnChange}
                                    sx={{ m: 1, width: '25ch' }}
                                />
                                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        required
                                        onChange={handleOnChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleOnClickShowPassword}
                                                    onMouseDown={handleOnMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            </Box>

                            <Button
                                id="login"
                                variant="contained"
                                type="submit"
                                disabled={!(username && password)}
                                sx={{ flex: '0 0 50%' }}
                            >
                                Login
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                position: 'relative',
                                m: (theme) => theme.spacing(4, 0),
                            }}
                        >
                            <Divider orientation="horizontal" />

                            <Typography
                                className={classes.flex}
                                sx={{
                                    position: 'absolute',
                                    alignSelf: 'center',
                                    backgroundColor: 'white',
                                    width: '50px',
                                }}
                                variant="caption"
                            >
                                OR
                            </Typography>
                        </Box>

                        <Box
                            className={classes.flex}
                            sx={{
                                m: (theme) => theme.spacing(2, 0),
                            }}
                        >
                            <GoogleLogin
                                clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}
                                onSuccess={handleOnSuccess}
                                onFailure={handleOnFailure}
                                buttonText="Login with Google"
                            />
                        </Box>
                    </Paper>
                </Grid>

                <Grid item>
                    <Paper className={classes.paper} elevation={3}>
                        <Box className={classes.flex}>
                            <Typography variant="subtitle1">Don't have an account?</Typography>

                            <Button id="signup" variant="text">
                                Sign up
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
