// import { useState } from "react";
// import { motion } from "framer-motion";

// import Navbar from "../../components/Navbar/Navbar";
// import Footer from "../../components/Footer/Footer";
// import SearchBar from "../../components/SearchBar/SearchBar";
// import MovieGrid from "../../components/MovieGrid/MovieGrid";

// import useMovies from "../../hooks/useMovies";

// const Home = () => {

//     const {

//         recommendations,

//         topMovies,

//         trendingMovies,

//         popularMovies,

//         upcomingMovies,

//         nowPlayingMovies,

//         loading,

//         error,

//         recommend,

//         clearRecommendations,

//     } = useMovies();

//     const [searchedMovie, setSearchedMovie] = useState("");

//     const handleSearch = async (movie) => {

//         if (!movie) return;

//         setSearchedMovie(movie);

//         await recommend(movie);

//     };

//     const handleReset = () => {

//         setSearchedMovie("");

//         clearRecommendations();

//     };

//     return (

//         <div className="min-h-screen flex flex-col bg-slate-950 text-white">

//             <Navbar />

//             {/* Hero */}

//             <section className="bg-gradient-to-r from-blue-700 via-purple-700 to-fuchsia-700 py-24">

//                 <div className="max-w-5xl mx-auto px-6 text-center">

//                     <motion.h1
//                         initial={{ opacity: 0, y: -30 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: .6 }}
//                         className="text-5xl md:text-6xl font-extrabold"
//                     >
//                         Find Your Next Favorite Movie
//                     </motion.h1>

//                     <motion.p
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: .3 }}
//                         className="mt-6 text-xl text-gray-300"
//                     >
//                         AI Powered Movie Recommendation System
//                     </motion.p>

//                     <div className="mt-12">

//                         <SearchBar
//                             onSearch={handleSearch}
//                         />

//                     </div>

//                 </div>

//             </section>

//             <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">

//                 {/* Loading */}

//                 {loading && (

//                     <div className="text-center text-xl py-16">

//                         Loading...

//                     </div>

//                 )}

//                 {/* Error */}

//                 {error && (

//                     <div className="bg-red-600/20 border border-red-600 rounded-xl p-4 text-center mb-10">

//                         {error}

//                     </div>

//                 )}

//                 {/* Recommendation */}

//                 {

//                     recommendations.length > 0 && (

//                         <motion.section

//                             initial={{ opacity: 0 }}

//                             animate={{ opacity: 1 }}

//                         >

//                             <div className="flex justify-between items-center mb-8">

//                                 <div>

//                                     <h2 className="text-4xl font-bold">

//                                         🎯 Recommendations

//                                     </h2>

//                                     <p className="text-gray-400">

//                                         Based on

//                                         <span className="text-red-500">

//                                             {" "}{searchedMovie}

//                                         </span>

//                                     </p>

//                                 </div>

//                                 <button

//                                     onClick={handleReset}

//                                     className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"

//                                 >

//                                     Back Home

//                                 </button>

//                             </div>

//                             <MovieGrid

//                                 movies={recommendations}

//                             />

//                         </motion.section>

//                     )

//                 }

//                 {/* Home Sections */}

//                 {

//                     recommendations.length === 0 && (

//                         <>

//                             <section className="mt-12">

//                                 <h2 className="text-3xl font-bold mb-8">

//                                     ⭐ Top Rated

//                                 </h2>

//                                 <MovieGrid movies={topMovies} />

//                             </section>

//                             <section className="mt-16">

//                                 <h2 className="text-3xl font-bold mb-8">

//                                     🔥 Trending

//                                 </h2>

//                                 <MovieGrid movies={trendingMovies} />

//                             </section>

//                             <section className="mt-16">

//                                 <h2 className="text-3xl font-bold mb-8">

//                                     🎬 Popular

//                                 </h2>

//                                 <MovieGrid movies={popularMovies} />

//                             </section>

//                             <section className="mt-16">

//                                 <h2 className="text-3xl font-bold mb-8">

//                                     🍿 Now Playing

//                                 </h2>

//                                 <MovieGrid movies={nowPlayingMovies} />

//                             </section>

//                             <section className="mt-16">

//                                 <h2 className="text-3xl font-bold mb-8">

//                                     🚀 Upcoming

//                                 </h2>

//                                 <MovieGrid movies={upcomingMovies} />

//                             </section>

//                         </>

//                     )

//                 }

//             </main>

//             <Footer />

//         </div>

//     );

// };

// export default Home;





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