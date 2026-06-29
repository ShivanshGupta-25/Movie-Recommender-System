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
    const response = await api.get(`/movie/${title}`);
    return response.data;
};

export const getHomeMovies = async () => {
    const response = await api.get("/home");
    return response.data;
};