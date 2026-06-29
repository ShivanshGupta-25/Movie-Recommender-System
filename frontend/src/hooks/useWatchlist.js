import { useEffect, useState } from "react";

import {

    getWatchlist,

    addWatchlist,

    removeWatchlist,

} from "../utils/storage";

const useWatchlist = () => {

    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {

        setWatchlist(

            getWatchlist()

        );

    }, []);

    const toggleWatchlist = (movie) => {

        const exists = watchlist.some(

            (m) => m.id === movie.id

        );

        let updated;

        if (exists) {

            updated = removeWatchlist(movie.id);

        } else {

            updated = addWatchlist(movie);

        }

        setWatchlist(updated);

    };

    const isWatchlistMovie = (id) =>

        watchlist.some(

            (movie) => movie.id === id

        );

    return {

        watchlist,

        toggleWatchlist,

        isWatchlistMovie,

    };

};

export default useWatchlist;