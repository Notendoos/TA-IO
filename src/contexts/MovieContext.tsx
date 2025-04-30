import { FavoriteMovie, movieState } from "../model/movie";
import { createContext, useReducer, useContext, Dispatch } from "react";

interface MovieContextType {
  state: movieState;
  dispatch: Dispatch<any>;
}

const MovieContext = createContext({} as MovieContextType);

const initialState: movieState = {
  movies: [],
  localMovies: [],
  isLoading: false,
  lastQuery: '',
};

const reducer = (state: movieState, action: any) => {
  switch (action.type) {
    case "setLoading":{
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case "setLastQuery":{
      return {
        ...state,
        lastQuery: action.payload,
      };
    }
    case "setMovies":{
      return {
        ...state,
        movies: action.payload,
      };
    }
    case "toggleFavorite": {
      const movie = state.localMovies.find((movie) => movie.imdbID === action.payload.imdbID);
      if (!movie) {
        return {
          ...state,
          localMovies: [...state.localMovies, { ...action.payload, favorite: true }],
        };
      } else {
        return {
          ...state,
          localMovies: state.localMovies.filter((movie) => movie.imdbID !== action.payload.imdbID),
        };
      }
    }
    case "updateMovie":{
      return {
        ...state,
        localMovies: state.localMovies.map((movie: FavoriteMovie) =>
          movie.imdbID === action.payload.imdbID
            ? { ...movie, ...action.payload }
            : movie
        ),
      };
    }
    default:{
      throw Error('Unknown action: ' + action.type);
    }
  }
};

export const MovieProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => {
  return useContext(MovieContext);
};

