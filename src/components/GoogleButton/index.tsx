import { useCallback } from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from "react-google-login";
import { useGlobalContext } from "../../RecipesContext";

export default function GoogleButton() {
    const { userData, fetchUserData, logout } = useGlobalContext();

    const onSuccess = useCallback(
        (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
            const tokenId = (response as GoogleLoginResponse).tokenId;
            fetchUserData(tokenId);
            console.log("signed in", tokenId);
        },
        [fetchUserData]
    );

    const onFailure = (error: unknown) => {
        console.log(error);
        debugger;
    };

    return (
        <>
            {userData ? (
                <GoogleLogout
                    clientId="817195564279-j5uoj6i8bk13oatgk6i9pa3o3u8ui2k8.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={() => {
                        console.log("logout");
                        logout();
                    }}
                />
            ) : (
                <GoogleLogin
                    clientId="817195564279-j5uoj6i8bk13oatgk6i9pa3o3u8ui2k8.apps.googleusercontent.com"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    isSignedIn={true}
                    buttonText="Login"
                />
            )}
        </>
    );
}
