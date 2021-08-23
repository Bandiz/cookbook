import { Link } from "react-router-dom";
import { Logo } from "../Logo";

import { Drawer } from "@material-ui/core";
import useStyles from "./styles";

export type HamburgerProps = {
  open: boolean;
  handleClose: () => void;
  menuLinks: { label: string; url: string }[];
};

export default function Hamburger({
  menuLinks,
  handleClose,
  open,
}: HamburgerProps) {
  const classes = useStyles();

  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      classes={{ paper: classes.drawer }}
    >
      <>
        <div className={classes.logo}>
          <Logo />
        </div>
        {menuLinks.map((link, index) => {
          return (
            <Link
              className={classes.linkText}
              to={link.url}
              key={index}
              onClick={handleClose}
            >
              {link.label}
            </Link>
          );
        })}
      </>
    </Drawer>
  );
}
