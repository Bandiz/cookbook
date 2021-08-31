import { Link } from "react-router-dom";
import { Logo } from "../Logo";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Drawer,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./Hamburger.scss";

import { HamburgerProps } from "../types";
import Submenu from "../Submenu";
import { useGlobalContext } from "../../../../RecipesContext";

export default function Hamburger({
  menuLinks,
  handleClose,
  open,
}: HamburgerProps) {
  const { userData } = useGlobalContext();

  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      classes={{ paper: "drawer" }}
    >
      <div className="logo" onClick={handleClose}>
        <Logo />
      </div>
      {menuLinks.map((link, index) => {
        const { label, url } = link;
        return label === "Recipes" ? (
          <Accordion key={index} className="accordion">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Link className="link-text" to={url} onClick={handleClose}>
                {label}
              </Link>
            </AccordionSummary>
            <AccordionDetails>
              <Submenu menuLinks={menuLinks} handleClose={handleClose} />
            </AccordionDetails>
          </Accordion>
        ) : (
          <Accordion key={index} className="accordion" expanded={false}>
            <AccordionSummary>
              <Link className="link-text" to={url} onClick={handleClose}>
                {label}
              </Link>
            </AccordionSummary>
          </Accordion>
        );
      })}
      {userData?.user.isAdmin && (
        <Accordion className="accordion" expanded={false}>
          <AccordionSummary>
            <Link className="link-text" to={"/admin"} onClick={handleClose}>
              Admin
            </Link>
          </AccordionSummary>
        </Accordion>
      )}
    </Drawer>
  );
}