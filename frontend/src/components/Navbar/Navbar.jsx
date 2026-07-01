import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

import { useFavoritesContext } from "../../Context/FavoritesContext";
import { useWatchlistContext } from "../../Context/WatchlistContext";
import { useRecentlyViewedContext } from "../../Context/RecentlyViewedContext";

import {
  Clapperboard,
  House,
  Flame,
  Heart,
  Bookmark,
  History,
  Search,
  Moon,
  UserCircle2,
  Menu,
} from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { favorites } = useFavoritesContext();
  const { watchlist } = useWatchlistContext();
  const { recentMovies } = useRecentlyViewedContext();

  const navItems = [
    {
      title: "Home",
      icon: House,
      path: "/",
    },
    {
      title: "Trending",
      icon: Flame,
      path: "/",
    },
    {
      title: "Favorites",
      icon: Heart,
      path: "/favorites",
    },
    {
      title: "Watchlist",
      icon: Bookmark,
      path: "/watchlist",
    },
    {
      title: "Recent",
      icon: History,
      path: "/recently-viewed",
    },

    {
      title: "Search History",
      icon: Search,
      path: "/search-history",
    }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 h-20">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-lg">
            <Clapperboard size={28} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              Movie<span className="text-red-500">AI</span>
            </h1>

            <p className="text-xs text-slate-400">
              Recommendation System
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 transition-all duration-300 ${
                    isActive
                      ? "text-red-500"
                      : "text-slate-300 hover:text-white"
                  }`
                }
              >
                <div className="relative">

                  <Icon size={20} />

                  {/* Favorites Badge */}
                  {item.title === "Favorites" &&
                    favorites.length > 0 && (
                      <span
                        className="
                          absolute
                          -top-2
                          -right-3
                          min-w-[18px]
                          h-[18px]
                          px-1
                          rounded-full
                          bg-red-600
                          text-white
                          text-[10px]
                          font-bold
                          flex
                          items-center
                          justify-center
                        "
                      >
                        {favorites.length}
                      </span>
                    )}

                  {/* Watchlist Badge */}
                  {item.title === "Watchlist" &&
                    watchlist.length > 0 && (
                      <span
                        className="
                          absolute
                          -top-2
                          -right-3
                          min-w-[18px]
                          h-[18px]
                          px-1
                          rounded-full
                          bg-blue-600
                          text-white
                          text-[10px]
                          font-bold
                          flex
                          items-center
                          justify-center
                        "
                      >
                        {watchlist.length}
                      </span>
                    )}

                    {/* Recent Badge */}
                    {item.title === "Recent" &&
                    recentMovies.length > 0 && (
                        <span
                        className="
                            absolute
                            -top-2
                            -right-3
                            min-w-[18px]
                            h-[18px]
                            px-1
                            rounded-full
                            bg-purple-600
                            text-white
                            text-[10px]
                            font-bold
                            flex
                            items-center
                            justify-center
                        "
                        >
                        {recentMovies.length}
                        </span>
                    )}

                </div>

                {item.title}
              </NavLink>
            );
          })}

        </nav>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-4">

          <button className="w-11 h-11 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition">
            <Search size={20} />
          </button>

          <button className="w-11 h-11 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition">
            <Moon size={20} />
          </button>

          <button className="w-11 h-11 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
            <UserCircle2 size={24} />
          </button>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white"
        >
          <Menu />
        </button>

      </div>

      {/* Mobile Menu */}
      {mobileOpen && (

        <div className="lg:hidden bg-slate-900 border-t border-slate-800">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-6 py-5 hover:bg-slate-800"
              >
                <div className="flex items-center gap-4">
                  <Icon size={20} />
                  {item.title}
                </div>

                {/* Favorites Badge */}
                {item.title === "Favorites" &&
                  favorites.length > 0 && (
                    <span
                      className="
                        px-2
                        py-1
                        rounded-full
                        bg-red-600
                        text-white
                        text-xs
                        font-bold
                      "
                    >
                      {favorites.length}
                    </span>
                  )}

                {/* Watchlist Badge */}
                {item.title === "Watchlist" &&
                  watchlist.length > 0 && (
                    <span
                      className="
                        px-2
                        py-1
                        rounded-full
                        bg-blue-600
                        text-white
                        text-xs
                        font-bold
                      "
                    >
                      {watchlist.length}
                    </span>
                )}

                {/* Recent Badge */}
                {item.title === "Recent" &&
                recentMovies.length > 0 && (
                    <span
                    className="
                        px-2
                        py-1
                        rounded-full
                        bg-purple-600
                        text-white
                        text-xs
                        font-bold
                    "
                    >
                    {recentMovies.length}
                    </span>
                )}

              </NavLink>
            );
          })}

        </div>

      )}

    </header>
  );
};

export default Navbar;