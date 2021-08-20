import { Link } from "react-router-dom";

import logo from "./icon.png";

export const Logo = () => {
  return (
    <div className="logo">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
    </div>
  );
};
