import styles from "./Header.module.css"

import React, { Dispatch, FunctionComponent, SetStateAction } from "react";
import { Movie } from "../../../typings";

interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSearchResults: Dispatch<SetStateAction<Movie[]>>;
}

const Header: FunctionComponent<Props> = ({ setLoading, setSearchResults }) => {
  return <header className={styles.header}>Header</header>;
};

export default Header;
