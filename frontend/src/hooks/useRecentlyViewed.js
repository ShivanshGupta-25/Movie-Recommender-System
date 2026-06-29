import { useEffect, useState } from "react";

import {

    getRecentlyViewed,

    addRecentlyViewed,

    clearRecentlyViewed,

} from "../utils/storage";

const useRecentlyViewed = () => {

    const [recentMovies, setRecentMovies] = useState([]);

    useEffect(() => {

        setRecentMovies(

            getRecentlyViewed()

        );

    }, []);

    const addMovie = (movie) => {

        const updated = addRecentlyViewed(movie);

        setRecentMovies(updated);

    };

    const clearHistory = () => {

        clearRecentlyViewed();

        setRecentMovies([]);

    };

    return {

        recentMovies,

        addMovie,

        clearHistory,

    };

};

export default useRecentlyViewed;