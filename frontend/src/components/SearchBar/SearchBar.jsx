import { useEffect, useRef, useState } from "react";
import { Search, X, Loader2 } from "lucide-react";

import useDebounce from "../../hooks/useDebounce";
import SearchSuggestion from "./SearchSuggestion";
import { searchMovies } from "../../services/movieApi";

const SearchBar = ({ onMovieSelect }) => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const debouncedQuery = useDebounce(query, 400);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // -------------------------
  // Search Movies
  // -------------------------
  useEffect(() => {
    const fetchMovies = async () => {
      if (!debouncedQuery?.trim()) {
        setMovies([]);
        return;
      }

      try {
        setLoading(true);

        const data = await searchMovies(debouncedQuery);
        console.log(data);

        setMovies(data);
        setShowSuggestions(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedQuery]);

  // -------------------------
  // Click Outside
  // -------------------------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  // -------------------------
  // Keyboard Navigation
  // -------------------------
  const handleKeyDown = (e) => {
    if (!movies.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < movies.length - 1 ? prev + 1 : prev
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : 0
        );
        break;

      case "Enter":
        if (selectedIndex >= 0) {
          handleMovieClick(movies[selectedIndex]);
        }
        break;

      case "Escape":
        setShowSuggestions(false);
        break;

      default:
        break;
    }
  };

  // -------------------------
  // Select Movie
  // -------------------------
  const handleMovieClick = (movie) => {
    setQuery(movie.title || "");
    setShowSuggestions(false);

    if (onMovieSelect) {
      onMovieSelect(movie);
    }
  };

  // -------------------------
  // Clear Search
  // -------------------------
  const clearSearch = () => {
    setQuery("");
    setMovies([]);
    setSelectedIndex(-1);
    inputRef.current.focus();
  };

  return (
    <div
      ref={wrapperRef}
      className="relative w-full max-w-4xl mx-auto"
    >
      {/* Search Box */}

      <div className="flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">

        <Search
          size={22}
          className="ml-5 text-gray-400"
        />

        <input
            ref={inputRef}
            value={query}
            onChange={(e)=>{
                setQuery(e.target.value);
                setShowSuggestions(true);
                setSelectedIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Search any movie..."
            className="flex-1 px-6 py-5 text-lg outline-none"
        />

        {loading && (
          <Loader2
            className="animate-spin text-gray-500 mr-4"
            size={20}
          />
        )}

        {!loading && query && (
          <button
            onClick={clearSearch}
            className="mr-3 text-gray-500 hover:text-red-500"
          >
            <X size={20} />
          </button>
        )}

        <button
          className="
          bg-red-600
          hover:bg-red-700
          transition
          duration-300
          px-8
          py-4
          text-white
          font-semibold
          "
        >
          Search
        </button>
      </div>

      {/* Suggestions */}

      {showSuggestions && query && (
        <div
        className="
        absolute
        left-0
        right-0
        mt-4
        bg-gray-900
        rounded-2xl
        shadow-2xl
        border
        border-gray-700
        overflow-hidden
        max-h-[450px]
        overflow-y-auto
        z-50
        "
        >
          {loading ? (
            <div className="p-8 text-center text-gray-300">
              Searching...
            </div>
          ) : movies.length ? (
            movies.map((movie, index) => (
                <div
                    key={movie.id ?? `${movie.title}-${index}`}
                    className={selectedIndex === index ? "bg-gray-700" : ""}
                >
                    <SearchSuggestion
                    movie={movie}
                    onClick={handleMovieClick}
                    />
                </div>
                ))
          ) : (
            <div className="p-8 text-center text-gray-400">
              No movies found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;