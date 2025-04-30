interface MovieRating {
  Source: string;
  Value: string;
}

export interface IMDBResponse {
  Response: string;
  Search?: IMDBMovie[];
  totalResults?: string;
  Error?: string
}
export interface IMDBMovieResult {
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  imdbID: string;
}
export interface FavoriteMovie extends IMDBMovie {
  favorite: boolean;
}
export interface movieState {
  movies: IMDBMovieResult[];
  localMovies: FavoriteMovie[];
  isLoading: boolean;
  lastQuery: string;
}

export interface IMDBMovie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: MovieRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}
