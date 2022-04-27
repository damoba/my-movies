import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../context/authProvider";
import Header from "../components/Header/Header";
import FeaturedMovie from "../components/FeaturedMovie/FeaturedMovie";
import axios from "../config/axios";
import requests, { fetchMovie } from "../config/api";
import { Movie } from "../../typings";

interface Props {
  featuredMovie: Movie;
}

const IndexPage: NextPage<Props> = ({ featuredMovie }) => {
  const { user, userIsLoading } = useAuth();
  const router = useRouter();
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
          <FeaturedMovie featuredMovie={featuredMovie} intro="Today's Featured Film"/>
        </>
      )}
    </div>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const topRatedMoviesResponse = await axios.get(requests.fetchTopRatedMovies);
  const featuredMovieId =
    topRatedMoviesResponse.data.results[
      Math.floor(Math.random() * topRatedMoviesResponse.data.results.length)
    ].id;
  const featuredMovieResponse = await axios.get(fetchMovie(featuredMovieId));
  const featuredMovieFull = featuredMovieResponse.data;

  var releaseDates = featuredMovieFull.release_dates.results;
  var certification = null;
  for (let i = 0; i < releaseDates.length; i++) {
    if (
      releaseDates[i].iso_3166_1 === "US" ||
      releaseDates[i].iso_3166_1 === "CA"
    ) {
      certification = releaseDates[i].release_dates[0].certification;
    }
  }
  var videoId = featuredMovieFull.videos?.results[0]?.key;
  var date = new Date(
    featuredMovieFull.release_date || featuredMovieFull.first_air_date
  );
  var year = date.getFullYear();

  const featuredMovie = {
    certification: certification ?? null,
    videoId: videoId ?? null,
    year,
    title: featuredMovieFull.title ?? null,
    original_title: featuredMovieFull.original_title ?? null,
    name: featuredMovieFull.name ?? null,
    original_name: featuredMovieFull.original_name ?? null,
    genres: featuredMovieFull.genres ?? null,
    overview: featuredMovieFull.overview ?? null,
    vote_average: featuredMovieFull.vote_average ?? null,
    vote_count: featuredMovieFull.vote_count ?? null,
    backdrop_path: featuredMovieFull.backdrop_path ?? null,
    poster_path: featuredMovieFull.poster_path ?? null,
  };

  return {
    props: {
      featuredMovie,
    },
  };
};
