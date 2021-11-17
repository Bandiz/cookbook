import { Alert } from '@mui/material';
import { useState } from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from 'react-google-login';

import { GetSession } from '../../api/session/getSession';
import { useGlobalContext } from '../../contexts/RecipesContext';

export default function GoogleButton() {
    const { userData, clearSession } = useGlobalContext();
    const { getSessionRequest, getSessionLoading } = GetSession();
    const [error, setError] = useState<string>();

    const onSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if (response.hasOwnProperty('code')) {
            return;
        }
        getSessionRequest((response as GoogleLoginResponse).tokenId).then((response) => {
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
                    disabled={getSessionLoading}
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
