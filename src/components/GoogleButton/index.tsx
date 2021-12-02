import { Alert } from '@mui/material';
import { useState } from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from 'react-google-login';

import { GetSessionWithGoogle } from '../../api/session/getSessionWithGoogle';
import { useGlobalContext } from '../../contexts/RecipesContext';

export default function GoogleButton() {
    const { userData, clearSession } = useGlobalContext();
    const { getSessionWithGoogleRequest, getSessionWithGoogleLoading } = GetSessionWithGoogle();
    const [error, setError] = useState<string>();

    const onSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if (response.hasOwnProperty('code')) {
            return;
        }
        getSessionWithGoogleRequest((response as GoogleLoginResponse).tokenId).then((response) => {
            if (response) {
                setError(response.error);
            }
        });
    };

    const onFailure = (error: any) => {
        console.log(error);
    };

    return (
        <div className="google-button">
            {userData ? (
                <GoogleLogout
                    clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                    buttonText="Logout"
                    onLogoutSuccess={clearSession}
                />
            ) : (
                <GoogleLogin
                    disabled={getSessionWithGoogleLoading}
                    clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    isSignedIn={true}
                    buttonText="Login"
                />
            )}
            {error && <Alert severity="error">{error}</Alert>}
        </div>
    );
}
