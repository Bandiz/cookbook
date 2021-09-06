import { Link } from "react-router-dom";
import { HOME } from "../../../../constants/routes";

import logo from "./icon.png";

export const Logo = () => {
    return (
        <div className="logo">
            <Link to={HOME}>
                <img src={logo} alt="Logo" />
            </Link>
        </div>
    );
};
