import styles from "../styles/Collection.module.css";

import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useAuth } from "../context/authProvider";
import { useRouter } from "next/router";
import Message from "../components/Message/Message";
import Results from "../components/Results/Results";
import Loader from "../components/Loader/Loader";
import { db } from "../firebase/config";
import {
  child,
  get,
  off,
  onChildAdded,
  onChildRemoved,
  orderByChild,
  query,
  ref,
  startAt,
} from "firebase/database";
import { MovieFromThumbnail } from "../../typings";

const collectionPage: NextPage = ({}) => {
  const { user, userIsLoading } = useAuth();
  const dbRef = ref(db);
  const router = useRouter();
  const [nextPageIsLoading, setNextPageIsLoading] = useState<boolean>(false);
  const [collectedMovies, setCollectedMovies] = useState<MovieFromThumbnail[]>(
    []
  );

  /**
   * When the page is loaded, load all of the collected movies from the database.
   */
  useEffect(() => {
    if (user) {
      get(child(dbRef, `movies/${user.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const moviesFromThumbnail = [];
          const items = snapshot.val();
          const keys = Object.keys(items);
          for (let i = 0; i < keys.length; i++) {
            moviesFromThumbnail.push(items[keys[i]]);
          }
          setCollectedMovies(moviesFromThumbnail);
        }
      });
    }
  }, [user]);

  if (userIsLoading) return null;
  if (!user) router.push("/auth");

  var movieRef = null;
  if (user) {
    movieRef = ref(db, `movies/${user.uid}`);
  }
  const now = new Date().getTime();
  const childAddedQueryConstraints = [orderByChild("timestamp"), startAt(now)];

  /**
   * When the back or forward button is pressed, set page to loading
   */
  window.onpopstate = () => {
    setNextPageIsLoading(true);
  };

  /**
   * When the refresh button is pressed, set page to loading
   */
  window.onbeforeunload = () => {
    setNextPageIsLoading(true);
  };

  if (movieRef) {
    /**
     * When a movie is added to the database (from featured movie banner),
     * the movie is added to the collection in the client.
     */
    onChildAdded(query(movieRef, ...childAddedQueryConstraints), (data) => {
      setCollectedMovies(collectedMovies.concat([data.val()]));
      return () => {
        off(movieRef);
      };
    });

    /**
     * When a movie is removed from the database (whether from featured movie or
     * from collection list), the movie is removed from the collection in the client.
     */
    onChildRemoved(movieRef, (data) => {
      setCollectedMovies(
        collectedMovies.filter((m) => m.id.toString() !== data.key.toString())
      );
      return () => {
        off(movieRef);
      };
    });
  }

  return (
    <div className={styles.collectionPage}>
      {user && (
        <>
          <Head>
            <title>My Movies - search results</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          {nextPageIsLoading && <Loader />}
          <Header
            setNextPageIsLoading={setNextPageIsLoading}
            homeIsCurrentPage={false}
            collectionIsCurrentPage={false}
          />
          {collectedMovies.length === 0 ? (
            <Message
              text="Add movies to your collection to see them here."
              style={null}
            />
          ) : (
            <Results
              results={collectedMovies}
              setNextPageIsLoading={setNextPageIsLoading}
              title="My Collection"
              isCollection={true}
            />
          )}
          <Footer />
        </>
      )}
    </div>
  );
};

export default collectionPage;
