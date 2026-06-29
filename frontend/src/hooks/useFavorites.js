import { useEffect, useState } from "react";

import {
    getFavorites,
    addFavorite,
    removeFavorite,
} from "../utils/storage";

const useFavorites = () => {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {

        setFavorites(getFavorites());

    }, []);

    const toggleFavorite = (movie) => {

        const exists = favorites.some(
            (m) => m.id === movie.id
        );

        let updated;

        if (exists) {

            updated = removeFavorite(movie.id);

        } else {

            updated = addFavorite(movie);

        }

        setFavorites(updated);

    };

    const isFavoriteMovie = (id) =>

        favorites.some(
            (movie) => movie.id === id
        );

    return {

        favorites,

        toggleFavorite,

        isFavoriteMovie,

    };

};

export default useFavorites;