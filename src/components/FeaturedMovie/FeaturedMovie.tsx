import styles from "./FeaturedMovie.module.css";
import useStyles from "./StylesMUI";

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
import {
  child,
  get,
  off,
  onChildAdded,
  onChildRemoved,
  ref,
} from "firebase/database";
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
  const [movieCollectionIDs, setMovieCollectionIDs] = useState<string[]>([]);
  const [renderToggler, setRenderToggler] = useState(false);
  const [trailerIsPlaying, setTrailerIsPlaying] = useState<boolean>(false);

  if (!selectedMovie) return null;

  useEffect(() => {
    if (movieCollectionIDs) {
      selectedMovie.collected = movieCollectionIDs.includes(
        selectedMovie.id.toString()
      );
      setRenderToggler(!renderToggler);
    }
  }, [movieCollectionIDs]);

  useEffect(() => {
    const dbRef = ref(db);
    get(child(dbRef, `movies/${user.uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const items = snapshot.val();
        const keys = Object.keys(items);
        setMovieCollectionIDs(keys);
      }
    });
  }, [selectedMovie]);

  useEffect(() => {
    if (user) {
      const movieRef = ref(db, `movies/${user.uid}`);

      onChildAdded(movieRef, (data) => {
        const newMovieCollectionIDs = [...movieCollectionIDs];
        newMovieCollectionIDs.push(data.key.toString());
        setMovieCollectionIDs(newMovieCollectionIDs);
      });

      onChildRemoved(movieRef, (data) => {
        const newMovieCollectionIDs = movieCollectionIDs.filter(
          (i) => i.toString() !== data.key.toString()
        );
        setMovieCollectionIDs(newMovieCollectionIDs);
      });

      return () => {
        off(movieRef);
      };
    }
  }, []);

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
          onClick={() => addMovie(user.uid, selectedMovie)}
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
