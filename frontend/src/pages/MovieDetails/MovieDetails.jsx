import { Link, useParams } from "react-router-dom";
import useMovieDetails from "../../hooks/useMovieDetails";

const MovieDetails = () => {
  const { title } = useParams();

  const { movie, loading, error } = useMovieDetails(title);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Backdrop */}
      {movie.backdrop && (
        <div
          className="h-[420px] bg-cover bg-center"
          style={{
            backgroundImage: `url(${movie.backdrop})`,
          }}
        />
      )}

      <div className="max-w-6xl mx-auto px-6 py-10">
        <Link
          to="/"
          className="inline-block mb-8 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
        >
          ← Back
        </Link>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Poster */}
          <div>
            <img
              src={movie.poster}
              alt={movie.title}
              className="rounded-xl shadow-xl"
            />
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <h1 className="text-5xl font-bold">
              {movie.title}
            </h1>

            <div className="flex flex-wrap gap-6 mt-4 text-gray-300">
              <span>⭐ {movie.rating.toFixed(1)}</span>
              <span>{movie.release_date}</span>
              <span>{movie.runtime} min</span>
              <span>{movie.language.toUpperCase()}</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="bg-blue-600 px-3 py-1 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            <h2 className="text-2xl font-semibold mt-10">
              Overview
            </h2>

            <p className="mt-4 leading-8 text-gray-300">
              {movie.overview}
            </p>

            <div className="mt-8">
              <p>
                <strong>Status:</strong> {movie.status}
              </p>

              <p>
                <strong>Votes:</strong> {movie.vote_count}
              </p>
            </div>

            {movie.homepage && (
              <a
                href={movie.homepage}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-8 bg-indigo-600 px-5 py-3 rounded-lg hover:bg-indigo-700"
              >
                Official Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;