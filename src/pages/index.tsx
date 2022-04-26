import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/authProvider";
import Header from "../components/Header/Header";
import FeaturedMovie from "../components/FeaturedMovie/FeaturedMovie";
import axios from "../config/axios";
import requests, { fetchMovie, imageBaseURL } from "../config/api";
import { Movie } from "../../typings";

interface Props {
  featuredMovie: Movie;
}

const IndexPage: NextPage<Props> = ({ featuredMovie }) => {
  const { user, userIsLoading } = useAuth();
  const router = useRouter();
  if (userIsLoading) return null;
  if (!user) router.push("/auth");

  var backgroundImage = `url(${imageBaseURL}${
    featuredMovie.backdrop_path || featuredMovie.poster_path
  })`;

  return (
    <div>
      {user && (
        <>
          <Head>
            <title>My Movies</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <FeaturedMovie backgroundImage={backgroundImage} />
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
  const featuredMovie = featuredMovieResponse.data;

  return {
    props: {
      featuredMovie,
    },
  };
};
