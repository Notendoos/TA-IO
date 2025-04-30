import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

import { FavoriteMovie, IMDBMovieResult } from '../model/movie';

import { useMovies } from '../contexts/MovieContext';

const MovieCard: FunctionComponent<{movie: IMDBMovieResult | FavoriteMovie, isEditable?: boolean}> = (props)=> {
  const { dispatch } = useMovies();

  const removeMovie = () => {
    dispatch({type:'toggleFavorite', payload: props.movie});
  }

  return (
    <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <NavLink to={`/detail/${props.movie.imdbID}`}>
        <div className="flex-1 flex flex-col">
          <img className="h-48 mx-auto mt-4" src={props.movie.Poster} />
          <div className="p-4">
            <h3 className="mt-6 text-gray-900 text-sm font-medium">{props.movie.Title}</h3>
            <dl className="mt-1 flex-grow flex flex-col justify-between">
              <dd className="text-gray-500 text-sm">{props.movie.Year}</dd>
            </dl>
          </div>
        </div>
      </NavLink>
      {props.isEditable && 
        <div className="flex justify-around">
          <NavLink to={`/edit/${props.movie.imdbID}`}>
            <button className="p-4 text-orange-600">Edit</button>
          </NavLink>
          <button className="p-4 text-red-600" onClick={removeMovie}>Remove</button>
        </div>
      }
    </li>
  );
};

export default MovieCard;
