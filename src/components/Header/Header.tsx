import styles from "./Header.module.css";

import React, { FormEvent, FunctionComponent, useRef, useState } from "react";
import { ArrowDropDown, Search } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useAuth } from "../../context/authProvider";

const Header: FunctionComponent = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [searchIsOpen, setSearchIsOpen] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const [profileIsOpen, setProfileIsOpen] = useState<boolean>(false);

  /**
   * When scrolled more than 100 pageYOffset, isScrolled state turns true.
   * @returns Cleanup function
   */
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset <= 100 ? false : true);
    return () => (window.onscroll = null);
  };

  /**
   * When the window is clicked and the clicked element is not part
   * of the profile element and the profile menu is open, the profile
   * menu is closed.
   * @param {MouseEvent} e Event
   * @returns Cleanup function
   */
  window.onclick = (e: MouseEvent) => {
    var profile = document.getElementById("profile");
    if (profile && !profile.contains(e.target as Node) && profileIsOpen) {
      setProfileIsOpen(false);
    }
    return () => (window.onclick = null);
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

  /**
   * When the search is submitted, prevent default behaviour and route to search page.
   * @param e Event
   */
  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(searchRef.current.value)}`);
  };

  return (
    <header
      className={
        isScrolled ? `${styles.header} ${styles.scrolled}` : styles.header
      }
    >
      <div className={styles.navMainContainer}>
        <span className={styles.logo} onClick={() => router.push("/")}>
          My Movies
        </span>

        <div className={styles.navRightContainer}>
          <div
            className={
              searchIsOpen ? `${styles.search} ${styles.open}` : styles.search
            }
            onClick={handleSearchClick}
          >
            <Search className={styles.searchIcon} style={{ fontSize: 20 }} />
            <form onSubmit={handleSearchSubmit}>
              <input
                ref={searchRef}
                type="search"
                onBlur={() => setSearchIsOpen(false)}
                placeholder="Search..."
              />
              <button type="submit" style={{ display: "none" }} />
            </form>
          </div>

          <div
            className={styles.profile}
            id="profile"
            onClick={() => setProfileIsOpen(true)}
          >
            <img
              className={styles.profilePic}
              src="/images/profile_picture.png"
              alt="Profile Picture"
            />
            <ArrowDropDown />
            <div
              className={
                profileIsOpen
                  ? `${styles.profileOptions} ${styles.open}`
                  : styles.profileOptions
              }
            >
              <span className={styles.profileEmail}>{user.email}</span>
              <span
                className={styles.profileOption}
                onClick={() => router.push("/collection")}
              >
                My Collection
              </span>
              <span className={styles.profileOption} onClick={logout}>
                Log Out
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
