import api from "./api";

// Search movie names
export const searchMovies = async (query) => {
    const response = await api.get("/search", {
        params: { q: query },
    });

    return response.data;
};

// Get recommendations
export const getRecommendations = async (movie) => {
    const response = await api.get("/recommend", {
        params: { movie },
    });

    // Return only the recommendations array
    return response.data.recommendations;
};

// Get complete details of a movie
export const getMovieDetails = async (title) => {
    const response = await api.get(`/movie/${encodeURIComponent(title)}`);
    return response.data;
};

// Home page movies
export const getHomeMovies = async () => {
    const response = await api.get("/home");
    return response.data;
};

export const getPopularMovies = async () => {

    const response = await api.get("/popular");

    return response.data;

};

export const getUpcomingMovies = async () => {

    const response = await api.get("/upcoming");

    return response.data;

};

export const getNowPlayingMovies = async () => {

    const response = await api.get("/now-playing");

    return response.data;

};