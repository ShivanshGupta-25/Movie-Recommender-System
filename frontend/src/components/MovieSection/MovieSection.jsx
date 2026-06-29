import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import MovieCarousel from "../MovieCarousel/MovieCarousel";

const MovieSection = ({
  title,
  subtitle,
  movies = [],
  loading = false,
  viewAllLink = null,
}) => {

  if (!loading && movies.length === 0) return null;

  return (

    <motion.section

      initial={{ opacity: 0, y: 40 }}

      whileInView={{ opacity: 1, y: 0 }}

      viewport={{ once: true }}

      transition={{ duration: 0.5 }}

      className="mb-16"

    >

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-3xl md:text-4xl font-bold text-white">

            {title}

          </h2>

          {

            subtitle && (

              <p className="text-slate-400 mt-2">

                {subtitle}

              </p>

            )

          }

        </div>

        {

          viewAllLink && (

            <Link

              to={viewAllLink}

              className="hidden md:flex items-center gap-2 text-red-500 hover:text-red-400 font-semibold transition"

            >

              View All

              <ChevronRight size={18} />

            </Link>

          )

        }

      </div>

      {/* Movies */}

      <MovieCarousel

        movies={movies}

        loading={loading}

      />

    </motion.section>

  );

};

export default MovieSection;