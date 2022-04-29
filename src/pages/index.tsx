import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../context/authProvider";
import Header from "../components/Header/Header";
import FeaturedMovie from "../components/FeaturedMovie/FeaturedMovie";
import axios from "../config/axios";
import requests, { fetchMovie } from "../config/api";
import { Movie, MovieFull } from "../../typings";
import { useState } from "react";

interface Props {
  featuredMovie: Movie;
}

const IndexPage: NextPage<Props> = ({ featuredMovie }) => {
  const { user, userIsLoading } = useAuth();
  const router = useRouter();

  const [selectedMovie, setSelectedMovie] = useState<Movie>(featuredMovie);
  const [selectedMovieIntro, setSelectedMovieIntro] = useState<string>(
    "One of Today's Featured Films"
  );

  if (userIsLoading) return null;
  if (!user) router.push("/auth");

  return (
    <div>
      {user && (
        <>
          <Head>
            <title>My Movies</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <FeaturedMovie
            selectedMovie={selectedMovie}
            selectedMovieIntro={selectedMovieIntro}
          />
        </>
      )}
    </div>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async () => {
  /**
   * Takes a full movie from the API and returns one with only selected attributes.
   * Calculates some of these attributes.
   * @param {MovieFull} movieFull Full movie to be filtered
   * @returns {Movie} Movie with selected attributes
   */
  const filterMovie = (movieFull: MovieFull): Movie => {
    var releaseDates = movieFull.release_dates.results;
    var certification = null;
    for (let i = 0; i < releaseDates.length; i++) {
      if (
        releaseDates[i].iso_3166_1 === "US" ||
        releaseDates[i].iso_3166_1 === "CA"
      ) {
        certification = releaseDates[i].release_dates[0].certification;
      }
    }
    var videoId = movieFull.videos?.results[0]?.key;
    var date = new Date(movieFull.release_date);
    var year = date?.getFullYear();

    return {
      collected: false,
      certification: certification ?? null,
      videoId: videoId ?? null,
      year,
      title: movieFull.title ?? null,
      original_title: movieFull.original_title ?? null,
      name: movieFull.name ?? null,
      original_name: movieFull.original_name ?? null,
      genres: movieFull.genres ?? null,
      overview: movieFull.overview ?? null,
      vote_average: movieFull.vote_average ?? null,
      vote_count: movieFull.vote_count ?? null,
      backdrop_path: movieFull.backdrop_path ?? null,
      poster_path: movieFull.poster_path ?? null,
    };
  };

  const topRatedMoviesResponse = await axios.get(requests.fetchTopRatedMovies);
  const featuredMovieId =
    topRatedMoviesResponse.data.results[
      Math.floor(Math.random() * topRatedMoviesResponse.data.results.length)
    ].id;
  const featuredMovieResponse = await axios.get(fetchMovie(featuredMovieId));
  const featuredMovieFull = featuredMovieResponse.data;
  const featuredMovie = filterMovie(featuredMovieFull);

  return {
    props: {
      featuredMovie,
    },
  };
};
