import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
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
  poster: {
    height: "300px",
  },
}));
