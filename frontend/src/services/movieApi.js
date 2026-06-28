import api from "./api";

export const searchMovies = async (query) => {
    const response = await api.get("/search", {
        params: { q: query },
    });

    return response.data;
};

export const getRecommendations = async (movie) => {
    const response = await api.get("/recommend", {
        params: { movie },
    });

    return response.data;
};

export const getMovieDetails = async (title) => {
    const response = await api.get(`/movie/${title}`);

    return response.data;
};