import styles from "./Header.module.css";

import React, { FunctionComponent, useState } from "react";

const Header: FunctionComponent = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset <= 100 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <header
      className={
        isScrolled ? `${styles.header} ${styles.scrolled}` : styles.header
      }
    >
      <div className={styles.container}>
        <span className={styles.logo}>My Movies</span>
        <span style={{ color: "white" }}>Test</span>
      </div>
    </header>
  );
};

export default Header;
