import { FunctionComponent, useEffect, useState } from "react";

import { IMDBMovieResult } from "../model/movie";

import { useMovies } from "../contexts/MovieContext";

import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";

const Home: FunctionComponent = () => {
  const { state } = useMovies();
  const [movieResults, setMovieResults] = useState<IMDBMovieResult[]>([]);

  useEffect(() => {
    if (state.movies) {
      const hasLocalMovie = (movie: IMDBMovieResult) =>
        state.localMovies.find(
          (localMovie) => localMovie.imdbID === movie.imdbID
        );
      setMovieResults(
        state.movies.map((movie) =>
          hasLocalMovie(movie)
            ? {
                ...movie,
                ...state.localMovies.find(
                  (localMovie) => localMovie.imdbID === movie.imdbID
                ),
              }
            : movie
        )
      );
    }
  }, [state.movies, state.localMovies]);

  return !state.isLoading ?  movieResults.length > 1 ? (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {movieResults.map((movie: IMDBMovieResult) => (
        <MovieCard
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  ) : (
    <Spinner />
  ) : state.lastQuery !== "" ? (
    <span>No Results Found</span>
  ) : (
    <></>
  );
};

export default Home;
