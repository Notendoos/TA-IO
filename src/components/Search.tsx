import { FunctionComponent, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

import { useMovies } from '../contexts/MovieContext';

const Search: FunctionComponent = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [debouncedQuery] = useDebounce(query, 500);
  const { dispatch } = useMovies();
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    navigate('/');
  };

  useEffect(() => {
    if (debouncedQuery.length < 3 || debouncedQuery.trim() === '') {
      setSearchResults([])
      dispatch({ type: 'setMovies', payload: [] });
      dispatch({ type: 'setLastQuery', payload: '' });
      return;
    }
    const fetchData = async () => {
      try {
        dispatch({ type: 'setLoading', payload: true });
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}?apikey=${import.meta.env.VITE_API_KEY}&s=${debouncedQuery}`
        );
        const data = await response.json();
        setSearchResults(data);
        setSearchParams({ q: debouncedQuery });
        dispatch({ type: 'setLastQuery', payload: debouncedQuery.trim() });
        dispatch({ type: 'setMovies', payload: data.Search ?? [] });
        dispatch({ type: 'setLoading', payload: false });
      } catch (err) {
        console.error(err);
      }
    };
    if (debouncedQuery) {
      fetchData();
    }
  }, [debouncedQuery]);

  return (
    <div className="w-full">
      <label className="sr-only">{}</label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
          placeholder="Search"
          type="search"
          value={query}
          onChange={(e) => handleOnChange(e)}
        />
      </div>
    </div>
  );
};

export default Search;

