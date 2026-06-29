import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieSection from "../../components/MovieSection/MovieSection";

import { useFavoritesContext } from "../../Context/FavoritesContext";

const Favorites = () => {

    const {

        favorites,

    } = useFavoritesContext();

    return (

        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-32">

                <MovieSection

                    title="❤️ Favorite Movies"

                    subtitle="Your saved collection"

                    movies={favorites}

                />

            </main>

            <Footer />

        </div>

    );

};

export default Favorites;