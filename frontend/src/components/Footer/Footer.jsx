import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaHeart,
  FaReact,
  FaPython,
} from "react-icons/fa";
import {
  SiFastapi,
  SiScikitlearn,
  SiTailwindcss,
  SiThemoviedatabase,
} from "react-icons/si";
import { Clapperboard } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-20">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-4 md:grid-cols-2 gap-12">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center shadow-lg">
              <Clapperboard size={24} className="text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                Movie<span className="text-red-500">AI</span>
              </h2>

              <p className="text-xs text-gray-400">
                Movie Recommendation System
              </p>
            </div>
          </div>

          <p className="text-gray-400 leading-7 text-sm">
            Discover movies you'll love with an AI-powered recommendation
            engine built using Machine Learning, FastAPI, React and TMDB.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-5">
            Explore
          </h3>

          <div className="flex flex-col gap-3 text-gray-400">

            <Link
              to="/"
              className="hover:text-red-500 transition"
            >
              Home
            </Link>

            <Link
              to="/favorites"
              className="hover:text-red-500 transition"
            >
              Favorites
            </Link>

            <Link
              to="/watchlist"
              className="hover:text-red-500 transition"
            >
              Watchlist
            </Link>

            <Link to="/recently-viewed" className="hover:text-red-500 transition">
            Recently Viewed
            </Link>
            {/* <Link
              to="/history"
              className="hover:text-red-500 transition"
            >
              Search History
            </Link> */}

          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-5">
            Built With
          </h3>

          <div className="grid grid-cols-2 gap-4 text-gray-300">

            <div className="flex items-center gap-2">
              <FaReact className="text-cyan-400" />
              React
            </div>

            <div className="flex items-center gap-2">
              <SiTailwindcss className="text-sky-400" />
              Tailwind
            </div>

            <div className="flex items-center gap-2">
              <FaPython className="text-yellow-400" />
              Python
            </div>

            <div className="flex items-center gap-2">
              <SiFastapi className="text-green-400" />
              FastAPI
            </div>

            <div className="flex items-center gap-2">
              <SiScikitlearn className="text-orange-400" />
              Scikit-Learn
            </div>

            <div className="flex items-center gap-2">
              <SiThemoviedatabase className="text-blue-400" />
              TMDB API
            </div>

          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-5">
            Connect
          </h3>

          <div className="flex gap-4 mb-6">

            <a
              href="https://github.com/ShivanshGupta-25"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 rounded-full bg-slate-800 hover:bg-red-500 transition flex items-center justify-center"
            >
              <FaGithub size={20} />
            </a>

            <a
              href="https://www.linkedin.com/in/shivansh-gupta-1555172b6/"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 rounded-full bg-slate-800 hover:bg-blue-600 transition flex items-center justify-center"
            >
              <FaLinkedin size={20} />
            </a>

            {/* <a
              href="shivanshgupta2505@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 rounded-full bg-slate-800 hover:bg-pink-500 transition flex items-center justify-center"
            >
              <FaInstagram size={20} />
            </a> */}

          </div>

          <p className="text-sm text-gray-500 leading-7">
            Built for movie lovers who enjoy discovering hidden gems and
            blockbuster recommendations powered by AI.
          </p>

        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-400 text-sm text-center md:text-left">

            © {year} MovieAI. All Rights Reserved.

          </p>

          <p className="text-gray-400 text-sm flex items-center gap-2">

            Made with

            <FaHeart className="text-red-500 animate-pulse" />

            by <span className="text-white font-semibold">Shivansh Gupta</span>

          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;