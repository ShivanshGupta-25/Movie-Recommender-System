import { useEffect, useRef, useState } from "react";
import { Search, X, Loader2 } from "lucide-react";

import useDebounce from "../../hooks/useDebounce";
import SearchSuggestion from "./SearchSuggestion";
import { searchMovies } from "../../services/movieApi";

const SearchBar = ({ onSearch, onMovieSelect }) => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const debouncedQuery = useDebounce(query, 400);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // -------------------------
  // Search Suggestions
  // -------------------------
  useEffect(() => {
    const fetchMovies = async () => {
      if (!debouncedQuery.trim()) {
        setMovies([]);
        return;
      }

      try {
        setLoading(true);

        const data = await searchMovies(debouncedQuery);

        setMovies(data || []);

        if (document.activeElement === inputRef.current) {
          setShowSuggestions(true);
        }
      } catch (err) {
        console.error(err);
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
    const handleClickOutside = (e) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
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
  // Submit Search
  // -------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    // Close suggestions
    setShowSuggestions(false);
    setSelectedIndex(-1);

    if (onSearch) {
      onSearch(query);
    }
  };

  // -------------------------
  // Keyboard Navigation
  // -------------------------
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (selectedIndex >= 0) {
        handleMovieClick(movies[selectedIndex]);
      } else {
        // Close suggestions
        setShowSuggestions(false);
        setSelectedIndex(-1);

        if (query.trim() && onSearch) {
          onSearch(query);
        }
      }

      return;
    }

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

      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
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

    if (onSearch) {
      onSearch(movie.title);
    }
  };

  // -------------------------
  // Clear Search
  // -------------------------
  const clearSearch = () => {
    setQuery("");
    setMovies([]);
    setSelectedIndex(-1);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <form
      ref={wrapperRef}
      onSubmit={handleSubmit}
      className="relative w-full max-w-4xl mx-auto"
    >
      <div
        className="
        flex
        items-center
        bg-white
        rounded-2xl
        shadow-2xl
        overflow-hidden
        border
        border-gray-200
        transition-all
        duration-300
        focus-within:ring-4
        focus-within:ring-red-200
        focus-within:border-red-400
      "
      >
        <Search
          size={22}
          className="ml-5 text-gray-400"
        />

        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Search your favourite movie..."
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
            setSelectedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          className="
          flex-1
          px-6
          py-5
          text-lg
          text-gray-900
          placeholder:text-gray-400
          bg-transparent
          outline-none
          caret-red-500
        "
        />

        {loading && (
          <Loader2
            size={20}
            className="animate-spin text-gray-500 mr-4"
          />
        )}

        {!loading && query && (
          <button
            type="button"
            onClick={clearSearch}
            className="
            mr-2
            p-2
            rounded-full
            text-gray-400
            hover:bg-gray-100
            hover:text-red-500
            transition
          "
          >
            <X size={20} />
          </button>
        )}

        <button
          type="submit"
          className="
          group
          flex
          items-center
          gap-2
          px-8
          py-5
          mr-1
          rounded-xl
          bg-gradient-to-r
          from-red-600
          to-red-500
          hover:from-red-700
          hover:to-red-600
          active:scale-95
          transition-all
          duration-300
          shadow-lg
          hover:shadow-red-500/40
          text-white
          font-semibold
        "
        >
          <Search
            size={18}
            className="group-hover:rotate-12 transition-transform"
          />
          Search
        </button>
      </div>

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
                className={
                  selectedIndex === index
                    ? "bg-gray-700"
                    : ""
                }
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
    </form>
  );
};
export default SearchBar;