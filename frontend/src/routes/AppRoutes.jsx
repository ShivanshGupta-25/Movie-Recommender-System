import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import MovieDetails from "../pages/MovieDetails/MovieDetails";
import Favorites from "../pages/Favorites/Favorite";
import Watchlist from "../pages/Watchlist/Watchlist";
import RecentlyViewed from "../pages/RecentlyViewed/RecentlyViewed";
import SearchHistory from "../pages/SearchHistory/SearchHistory";
import NotFound from "../pages/NotFound/NotFound";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/movie/:title"
                    element={<MovieDetails />}
                />

                <Route path="/favorites" element={<Favorites />} />

                <Route path="/watchlist" element={<Watchlist />} />

                <Route path="/recently-viewed" element={<RecentlyViewed />} />

                <Route path="/search-history" element={<SearchHistory />} />

                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;