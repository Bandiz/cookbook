import React from "react";
import { Link } from "react-router-dom";

import { ListItemIcon, ListItemText, Menu, MenuItem } from "@material-ui/core";
import useStyles from "./styles";
import { SubmenuProps } from "../types";

export default function Submenu({
  open,
  handleClose,
  menuLinks,
}: SubmenuProps) {
  const classes = useStyles();

  return (
    <Menu
      anchorEl={open}
      keepMounted
      open={Boolean(open)}
      onClose={handleClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <div className={classes.submenu}>
        <MenuItem
          className={classes.item}
          onClick={handleClose}
          component={Link}
          to={`/recipes`}
        >
          Show All
        </MenuItem>
        {menuLinks
          .filter((recipes) => recipes.label === "Recipes")
          .map((link) =>
            link.sublinks?.map((sublink, index) => {
              const { label, icon, subUrl } = sublink;
              return (
                <MenuItem
                  className={classes.item}
                  onClick={handleClose}
                  key={index}
                  component={Link}
                  to={subUrl}
                >
                  <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
                  <ListItemText className={classes.label} primary={label} />
                </MenuItem>
              );
            })
          )}
      </div>
    </Menu>
  );
}
