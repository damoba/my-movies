import styles from "./FeaturedMovie.module.css";
import useStyles from "../../styles/StylesMUI";

import React, { FunctionComponent, useEffect, useState } from "react";
import { imageBaseURL } from "../../config/requests";
import { MovieFromFeatured } from "../../../typings";
import Rating from "@material-ui/lab/Rating";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import { Button, Grow } from "@material-ui/core";
import { Add, PlayArrowRounded, Remove } from "@material-ui/icons";
import ModalVideo from "react-modal-video";
import { addMovie, removeMovie } from "../../firebase/api";
import { useAuth } from "../../context/authProvider";
import { child, get, off, onChildRemoved, ref } from "firebase/database";
import { db } from "../../firebase/config";

interface Props {
  selectedMovie: MovieFromFeatured;
  selectedMovieIntro: string | null;
}

const FeaturedMovie: FunctionComponent<Props> = ({
  selectedMovie,
  selectedMovieIntro,
}) => {
  const classes = useStyles();
  const { user } = useAuth();
  const dbRef = ref(db);
  const movieRef = ref(db, `movies/${user.uid}`);
  const [renderToggler, setRenderToggler] = useState<boolean>(false);
  const [trailerIsPlaying, setTrailerIsPlaying] = useState<boolean>(false);

  /**
   * When the featured movie is loaded, change the collected status to
   * true if it's ID is in the database.
   */
  useEffect(() => {
    if (selectedMovie) {
      get(child(dbRef, `movies/${user.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const items = snapshot.val();
          const keys = Object.keys(items);
          if (keys.includes(selectedMovie.id.toString())) {
            selectedMovie.collected = true;
            setRenderToggler(!renderToggler);
          }
        }
      });
    }
  }, [selectedMovie]);

  if (!selectedMovie) return null;

  /**
   * When the "collect movie" button is pressed, add this movie to the database
   * and update the featured movie status to collected.
   */
  const handleAddClick = () => {
    addMovie(user.uid, selectedMovie);
    selectedMovie.collected = true;
    setRenderToggler(!renderToggler);
  };

  /**
   * When a movie is removed from the database (whether from featured movie or
   * from collection list), the featured movie status is updated to not collected
   * if it matches the removed movie's ID.
   */
  onChildRemoved(movieRef, (data) => {
    if (data.key.toString() === selectedMovie.id.toString()) {
      selectedMovie.collected = false;
      setRenderToggler(!renderToggler);
    }
    return () => {
      off(movieRef);
    };
  });

  return (
    <div className={styles.container}>
      {selectedMovie.videoId && (
        <Grow in={trailerIsPlaying} mountOnEnter unmountOnExit>
          <ModalVideo
            isOpen="true"
            channel="youtube"
            videoId={selectedMovie.videoId}
            onClose={() => setTrailerIsPlaying(false)}
          />
        </Grow>
      )}
      <div
        className={styles.overlay}
        style={{
          backgroundImage: `url(${imageBaseURL}${
            selectedMovie.backdrop_path || selectedMovie.poster_path
          })`,
        }}
      ></div>
      {selectedMovieIntro && (
        <p className={styles.intro}>{selectedMovieIntro}</p>
      )}
      <h1 className={styles.title}>
        {selectedMovie.title ||
          selectedMovie.original_title ||
          selectedMovie.name ||
          selectedMovie.original_name}
        {selectedMovie.year && (
          <span className={styles.year}>({selectedMovie.year})</span>
        )}
      </h1>
      <p className={styles.genres}>
        {selectedMovie.certification && (
          <span className={styles.certification}>
            {selectedMovie.certification}
          </span>
        )}
        {selectedMovie.genres?.slice(0, 3).map((genre) => (
          <span className={styles.genre}>{genre.name}</span>
        ))}
      </p>
      <p className={styles.overview}>{selectedMovie.overview}</p>
      <div className={styles.rating}>
        <Rating
          value={selectedMovie.vote_average && selectedMovie.vote_average / 2}
          precision={0.5}
          icon={<StarRoundedIcon />}
          readOnly
        />
        {selectedMovie.vote_average &&
        selectedMovie.vote_count &&
        selectedMovie.vote_count > 0 ? (
          <p className={styles.ratingNum}>
            {(selectedMovie.vote_average / 2).toFixed(1)}
            <small> ({selectedMovie.vote_count.toLocaleString("en-US")})</small>
          </p>
        ) : (
          <p className={styles.ratingNum}>(no rating yet)</p>
        )}
      </div>

      {selectedMovie.videoId && (
        <Button
          className={classes.button}
          variant="contained"
          startIcon={<PlayArrowRounded />}
          onClick={() => setTrailerIsPlaying(true)}
        >
          Play Trailer
        </Button>
      )}
      {!selectedMovie.collected ? (
        <Button
          className={classes.button}
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddClick}
        >
          Collect Movie
        </Button>
      ) : (
        <Button
          className={`${classes.button} ${classes.alert}`}
          variant="contained"
          startIcon={<Remove />}
          onClick={() => removeMovie(user.uid, selectedMovie.id)}
        >
          Remove from Collection
        </Button>
      )}
    </div>
  );
};

export default FeaturedMovie;
