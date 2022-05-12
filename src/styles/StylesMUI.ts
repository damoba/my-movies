import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  button: {
    marginRight: "5px",
    marginBottom: "4px",
    fontWeight: 500,
    fontSize: "10px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "14px",
      marginBottom: "0",
    },
    backgroundColor: "rgb(255,255,255)",
    borderRadius: "99px",
    color: "var(--main-color-medium)",
    "&:hover": {
      backgroundColor: "rgb(215,215,215)",
    },
  },
  alert: {
    backgroundColor: "#D46A6A",
    color: "white",
    "&:hover": {
      backgroundColor: "#BB6969",
    },
  },
  sliderArrow: {
    display: "none",
    zIndex: 99,
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "50px",
    height: "120px",
    backgroundColor: "rgba(23, 32, 50, 0.5)",
    color: "white",
    cursor: "pointer",
  },
  left: {
    left: 0,
  },
  right: {
    right: 0,
  },
  scrolled: {
    display: "inline-block",
  },
}));
