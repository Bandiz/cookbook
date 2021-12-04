import React, { useRef, useState } from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
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
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { GetSessionWithLogin } from '../../api/session/getSessionWithLogin';
import { useAuth } from '../../contexts/AuthContext';
import { GetSessionWithGoogle } from '../../api/session/getSessionWithGoogle';
import { UserSession } from '../../types';
import { useNavigate } from 'react-router';

interface FormState {
    username?: string;
    password?: string;
    showPassword: boolean;
}

export default function Login() {
    const [{ username, password, showPassword }, setFormState] = useState<FormState>({ showPassword: false });
    const [error, setError] = useState<string>();
    const formRef = useRef<HTMLFormElement>();
    const { login } = useAuth();
    const { getSessionWithLoginRequest } = GetSessionWithLogin();
    const { getSessionWithGoogleRequest } = GetSessionWithGoogle();
    const navigate = useNavigate();

    function handleOnSuccess(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
        if (response.hasOwnProperty('code')) {
            return;
        }
        getSessionWithGoogleRequest((response as GoogleLoginResponse).tokenId).then((response) => {
            if (response.type === 'error') {
                setError(response.error);
            } else {
                handleLogin(response.payload);
            }
        });
    }

    function handleOnFailure(error: unknown) {
        console.log(error);
    }

    function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (username && password) {
            getSessionWithLoginRequest(username, password).then((response) => {
                if (response.type === 'response') {
                    handleLogin(response.payload);
                }
            });
        }
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

    function handleLogin(session: UserSession) {
        login(session);
        navigate('/');
    }

    return (
        <Box>
            <Grid
                container
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: '',
                    justifyContent: 'center',
                    mt: '40px',
                    '& .MuiGrid-root': { display: 'flex', justifyContent: 'center', alignItems: 'center' },
                }}
                spacing={4}
            >
                <Grid item>
                    <GoogleLogin
                        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                        onSuccess={handleOnSuccess}
                        onFailure={handleOnFailure}
                        buttonText="Login with Google"
                    />
                </Grid>
                <Grid item>
                    <Divider orientation="vertical" />
                </Grid>
                <Grid item>
                    <Paper
                        sx={{
                            width: '400px',
                            p: 3,
                        }}
                        elevation={3}
                    >
                        <Box
                            ref={formRef}
                            component="form"
                            onSubmit={handleOnSubmit}
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                            }}
                        >
                            <Typography variant="h5" sx={{ flex: '0 0 100%' }}>
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
                                    onChange={handleOnChange}
                                    sx={{ m: 1, width: '25ch' }}
                                />
                                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
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

                            <Button id="signup" variant="text" sx={{ flex: '0 0 50%' }}>
                                Sign up
                            </Button>

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
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
