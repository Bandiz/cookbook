import { useState } from "react";

import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";
import { useGlobalContext } from "../../RecipesContext";

import "./GoogleButton.scss";

export default function GoogleButton() {
  const { userData, fetchUserData } = useGlobalContext();
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  const onSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const tokenId = (response as GoogleLoginResponse).tokenId;
    fetchUserData(tokenId);
    setIsLoggedIn(true);
  };

  console.log("data from BE", userData);

  const onFailure = (error: any) => {
    console.log(error);
    debugger;
  };

  return (
    <div className="google-button">
      {isLoggedIn ? (
        <GoogleLogout
          clientId="817195564279-j5uoj6i8bk13oatgk6i9pa3o3u8ui2k8.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={() => setIsLoggedIn(false)}
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
    </div>
  );
}
