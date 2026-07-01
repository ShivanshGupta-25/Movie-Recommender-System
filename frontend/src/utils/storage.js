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

/* -------------------------------
        WATCHLIST
-------------------------------- */

const WATCHLIST_KEY = "movieai_watchlist";

export const getWatchlist = () => {

    try {

        const data = localStorage.getItem(WATCHLIST_KEY);

        return data ? JSON.parse(data) : [];

    } catch {

        return [];

    }

};

export const saveWatchlist = (movies) => {

    localStorage.setItem(

        WATCHLIST_KEY,

        JSON.stringify(movies)

    );

};

export const addWatchlist = (movie) => {

    const movies = getWatchlist();

    if (movies.find((m) => m.id === movie.id)) {

        return movies;

    }

    const updated = [movie, ...movies];

    saveWatchlist(updated);

    return updated;

};

export const removeWatchlist = (id) => {

    const updated = getWatchlist().filter(

        (movie) => movie.id !== id

    );

    saveWatchlist(updated);

    return updated;

};

export const isWatchlisted = (id) => {

    return getWatchlist().some(

        (movie) => movie.id === id

    );

};

/* -------------------------------
        recently watched
-------------------------------- */

/* ======================================
        RECENTLY VIEWED
====================================== */

const RECENT_KEY = "movieai_recent";

export const getRecentlyViewed = () => {

    try {

        const data = localStorage.getItem(RECENT_KEY);

        return data ? JSON.parse(data) : [];

    } catch {

        return [];

    }

};

export const saveRecentlyViewed = (movies) => {

    localStorage.setItem(

        RECENT_KEY,

        JSON.stringify(movies)

    );

};

export const addRecentlyViewed = (movie) => {

    let movies = getRecentlyViewed();

    // Remove duplicate

    movies = movies.filter(

        (m) => m.id !== movie.id

    );

    // Add latest on top

    movies.unshift(movie);

    // Keep only last 20

    movies = movies.slice(0, 20);

    saveRecentlyViewed(movies);

    return movies;

};

export const clearRecentlyViewed = () => {

    localStorage.removeItem(RECENT_KEY);

};

/* ======================================
        SEARCH HISTORY
====================================== */

const SEARCH_HISTORY_KEY = "movieai_search_history";

export const getSearchHistory = () => {

    try {

        const data = localStorage.getItem(
            SEARCH_HISTORY_KEY
        );

        return data ? JSON.parse(data) : [];

    } catch {

        return [];

    }

};

export const saveSearchHistory = (history) => {

    localStorage.setItem(

        SEARCH_HISTORY_KEY,

        JSON.stringify(history)

    );

};

export const addSearchHistory = (query) => {

    if (!query.trim()) {

        return getSearchHistory();

    }

    let history = getSearchHistory();

    history = history.filter(

        item =>

        item.toLowerCase() !== query.toLowerCase()

    );

    history.unshift(query);

    history = history.slice(0, 10);

    saveSearchHistory(history);

    return history;

};

export const clearSearchHistory = () => {

    localStorage.removeItem(

        SEARCH_HISTORY_KEY

    );

};