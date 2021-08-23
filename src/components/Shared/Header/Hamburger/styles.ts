import { makeStyles } from "@material-ui/core";

export default makeStyles({
  logo: {
    width: "90px",
    marginBottom: 10,
  },
  drawer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  linkText: {
    marginBottom: 10,

    "&:hover": {
      color: "var(--primaryColor)",
      fontWeight: 400,
    },
  },
});
