import React from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

import styles from "./Admin.module.scss";

const Admin = () => {
  const onSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log((response as GoogleLoginResponse).tokenId);
  };

  const onFailure = (error: any) => {
    console.log(error);
    debugger;
  };

  return (
    <div className={styles.container}>
      This is the admin page! Super secret!
      <GoogleLogin
        clientId="817195564279-j5uoj6i8bk13oatgk6i9pa3o3u8ui2k8.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
};

export default Admin;
