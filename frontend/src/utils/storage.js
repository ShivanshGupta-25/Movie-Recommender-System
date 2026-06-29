const FAVORITES_KEY = "movieai_favorites";

export const getFavorites = () => {
    try {
        const data = localStorage.getItem(FAVORITES_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

export const saveFavorites = (movies) => {
    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(movies)
    );
};

export const isFavorite = (id) => {
    const movies = getFavorites();

    return movies.some(
        (movie) => movie.id === id
    );
};

export const addFavorite = (movie) => {
    const movies = getFavorites();

    if (
        movies.find((m) => m.id === movie.id)
    ) {
        return movies;
    }

    const updated = [movie, ...movies];

    saveFavorites(updated);

    return updated;
};

export const removeFavorite = (id) => {

    const updated = getFavorites().filter(
        (movie) => movie.id !== id
    );

    saveFavorites(updated);

    return updated;
};