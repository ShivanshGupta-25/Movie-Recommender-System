import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/movieApi";

const useMovieDetails = (title) => {

    const [movie, setMovie] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        if (!title) return;

        fetchMovie();

    }, [title]);

    const fetchMovie = async () => {

        try {

            setLoading(true);

            setError("");

            const data = await getMovieDetails(title);

            setMovie(data);

        }

        catch (err) {

            console.error(err);

            setError("Unable to load movie.");

        }

        finally {

            setLoading(false);

        }

    };

    return {

        movie,

        loading,

        error,

    };

};

export default useMovieDetails;