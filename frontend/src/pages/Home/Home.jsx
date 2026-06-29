// import { useState } from "react";
// import { motion } from "framer-motion";

// import Navbar from "../../components/Navbar/Navbar";
// import Footer from "../../components/Footer/Footer";
// import SearchBar from "../../components/SearchBar/SearchBar";
// import MovieGrid from "../../components/MovieGrid/MovieGrid";

// import useMovies from "../../hooks/useMovies";

// const Home = () => {
//   const {
//     recommendations,
//     topMovies,
//     trendingMovies,
//     loading,
//     error,
//     recommend,
//     clearRecommendations, // We'll add this in useMovies
//   } = useMovies();

//   const [searchedMovie, setSearchedMovie] = useState("");

//   // ---------------------------
//   // Search Handler
//   // ---------------------------
//   const handleSearch = async (movie) => {
//     if (!movie) return;

//     setSearchedMovie(movie);

//     await recommend(movie);
//   };

//   // ---------------------------
//   // Reset Home
//   // ---------------------------
//   const handleReset = () => {
//     setSearchedMovie("");

//     if (clearRecommendations) {
//       clearRecommendations();
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-slate-950 text-white">

//       {/* ---------------- Navbar ---------------- */}
//       <Navbar />

//       {/* ---------------- Hero ---------------- */}
//       <section className="bg-gradient-to-r from-blue-700 via-purple-700 to-fuchsia-700 py-24">

//         <div className="max-w-5xl mx-auto px-6 text-center">

//           <motion.h1
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: .6 }}
//             className="text-5xl md:text-6xl font-extrabold"
//           >
//             Find Your Next Favorite Movie
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: .3 }}
//             className="mt-6 text-xl text-gray-200"
//           >
//             Search for any movie and receive AI-powered recommendations
//             instantly.
//           </motion.p>

//           <div className="mt-12">
//             <SearchBar onSearch={handleSearch} />
//           </div>

//         </div>

//       </section>

//       {/* ---------------- Main ---------------- */}

//       <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">

//         {/* Loading */}

//         {loading && (

//           <div className="text-center py-16 text-xl">

//             Loading recommendations...

//           </div>

//         )}

//         {/* Error */}

//         {error && (

//           <div className="bg-red-600/20 border border-red-500 rounded-xl p-5 text-center text-red-300">

//             {error}

//           </div>

//         )}

//         {/* Recommendations */}

//         {!loading && recommendations.length > 0 && (

//           <motion.section

//             initial={{ opacity: 0, y: 30 }}

//             animate={{ opacity: 1, y: 0 }}

//             transition={{ duration: .5 }}

//           >

//             <div className="flex justify-between items-center mb-8">

//               <div>

//                 <h2 className="text-4xl font-bold">

//                   🎯 Recommendations

//                 </h2>

//                 <p className="text-gray-400 mt-2">

//                   Based on "

//                   <span className="text-red-400 font-semibold">

//                     {searchedMovie}

//                   </span>

//                   "

//                 </p>

//               </div>

//               <button

//                 onClick={handleReset}

//                 className="

//                 px-5

//                 py-2

//                 rounded-lg

//                 bg-red-600

//                 hover:bg-red-700

//                 transition

//                 "

//               >

//                 Back to Home

//               </button>

//             </div>

//             <MovieGrid movies={recommendations} />

//           </motion.section>

//         )}

//         {/* Empty State */}

//         {!loading &&

//           recommendations.length === 0 &&

//           !searchedMovie && (

//             <div className="text-center py-12">

//               <div className="text-6xl mb-4">

//                 🎬

//               </div>

//               <h2 className="text-2xl font-semibold">

//                 Search your favourite movie

//               </h2>

//               <p className="text-gray-400 mt-3">

//                 Our AI will recommend similar movies just for you.

//               </p>

//             </div>

//           )}

//         {/* Top Rated */}

//         {!loading && recommendations.length === 0 && (

//           <section className="mt-10">

//             <h2 className="text-3xl font-bold mb-8">

//               ⭐ Top Rated Movies

//             </h2>

//             <MovieGrid movies={topMovies} />

//           </section>

//         )}

//         {/* Trending */}

//         <section className="mt-16">

//           <h2 className="text-3xl font-bold mb-8">

//             🔥 Trending Movies

//           </h2>

//           <MovieGrid movies={trendingMovies} />

//         </section>

//       </main>

//       {/* Footer */}

//       <Footer />

//     </div>
//   );
// };

// export default Home;



import { useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieGrid from "../../components/MovieGrid/MovieGrid";

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

    };

    const handleReset = () => {

        setSearchedMovie("");

        clearRecommendations();

    };

    return (

        <div className="min-h-screen flex flex-col bg-slate-950 text-white">

            <Navbar />

            {/* Hero */}

            <section className="bg-gradient-to-r from-blue-700 via-purple-700 to-fuchsia-700 py-24">

                <div className="max-w-5xl mx-auto px-6 text-center">

                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .6 }}
                        className="text-5xl md:text-6xl font-extrabold"
                    >
                        Find Your Next Favorite Movie
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: .3 }}
                        className="mt-6 text-xl text-gray-300"
                    >
                        AI Powered Movie Recommendation System
                    </motion.p>

                    <div className="mt-12">

                        <SearchBar
                            onSearch={handleSearch}
                        />

                    </div>

                </div>

            </section>

            <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">

                {/* Loading */}

                {loading && (

                    <div className="text-center text-xl py-16">

                        Loading...

                    </div>

                )}

                {/* Error */}

                {error && (

                    <div className="bg-red-600/20 border border-red-600 rounded-xl p-4 text-center mb-10">

                        {error}

                    </div>

                )}

                {/* Recommendation */}

                {

                    recommendations.length > 0 && (

                        <motion.section

                            initial={{ opacity: 0 }}

                            animate={{ opacity: 1 }}

                        >

                            <div className="flex justify-between items-center mb-8">

                                <div>

                                    <h2 className="text-4xl font-bold">

                                        🎯 Recommendations

                                    </h2>

                                    <p className="text-gray-400">

                                        Based on

                                        <span className="text-red-500">

                                            {" "}{searchedMovie}

                                        </span>

                                    </p>

                                </div>

                                <button

                                    onClick={handleReset}

                                    className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"

                                >

                                    Back Home

                                </button>

                            </div>

                            <MovieGrid

                                movies={recommendations}

                            />

                        </motion.section>

                    )

                }

                {/* Home Sections */}

                {

                    recommendations.length === 0 && (

                        <>

                            <section className="mt-12">

                                <h2 className="text-3xl font-bold mb-8">

                                    ⭐ Top Rated

                                </h2>

                                <MovieGrid movies={topMovies} />

                            </section>

                            <section className="mt-16">

                                <h2 className="text-3xl font-bold mb-8">

                                    🔥 Trending

                                </h2>

                                <MovieGrid movies={trendingMovies} />

                            </section>

                            <section className="mt-16">

                                <h2 className="text-3xl font-bold mb-8">

                                    🎬 Popular

                                </h2>

                                <MovieGrid movies={popularMovies} />

                            </section>

                            <section className="mt-16">

                                <h2 className="text-3xl font-bold mb-8">

                                    🍿 Now Playing

                                </h2>

                                <MovieGrid movies={nowPlayingMovies} />

                            </section>

                            <section className="mt-16">

                                <h2 className="text-3xl font-bold mb-8">

                                    🚀 Upcoming

                                </h2>

                                <MovieGrid movies={upcomingMovies} />

                            </section>

                        </>

                    )

                }

            </main>

            <Footer />

        </div>

    );

};

export default Home;