import { useEffect, useState } from "react";
import {
    searchMovies,
    getRecommendations,
    getHomeMovies,
} from "../services/movieApi";

const useMovies = () => {

    // Recommended movies
    const [recommendations, setRecommendations] = useState([]);

    // Top rated movies
    const [topMovies, setTopMovies] = useState([]);

    // Trending movies
    const [trendingMovies, setTrendingMovies] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Load Top Rated & Trending when page opens
    useEffect(() => {
        loadHomeMovies();
    }, []);

    const loadHomeMovies = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getHomeMovies();

            setTopMovies(data.top || []);
            setTrendingMovies(data.trending || []);

        } catch (err) {
            console.error(err);
            setError("Failed to load home movies.");
        } finally {
            setLoading(false);
        }
    };
    // Search suggestions
    const search = async (query) => {

        try {

            setLoading(true);

            const data = await searchMovies(query);

            return data;

        } catch (err) {

            console.error(err);
            setError("Search failed.");

            return [];

        } finally {

            setLoading(false);

        }

    };

    // Recommendations
    const recommend = async (movie) => {

        try {

            setLoading(true);

            const data = await getRecommendations(movie);

            // data is already an array
            setRecommendations(data);

            setError("");

        } catch (err) {

            console.error(err);

            setError("Recommendation failed.");

        } finally {

            setLoading(false);

        }

    };

    return {

        recommendations,

        topMovies,

        trendingMovies,

        loading,

        error,

        search,

        recommend,

    };

};

export default useMovies;