import { useEffect, useState } from "react";
import {
    searchMovies,
    getRecommendations,
    getHomeMovies,
} from "../services/movieApi";

const useMovies = () => {

    // Home Movies
    const [topMovies, setTopMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);

    // Recommendation Results
    const [recommendations, setRecommendations] = useState([]);

    // Currently Selected Movie
    const [selectedMovie, setSelectedMovie] = useState(null);

    const [popularMovies,setPopularMovies]=useState([]);

    const [upcomingMovies,setUpcomingMovies]=useState([]);

    const [nowPlayingMovies,setNowPlayingMovies]=useState([]);

    // UI States
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ----------------------------------
    // Load Home Movies
    // ----------------------------------

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

            setPopularMovies(data.popular || []);

            setUpcomingMovies(data.upcoming || []);

            setNowPlayingMovies(data.now_playing || []);

        }

        catch (err) {

            console.error(err);

            setError("Failed to load home movies.");

        }

        finally {

            setLoading(false);

        }

    };

    // ----------------------------------
    // Search Suggestions
    // ----------------------------------

    const search = async (query) => {

        try {

            const data = await searchMovies(query);

            return data;

        }

        catch (err) {

            console.error(err);

            return [];

        }

    };

    // ----------------------------------
    // Recommendation
    // ----------------------------------

    const recommend = async (movie) => {

        try {

            setLoading(true);

            setError("");

            setSelectedMovie(movie);

            const data = await getRecommendations(movie);

            setRecommendations(data || []);

        }

        catch (err) {

            console.error(err);

            setError("Recommendation failed.");

            setRecommendations([]);

        }

        finally {

            setLoading(false);

        }

    };

    // ----------------------------------
    // Clear Recommendation
    // ----------------------------------

    const clearRecommendations = () => {

        setRecommendations([]);

        setSelectedMovie(null);

        setError("");

    };

    // ----------------------------------
    // Return
    // ----------------------------------

    return {

        recommendations,

        topMovies,

        trendingMovies,

        selectedMovie,

        loading,

        error,

        popularMovies,

        upcomingMovies,

        nowPlayingMovies,

        search,

        recommend,

        clearRecommendations,

    };

};

export default useMovies;