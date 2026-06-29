import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieSection from "../../components/MovieSection/MovieSection";

import { useRecentlyViewedContext } from "../../Context/RecentlyViewedContext";

const RecentlyViewed = () => {

    const {

        recentMovies,

        clearHistory,

    } = useRecentlyViewedContext();

    return (

        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-32">

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-4xl font-bold">

                        👁 Recently Viewed

                    </h1>

                    {

                        recentMovies.length > 0 && (

                            <button

                                onClick={clearHistory}

                                className="bg-red-600 px-5 py-2 rounded-lg"

                            >

                                Clear History

                            </button>

                        )

                    }

                </div>

                <MovieSection

                    title=""

                    movies={recentMovies}

                />

            </main>

            <Footer />

        </div>

    );

};

export default RecentlyViewed;