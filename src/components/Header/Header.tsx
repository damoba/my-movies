import styles from "./Header.module.css";

import React, { FunctionComponent, useRef, useState } from "react";
import { ArrowDropDown, Search } from "@material-ui/icons";
import { useRouter } from "next/router";
import Image from "next/image";

const Header: FunctionComponent = () => {
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [searchIsOpen, setSearchIsOpen] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);

  /**
   * When scrolled more than 100 pageYOffset, isScrolled state turns true.
   * @returns unsubscribe function
   */
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset <= 100 ? false : true);
    return () => (window.onscroll = null);
  };

  /**
   * When the search icon is clicked, searchIsOpen state turns true.
   */
  const handleSearchClick = () => {
    setSearchIsOpen(true);
    setTimeout(() => {
      searchRef.current.focus();
    }, 300);
  };

  return (
    <header
      className={
        isScrolled ? `${styles.header} ${styles.scrolled}` : styles.header
      }
    >
      <div className={styles.navMainContainer}>
        <span className={styles.logo}>My Movies</span>
        <div className={styles.navRightContainer}>
          <div
            className={
              searchIsOpen ? `${styles.search} ${styles.open}` : styles.search
            }
            onClick={handleSearchClick}
          >
            <Search className={styles.searchIcon} style={{ fontSize: 20 }} />
            <form
              onSubmit={() =>
                router.push(
                  `/search?query=${encodeURIComponent(searchRef.current.value)}`
                )
              }
            >
              <input
                ref={searchRef}
                type="search"
                onBlur={() => setSearchIsOpen(false)}
                placeholder="Search..."
              />
              <button type="submit" style={{ display: "none" }} />
            </form>
          </div>
          <div className={styles.profile}>
            <div className={styles.profilePicContainer}>
              <Image
                src="/images/profile_picture.png"
                height="25px"
                width="25px"
                alt="Profile Picture"
                objectFit="cover"
              />
            </div>
            <ArrowDropDown/>
            <div className={styles.profileOptions}>
              <span>Settings</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
