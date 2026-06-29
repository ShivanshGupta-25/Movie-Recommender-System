import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import WatchlistButton from "../WatchlistButton/WatchlistButton";
import {
  Star,
  Calendar,
  Heart,
  BookmarkPlus,
  Info,
} from "lucide-react";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

const PLACEHOLDER =
  "https://dummyimage.com/500x750/111827/ffffff&text=No+Poster";

const MovieCard = ({
  movie,
  isRecentlyViewed = false,
 }) => {

  const poster =
    movie.poster ||
    movie.poster_url ||
    PLACEHOLDER;

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "N/A";

  return (

    <motion.div

      whileHover={{
        y: -10,
        scale: 1.03,
      }}

      transition={{
        duration: .3,
      }}

      className="group relative"

    >

      <Link
        to={`/movie/${encodeURIComponent(movie.title)}`}
      >

        {/* Poster */}

        <div className="relative overflow-hidden rounded-2xl">

          <img
            src={poster}
            alt={movie.title}
            className="
            h-[340px]
            w-full
            object-cover
            transition
            duration-500
            group-hover:scale-110
            "
          />

          {/* Overlay */}

          <div
            className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-black/40
            to-transparent
            opacity-0
            group-hover:opacity-100
            transition
            duration-500
            "
          />

          {/* Rating */}

          <div
            className="
            absolute
            top-3
            right-3
            bg-yellow-500
            text-black
            font-bold
            text-sm
            px-3
            py-1
            rounded-full
            flex
            items-center
            gap-1
            "
          >

            <Star
              size={14}
              fill="currentColor"
            />

            {movie.rating
              ? movie.rating.toFixed(1)
              : "N/A"}

          </div>

          {/* Favorite */}

          <div
            className="
              absolute
              top-3
              left-3
              opacity-0
              group-hover:opacity-100
              transition
              z-20
            "
          >
            <FavoriteButton movie={movie} />
          </div>

          {/* Watchlist */}

          <div
            className="
              absolute
              top-16
              left-3
              opacity-0
              group-hover:opacity-100
              transition
              z-20
            "
          >
            <WatchlistButton movie={movie} />
          </div>

          {/* Bottom Info */}

          <div
            className="
            absolute
            bottom-0
            left-0
            right-0
            p-5
            translate-y-full
            group-hover:translate-y-0
            transition
            duration-500
            "
          >

            <div className="flex items-center gap-2 text-sm text-gray-300">

              <Calendar size={14} />

              {releaseYear}

            </div>

            <h3
              className="
              text-white
              text-lg
              font-bold
              mt-2
              line-clamp-1
              "
            >

              {movie.title}

            </h3>

            {

              movie.genres?.length > 0 && (

                <div className="flex flex-wrap gap-2 mt-3">

                  {

                    movie.genres
                      .slice(0, 2)
                      .map((genre) => (

                        <span
                          key={genre}
                          className="
                          bg-red-600/80
                          px-2
                          py-1
                          rounded-full
                          text-xs
                          "
                        >

                          {genre}

                        </span>

                      ))

                  }

                </div>

              )

            }

            {

              movie.score && (

                <div
                  className="
                  mt-3
                  text-green-400
                  font-semibold
                  "
                >

                  Match:

                  {" "}

                  {(movie.score * 100).toFixed(0)}%

                </div>

              )

            }

            <button
              className="
              mt-4
              w-full
              bg-red-600
              hover:bg-red-700
              transition
              rounded-xl
              py-3
              flex
              items-center
              justify-center
              gap-2
              font-semibold
              "
            >
              {isRecentlyViewed ? (
                <>
                  ▶ Continue Watching
                </>
              ) : (
                <>
                  <Info size={18} />
                  View Details
                </>
              )}
            </button>

          </div>

        </div>

      </Link>

    </motion.div>

  );

};

export default MovieCard;