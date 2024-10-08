import styles from "./Footer.module.css";

import React, { FunctionComponent } from "react";
import Image from "next/image";

const MINIMUM_MOBILE_LANDSCAPE_WIDTH = 640;

const Footer: FunctionComponent = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.logoWrapper}>
        <p className={styles.preLogo}>Powered by</p>
        <Image
          src="/images/attribution.svg"
          layout="fixed"
          width={
            window.innerWidth >= MINIMUM_MOBILE_LANDSCAPE_WIDTH
              ? "100px"
              : "80px"
          }
          height={
            window.innerWidth >= MINIMUM_MOBILE_LANDSCAPE_WIDTH
              ? "20px"
              : "15px"
          }
          objectFit="contain"
          alt="Attribution Logo"
          unoptimized={true}
        />
      </div>
      <p className={styles.attribution}>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
      <a
        className={styles.githubLink}
        target="_blank"
        href="https://github.com/davmoba4/my-movies"
        aria-label="GitHub"
      >
        <Image
          className={styles.githubLogo}
          src="/images/github_icon.svg"
          width="24px"
          height="24px"
          layout="fixed"
          objectFit="contain"
          alt="Github Logo"
          unoptimized={true}
        />
      </a>
    </div>
  );
};

export default Footer;
