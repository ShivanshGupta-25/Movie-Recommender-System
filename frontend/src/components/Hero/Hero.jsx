import { motion } from "framer-motion";
import {
  Sparkles,
  Film,
  Star,
  TrendingUp,
} from "lucide-react";

import SearchBar from "../SearchBar/SearchBar";

const Hero = ({ onSearch }) => {
  return (
    <section className="relative overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0">

        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1800"
          alt="Cinema"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/70" />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/60" />

      </div>

      {/* Content */}

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-28">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .2 }}
              className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-5 py-2 text-red-300 mb-8"
            >
              <Sparkles size={18} />

              AI Powered Recommendation Engine
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">

              Discover

              <span className="block text-red-500">

                Your Next

              </span>

              Favorite Movie

            </h1>

            <p className="mt-8 text-lg md:text-xl text-slate-300 max-w-xl leading-9">

              Explore thousands of movies powered by our
              intelligent TF-IDF recommendation engine.
              Search your favorite movie and instantly
              discover similar titles you'll love.

            </p>

            {/* Search */}

            <div className="mt-10">

              <SearchBar
                onSearch={onSearch}
              />

            </div>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-8 mt-14">

              <div>

                <h2 className="text-4xl font-bold text-red-500">

                  5000+

                </h2>

                <p className="text-slate-400 mt-2">

                  Movies

                </p>

              </div>

              <div>

                <h2 className="text-4xl font-bold text-red-500">

                  AI

                </h2>

                <p className="text-slate-400 mt-2">

                  Recommendations

                </p>

              </div>

              <div>

                <h2 className="text-4xl font-bold text-red-500">

                  TMDB

                </h2>

                <p className="text-slate-400 mt-2">

                  Live Data

                </p>

              </div>

            </div>

          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
            className="hidden lg:flex justify-center"
          >

            <div className="relative w-[500px] h-[550px]">

              {/* Card 1 */}

              <motion.div
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                }}
                className="absolute left-0 top-20 bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-700 shadow-2xl w-64"
              >

                <Film
                  size={42}
                  className="text-red-500"
                />

                <h3 className="mt-5 text-2xl font-bold">

                  Smart Search

                </h3>

                <p className="mt-3 text-slate-400">

                  Intelligent movie search with
                  autocomplete suggestions.

                </p>

              </motion.div>

              {/* Card 2 */}

              <motion.div
                animate={{
                  y: [0, 15, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                }}
                className="absolute right-0 top-0 bg-red-600 rounded-3xl p-8 shadow-2xl w-64"
              >

                <Star
                  size={42}
                />

                <h3 className="mt-5 text-2xl font-bold">

                  AI Recommendation

                </h3>

                <p className="mt-3 text-red-100">

                  TF-IDF based recommendation
                  engine for similar movies.

                </p>

              </motion.div>

              {/* Card 3 */}

              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                }}
                className="absolute right-12 bottom-0 bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border border-slate-700 shadow-xl w-72"
              >

                <TrendingUp
                  size={42}
                  className="text-green-400"
                />

                <h3 className="mt-5 text-2xl font-bold">

                  Trending Movies

                </h3>

                <p className="mt-3 text-slate-400">

                  Discover the latest trending,
                  popular and top-rated movies.

                </p>

              </motion.div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
};

export default Hero;