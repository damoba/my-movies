import styles from "./Header.module.css";

import React, {
  Dispatch,
  FormEvent,
  FunctionComponent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { ArrowDropDown, Search } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useAuth } from "../../context/authProvider";

interface Props {
  setNextPageIsLoading: Dispatch<SetStateAction<boolean>>;
  homeIsCurrentPage: boolean;
  collectionIsCurrentPage: boolean;
  genresAreOpen: boolean;
  setGenresAreOpen: Dispatch<SetStateAction<boolean>>;
}

const Header: FunctionComponent<Props> = ({
  setNextPageIsLoading,
  homeIsCurrentPage,
  collectionIsCurrentPage,
  genresAreOpen,
  setGenresAreOpen,
}) => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [searchIsOpen, setSearchIsOpen] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const genreOptionsRef = useRef<HTMLDivElement>(null);
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
   * menu is closed. Same for the genres menu.
   * @param {MouseEvent} e Event
   * @returns Cleanup function
   */
  window.onclick = (e: MouseEvent) => {
    var profile = document.getElementById("profile");
    if (profile && !profile.contains(e.target as Node) && profileIsOpen) {
      setProfileIsOpen(false);
    }
    var genres = document.getElementById("genres");
    if (genres && !genres.contains(e.target as Node) && genresAreOpen) {
      setGenresAreOpen(false);
    }

    return () => (window.onclick = null);
  };

  /**
   * When the logo is clicked, route to the home page only if not already there.
   */
  const handleLogoClick = () => {
    if (!homeIsCurrentPage) {
      setNextPageIsLoading(true);
      router.push("/");
    }
  };

  /**
   * When the search icon is clicked, searchIsOpen state turns true.
   */
  const handleSearchClick = () => {
    setSearchIsOpen(true);
    searchRef.current.focus();
  };

  /**
   * When the search is submitted, prevent default behaviour and route to search page.
   * Only route to search page if search query is not already submitted on search page.
   * @param e Event
   */
  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();

    const searchQuery = encodeURIComponent(searchRef.current.value);
    const params = new URL(document.location.href).searchParams;
    if (params.get("query") !== searchQuery) {
      setNextPageIsLoading(true);
      router.push(`/search?query=${searchQuery}`);
    }
  };

  /**
   * When a genre is clicked, route to the search page with appropriate genre only if not already there.
   * @param genreRequest
   */
  const handleGenreClick = (genreRequest: string) => {
    const params = new URL(document.location.href).searchParams;
    if (params.get("genre") !== genreRequest) {
      setNextPageIsLoading(true);
      router.push(`/search?genre=${genreRequest}`);
    }
  };

  /**
   * When the "My Collection" option is clicked, route to the according page only if not already there.
   */
  const handleCollectionClick = () => {
    if (!collectionIsCurrentPage) {
      setNextPageIsLoading(true);
      router.push("/collection");
    }
  };

  return (
    <header
      className={
        isScrolled ? `${styles.header} ${styles.scrolled}` : styles.header
      }
    >
      <div className={styles.navMainContainer}>
        <span className={styles.logo} onClick={handleLogoClick}>
          My Movies
        </span>

        <div className={styles.navRightContainer}>
          <div
            className={
              searchIsOpen ? `${styles.search} ${styles.open}` : styles.search
            }
            onClick={handleSearchClick}
          >
            <Search className={styles.searchIcon}/>
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
            className={styles.genres}
            id="genres"
            onClick={() => setGenresAreOpen(true)}
          >
            <div>Genres</div>
            <div
              ref={genreOptionsRef}
              className={`${styles.genreOptions} ${
                genresAreOpen && styles.open
              }`}
            >
              <span
                className={styles.genreOption}
                onClick={() => handleGenreClick("fetchActionMovies")}
              >
                Action
              </span>
              <span
                className={styles.genreOption}
                onClick={() => handleGenreClick("fetchAdventureMovies")}
              >
                Adventure
              </span>
              <span
                className={styles.genreOption}
                onClick={() => handleGenreClick("fetchAnimationMovies")}
              >
                Animation
              </span>
              <span
                className={styles.genreOption}
                onClick={() => handleGenreClick("fetchComedyMovies")}
              >
                Comedy
              </span>
              <span
                className={styles.genreOption}
                onClick={() => handleGenreClick("fetchCrimeMovies")}
              >
                Crime
              </span>
              <span
                className={styles.genreOption}
                onClick={() => handleGenreClick("fetchDocumentaryMovies")}
              >
                Documentary
              </span>
              <span
                className={styles.genreOption}
                onClick={() => handleGenreClick("fetchDramaMovies")}
              >
                Drama
              </span>
              <span
                className={styles.genreOption}
                onClick={() => handleGenreClick("fetchFamilyMovies")}
              >
                Family
              </span>
              <span
                className={styles.genreOption}
                onClick={() => handleGenreClick("fetchFantasyMovies")}
              >
                Fantasy
              </span>
              <span
                className={styles.genreOption}
                onClick={() => handleGenreClick("fetchHistoryMovies")}
              >
                History
              </span>
              <span
                className={styles.genreOption}
                onClick={() => handleGenreClick("fetchHorrorMovies")}
              >
                Horror
              </span>
              <span
                className={styles.genreOption}
                onClick={() => handleGenreClick("fetchMusicMovies")}
              >
                Music
              </span>
              <span
                className={styles.genreOption}
                onClick={() => handleGenreClick("fetchMysteryMovies")}
              >
                Mystery
              </span>
              <span
                className={styles.genreOption}
                onClick={() => handleGenreClick("fetchRomanceMovies")}
              >
                Romance
              </span>
              <span
                className={styles.genreOption}
                onClick={() => handleGenreClick("fetchScienceFictionMovies")}
              >
                Science Fiction
              </span>
              <span
                className={styles.genreOption}
                onClick={() => handleGenreClick("fetchTVMovies")}
              >
                TV Movie
              </span>
              <span
                className={styles.genreOption}
                onClick={() => handleGenreClick("fetchThrillerMovies")}
              >
                Thriller
              </span>
              <span
                className={styles.genreOption}
                onClick={() => handleGenreClick("fetchWarMovies")}
              >
                War
              </span>
              <span
                className={styles.genreOption}
                onClick={() => handleGenreClick("fetchWesternMovies")}
              >
                Western
              </span>
            </div>
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
                onClick={handleCollectionClick}
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
