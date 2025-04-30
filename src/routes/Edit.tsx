import { FunctionComponent, useState, useEffect } from 'react';

import { useMovies } from "../contexts/MovieContext";
import { useParams } from "react-router-dom";
import { FavoriteMovie } from "../model/movie";
import { Field, ErrorMessage, Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Edit: FunctionComponent = () => {
  const { state, dispatch } = useMovies();
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentMovie, setCurrentMovie] = useState<FavoriteMovie>();

  useEffect(()=>{
    const foundMovie = state.localMovies.find((movie) => movie.imdbID === id)
    if(!foundMovie){
      navigate('/')
    }
    setCurrentMovie(foundMovie)
  }, [id])
  
  return (
    <div className="bg-white">
      {currentMovie && <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <div>
            <div className="w-full aspect-w-1 aspect-h-1">
              <img className="w-full h-full object-center object-cover sm:rounded-lg" src={currentMovie.Poster} alt="" />
            </div>
          </div>
          <Formik
            initialValues={{
              Title: currentMovie?.Title,
              Year: currentMovie?.Year,
              Actors: currentMovie?.Actors,
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.Title) {
                errors.Title = 'Required';
              }
              if (!values.Year) {
                errors.Year = 'Required';
              }
              if (!values.Actors) {
                errors.Actors = 'Required';
              }
              return errors;
            }}
            onSubmit={(values,actions) => {
              dispatch({type:'updateMovie', payload: {...values, imdbID: id}});
              actions.setSubmitting(false);
              navigate('/favorites');
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <div className="mt-1">
                      <Field
                        name="Title"
                        type="text"
                        className="shadow-sm p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      <ErrorMessage name='Title' component='div'/>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700">
                      Year
                    </label>
                    <div className="mt-1">
                      <Field
                        name="Year"
                        type="text"
                        className="shadow-sm p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      <ErrorMessage name='Year' component='div'/>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700">
                      Actors
                    </label>
                    <div className="mt-1">
                      <Field
                        name="Actors"
                        type="text"
                        className="shadow-sm p-2 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      <ErrorMessage name='Actors' component='div'/>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    {isSubmitting ? <Spinner/> : <button
                        className="text-sm text-blue-500 hover:text-black"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Save favorite
                      </button>}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>}
    </div>
  );
};

export default Edit;

