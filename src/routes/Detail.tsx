import { FunctionComponent, useEffect, useState } from "react";
import Toggle from "../components/Toggle";
import { NavLink, useParams, useNavigate } from "react-router-dom";

import { useMovies } from "../contexts/MovieContext";
import { FavoriteMovie } from "../model/movie";
import Spinner from "../components/Spinner";

const Detail: FunctionComponent = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useMovies();
  const { id } = useParams();
  const [currentMovie, setCurrentMovie] = useState<FavoriteMovie>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}?apikey=${
            import.meta.env.VITE_API_KEY
          }&i=${id}`
        );
        let data = await response.json();
        if(
          state.localMovies.find((movie) => movie.imdbID === id)
        ){
          data = {...data, favorite:false, ...state.localMovies.find((movie) => movie.imdbID === id)};
        }
        setCurrentMovie(data);
        if(data.Response === 'False' || data.Response === undefined){
          navigate('/')
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id, state.localMovies]);

  const handleClick = () => {
    dispatch({type:'toggleFavorite', payload: currentMovie});
  }

  return currentMovie ? (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <div>
            <div className="w-full aspect-w-1 aspect-h-1">
              <img className="w-full h-full object-center object-cover sm:rounded-lg" src={currentMovie?.Poster}/>
            </div>
          </div>
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <Toggle 
              onClick={handleClick}
              isActive={currentMovie?.favorite}
            />
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {currentMovie?.Title}
            </h1>
            <div className="mt-3">
              <p className="text-3xl text-gray-900">{currentMovie?.Year}</p>
            </div>
            <div className="mt-3">
              <p className="text-xl text-gray-900">{currentMovie?.Actors}</p>
            </div>
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">
                <p>{currentMovie?.Plot}</p>
              </div>
            </div>
            {state.lastQuery && (
              <div className="mt-8 flex justify-between">
                <NavLink
                  to={`/?q=${state.lastQuery}`}
                >
                  back to list
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ): <Spinner />;
};

export default Detail;
