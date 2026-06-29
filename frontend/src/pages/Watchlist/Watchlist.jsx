import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieSection from "../../components/MovieSection/MovieSection";

import { useWatchlistContext } from "../../Context/WatchlistContext";

const Watchlist = () => {

    const {

        watchlist,

    } = useWatchlistContext();

    return (

        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-32">

                <MovieSection

                    title="📺 My Watchlist"

                    subtitle="Movies saved to watch later"

                    movies={watchlist}

                />

            </main>

            <Footer />

        </div>

    );

};

export default Watchlist;