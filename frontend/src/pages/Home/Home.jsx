import { useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import Hero from "../../components/Hero/Hero";
import FeaturedMovie from "../../components/FeaturedMovie/FeaturedMovie";
import MovieSection from "../../components/MovieSection/MovieSection";

import Loader from "../../components/Loader/Loader";
import ErrorState from "../../components/ErrorState/ErrorState";
import EmptyState from "../../components/EmptyState/EmptyState";
import { useRecentlyViewedContext } from "../../Context/RecentlyViewedContext";

import useMovies from "../../hooks/useMovies";

const Home = () => {

    const {

        recommendations,

        topMovies,

        trendingMovies,

        popularMovies,

        upcomingMovies,

        nowPlayingMovies,

        loading,

        error,

        recommend,

        clearRecommendations,

    } = useMovies();

    const [searchedMovie, setSearchedMovie] = useState("");

    const { recentMovies } = useRecentlyViewedContext();

    const handleSearch = async (movie) => {

        if (!movie) return;

        setSearchedMovie(movie);

        await recommend(movie);

        window.scrollTo({
            top: 700,
            behavior: "smooth",
        });

    };

    const handleReset = () => {

        setSearchedMovie("");

        clearRecommendations();

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };

    return (

        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            {/* Hero */}

            <Hero

                onSearch={handleSearch}

            />

            {/* Featured */}

            {

                trendingMovies.length > 0 && (

                    <FeaturedMovie

                        movie={trendingMovies[0]}

                    />

                )

            }

            <main className="max-w-[1600px] mx-auto px-6 lg:px-10 py-16">

                {/* Loading */}

                {

                    loading && recommendations.length === 0 && (

                        <Loader />

                    )

                }

                {/* Error */}

                {

                    error && (

                        <ErrorState

                            message={error}

                        />

                    )

                }

                {/* Recommendations */}

                {

                    recommendations.length > 0 && (

                        <motion.div

                            initial={{

                                opacity: 0,

                                y: 20,

                            }}

                            animate={{

                                opacity: 1,

                                y: 0,

                            }}

                        >

                            <div className="flex items-center justify-between mb-8">

                                <div>

                                    <h2 className="text-4xl font-bold">

                                        🎯 AI Recommendations

                                    </h2>

                                    <p className="text-slate-400 mt-2">

                                        Based on

                                        <span className="text-red-500 font-semibold">

                                            {" "}

                                            {searchedMovie}

                                        </span>

                                    </p>

                                </div>

                                <button

                                    onClick={handleReset}

                                    className="
                                    px-6
                                    py-3
                                    rounded-xl
                                    bg-red-600
                                    hover:bg-red-700
                                    transition
                                    "

                                >

                                    Back to Home

                                </button>

                            </div>

                            <MovieSection

                                title=""

                                movies={recommendations}

                            />

                        </motion.div>

                    )

                }

                {/* Default Homepage */}

                {

                    recommendations.length === 0 && !loading && (

                        <>

                            {/* Continue Watching */}

                            {
                                recentMovies.length > 0 && (

                                    <MovieSection
                                        title="🕘 Continue Watching"
                                        subtitle="Movies you recently viewed"
                                        movies={recentMovies}
                                        isRecentlyViewed
                                    />

                                )
                            }

                            <MovieSection

                                title="⭐ Top Rated"

                                subtitle="Highest rated movies of all time"

                                movies={topMovies}

                            />

                            <MovieSection

                                title="🔥 Trending"

                                subtitle="Most talked about this week"

                                movies={trendingMovies}

                            />

                            <MovieSection

                                title="🎬 Popular"

                                subtitle="Popular across TMDB"

                                movies={popularMovies}

                            />

                            <MovieSection

                                title="🍿 Now Playing"

                                subtitle="Currently in theatres"

                                movies={nowPlayingMovies}

                            />

                            <MovieSection

                                title="🚀 Coming Soon"

                                subtitle="Upcoming blockbuster releases"

                                movies={upcomingMovies}

                            />

                        </>

                    )

                }

                {/* Empty */}

                {

                    !loading &&

                    !error &&

                    recommendations.length === 0 &&

                    topMovies.length === 0 && (

                        <EmptyState

                            title="No Movies Found"

                            description="Try searching another movie."

                        />

                    )

                }

            </main>

            <Footer />

        </div>

    );

};

export default Home;