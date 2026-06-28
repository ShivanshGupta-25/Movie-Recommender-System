import { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieGrid from "../../components/MovieGrid/MovieGrid";

const Home = () => {
  // Dummy movie data (Replace with API response later)
  const [movies] = useState([
    {
        id: 1,
        title: "Iron Man",
        poster_path: "/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
        vote_average: 7.9,
        release_date: "2008-05-02",
        similarity_score: 0.94,
        genres: ["Action", "Adventure", "Sci-Fi"],
    },
    {
        id: 2,
        title: "The Avengers",
        poster_path: "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
        vote_average: 8.1,
        release_date: "2012-05-04",
        similarity_score: 0.91,
        genres: ["Action", "Adventure"],
    },
    {
        id: 3,
        title: "Interstellar",
        poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        vote_average: 8.7,
        release_date: "2014-11-07",
        similarity_score: 0.89,
        genres: ["Sci-Fi", "Drama"],
    },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* Navbar */}
      <nav className="bg-gray-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            🎬 Movie Recommender
          </h1>

          <ul className="flex gap-8 font-medium">
            <li className="cursor-pointer hover:text-blue-400">Home</li>
            <li className="cursor-pointer hover:text-blue-400">Trending</li>
            <li className="cursor-pointer hover:text-blue-400">About</li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-5xl font-bold mb-6">
            Find Your Next Favorite Movie
          </h2>

          <p className="text-lg text-gray-200 mb-10">
            Search for a movie and get AI-powered recommendations instantly.
          </p>

          <SearchBar
          onMovieSelect={(movie) => {
            console.log(movie);}
            } />

        </div>
      </section>

      {/* Recommended Movies */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">

        <h2 className="text-3xl font-bold mb-8">
          Recommended Movies
        </h2>

        <MovieGrid movies={movies} />

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 mt-auto">
        <div className="text-center">
          © {new Date().getFullYear()} Movie Recommender System.
          All Rights Reserved.
        </div>
      </footer>

    </div>
  );
};

export default Home;