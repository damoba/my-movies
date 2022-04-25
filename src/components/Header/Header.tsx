import styles from "./Header.module.css";

import React, { FunctionComponent, useRef, useState } from "react";
import { ArrowDropDown, Search } from "@material-ui/icons";
import { useRouter } from "next/router";
import Image from "next/image";
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

          <div
            className={styles.profile}
            id="profile"
            onClick={() => setProfileIsOpen(true)}
          >
            <div className={styles.profilePicContainer}>
              <Image
                src="/images/profile_picture.png"
                height="25px"
                width="25px"
                alt="Profile Picture"
                objectFit="cover"
              />
            </div>
            <ArrowDropDown />
            <div
              className={
                profileIsOpen
                  ? `${styles.profileOptions} ${styles.open}`
                  : styles.profileOptions
              }
            >
              <span
                className={
                  isScrolled
                    ? `${styles.profileEmail} ${styles.open} ${styles.scrolled}`
                    : `${styles.profileEmail} ${styles.open}`
                }
              >
                {user.email}
              </span>
              <span
                className={
                  isScrolled
                    ? `${styles.profileOption} ${styles.scrolled}`
                    : `${styles.profileOption} `
                }
                onClick={() => router.push("/collection")}
              >
                My Collection
              </span>
              <span
                className={
                  isScrolled
                    ? `${styles.profileOption} ${styles.scrolled}`
                    : `${styles.profileOption}`
                }
                onClick={logout}
              >
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
