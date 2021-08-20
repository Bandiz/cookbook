import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  submenu: {
    display: "flex",
    flexWrap: "wrap",
    width: 400,
    alignItems: "center",
  },
  item: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: "0 1 50%",

    "&:hover": {
      background: "var(--primaryColor)",
      color: "var(--mainWhite)",
    },

    "&:first-child": {
      flex: "100%",
      justifyContent: "center",
    },
  },
  icon: {
    justifyContent: "center",
  },
  label: {
    textTransform: "capitalize",
  },
});
