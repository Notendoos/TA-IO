import { FunctionComponent } from "react";

import { IMDBMovieResult } from "../model/movie";

import { useMovies } from "../contexts/MovieContext";

import MovieCard from "../components/MovieCard";

const Favorites: FunctionComponent = () => {
  const { state } = useMovies();
  return state.localMovies.length ? (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {state.localMovies.map((movie: IMDBMovieResult) => (
        <MovieCard movie={movie} key={movie.imdbID} isEditable/>
      ))}
    </ul>
  ) : (<span>No favorites yet</span>);
};

export default Favorites;
