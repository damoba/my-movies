import { makeStyles, rgbToHex } from "@material-ui/core";

export default makeStyles(() => ({
  button: {
    marginRight: "5px",
    fontWeight: 500,
    backgroundColor: "rgb(255,255,255)",
    borderRadius: "99px",
    color: "var(--main-color-medium)",
    "&:hover": {
      backgroundColor: "rgb(215,215,215)",
    },
  },
}));
