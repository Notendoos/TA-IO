import { useState, useEffect } from "react";
import { IMDBResponse } from "../model/movie";

export const useApi = (params:string) => {
    const [data, setData] = useState<IMDBResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}${params}`);
                const json: IMDBResponse = await response.json();
                if(json.Response === 'False') throw new Error(json.Error);
                setData(json);
            } catch (error:any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [params]);

    return {data, loading, error}
}

