import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  Calendar,
  PlayCircle,
  Info,
} from "lucide-react";

const FeaturedMovie = ({ movie }) => {

  if (!movie) return null;

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "N/A";

  return (

    <section className="relative max-w-7xl mx-auto px-6 lg:px-10 mt-16">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: .7 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden"
      >

        {/* Backdrop */}

        <img
          src={
            movie.backdrop ||
            movie.poster
          }
          alt={movie.title}
          className="w-full h-[520px] object-cover"
        />

        {/* Gradient */}

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

        {/* Content */}

        <div className="absolute inset-0 flex items-center">

          <div className="max-w-2xl px-10 lg:px-16">

            <span className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full font-medium mb-6">

              🔥 Featured Movie

            </span>

            <h1 className="text-5xl lg:text-6xl font-black leading-tight">

              {movie.title}

            </h1>

            <div className="flex flex-wrap items-center gap-6 mt-6 text-gray-300">

              <div className="flex items-center gap-2">

                <Star
                  size={18}
                  className="text-yellow-400 fill-yellow-400"
                />

                <span>

                  {movie.rating?.toFixed(1)}

                </span>

              </div>

              <div className="flex items-center gap-2">

                <Calendar size={18} />

                <span>

                  {releaseYear}

                </span>

              </div>

              {

                movie.genres?.length > 0 && (

                  <span>

                    {movie.genres.slice(0,3).join(" • ")}

                  </span>

                )

              }

            </div>

            <p className="mt-8 text-lg text-gray-300 leading-8 line-clamp-4">

              {movie.overview}

            </p>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-10">

              {

                movie.homepage && (

                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 bg-red-600 hover:bg-red-700 transition px-8 py-4 rounded-xl font-semibold"
                  >

                    <PlayCircle size={22} />

                    Official Website

                  </a>

                )

              }

              <Link
                to={`/movie/${encodeURIComponent(movie.title)}`}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 transition px-8 py-4 rounded-xl font-semibold"
              >

                <Info size={20} />

                View Details

              </Link>

            </div>

          </div>

        </div>

      </motion.div>

    </section>

  );

};

export default FeaturedMovie;