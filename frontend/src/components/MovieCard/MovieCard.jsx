// const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// const MovieCard = ({ movie }) => {
//   // Support both backend poster URL and TMDB poster_path
//   const poster =
//     movie.poster ||
//     (movie.poster_path
//       ? `${IMAGE_BASE_URL}${movie.poster_path}`
//       : "https://via.placeholder.com/500x750?text=No+Image");

//   // Support both rating fields
//   const rating =
//     movie.rating ??
//     movie.vote_average ??
//     0;

//   // Support both similarity fields
//   const similarity =
//     movie.score ??
//     movie.similarity_score;

//   // Release year
//   const releaseDate =
//     movie.release_date || "N/A";

//   const releaseYear =
//     releaseDate !== "N/A"
//       ? releaseDate.slice(0, 4)
//       : "N/A";

//   return (
//     <div
//       className="
//       group
//       relative
//       overflow-hidden
//       rounded-2xl
//       bg-white
//       shadow-lg
//       transition-all
//       duration-500
//       hover:scale-105
//       hover:-translate-y-2
//       hover:shadow-2xl
//       "
//     >
//       {/* Poster */}
//       <div className="relative h-[420px] overflow-hidden">
//         <img
//           src={poster}
//           alt={movie.title}
//           className="
//           w-full
//           h-full
//           object-cover
//           transition-transform
//           duration-700
//           group-hover:scale-110
//           "
//         />

//         {/* Gradient Overlay */}
//         <div
//           className="
//           absolute
//           inset-0
//           bg-gradient-to-t
//           from-black/90
//           via-black/20
//           to-transparent
//           "
//         />

//         {/* Rating */}
//         <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold shadow-lg">
//           ⭐ {Number(rating).toFixed(1)}
//         </div>
//       </div>

//       {/* Content */}
//       <div className="absolute bottom-0 w-full p-5 text-white">
//         <h2 className="text-2xl font-bold mb-3 line-clamp-2">
//           {movie.title}
//         </h2>

//         <div className="space-y-2 text-sm">
//           <div className="flex justify-between">
//             <span className="text-gray-300">
//               Release
//             </span>

//             <span className="font-semibold">
//               {releaseYear}
//             </span>
//           </div>

//           {similarity !== undefined && (
//             <div className="flex justify-between">
//               <span className="text-gray-300">
//                 Similarity
//               </span>

//               <span className="text-green-400 font-bold">
//                 {typeof similarity === "number"
//                   ? `${(similarity * 100).toFixed(0)}%`
//                   : similarity}
//               </span>
//             </div>
//           )}
//         </div>

//         {movie.genres?.length > 0 && (
//           <div className="flex flex-wrap gap-2 mt-4">
//             {movie.genres.map((genre) => (
//               <span
//                 key={genre}
//                 className="
//                 bg-white/20
//                 backdrop-blur-sm
//                 px-3
//                 py-1
//                 rounded-full
//                 text-xs
//                 border
//                 border-white/20
//                 "
//               >
//                 {genre}
//               </span>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Glow Effect */}
//       <div
//         className="
//         absolute
//         inset-0
//         rounded-2xl
//         ring-2
//         ring-transparent
//         group-hover:ring-blue-500/50
//         transition-all
//         duration-500
//         "
//       />
//     </div>
//   );
// };

// export default MovieCard;



// const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
// const PLACEHOLDER =
//   "https://via.placeholder.com/500x750?text=No+Poster";

// const MovieCard = ({ movie }) => {
//   // Poster
//   const poster =
//     movie.poster ||
//     movie.poster_url ||
//     (movie.poster_path
//       ? `${IMAGE_BASE_URL}${movie.poster_path}`
//       : PLACEHOLDER);

//   // Rating
//   const rating =
//     movie.rating ??
//     movie.vote_average ??
//     0;

//   // Similarity (only recommendations)
//   const similarity =
//     movie.score ??
//     movie.similarity_score;

//   // Release Year
//   const year =
//     movie.release_date
//       ? movie.release_date.substring(0, 4)
//       : "N/A";

//   // Genres
//   const genres = movie.genres || [];

//   return (
//     <div
//       className="
//         bg-white
//         rounded-2xl
//         overflow-hidden
//         shadow-lg
//         hover:shadow-2xl
//         hover:-translate-y-2
//         transition-all
//         duration-300
//       "
//     >
//       {/* Poster */}
//       <img
//         src={poster}
//         alt={movie.title}
//         loading="lazy"
//         onError={(e) => {
//           e.target.src = PLACEHOLDER;
//         }}
//         className="w-full h-[420px] object-cover"
//       />

//       {/* Details */}
//       <div className="p-4">

//         <h2 className="text-lg font-bold line-clamp-2">
//           {movie.title}
//         </h2>

//         <div className="flex justify-between mt-2 text-sm text-gray-600">
//           <span>{year}</span>

//           <span className="font-semibold text-yellow-600">
//             ⭐ {Number(rating).toFixed(1)}
//           </span>
//         </div>

//         {/* Similarity */}
//         {similarity !== undefined && (
//           <div className="mt-3">
//             <span className="text-green-600 font-semibold">
//               Match {Math.round(similarity * 100)}%
//             </span>
//           </div>
//         )}

//         {/* Genres */}
//         {genres.length > 0 && (
//           <div className="flex flex-wrap gap-2 mt-4">
//             {genres.map((genre) => (
//               <span
//                 key={genre}
//                 className="
//                   px-2
//                   py-1
//                   rounded-full
//                   bg-blue-100
//                   text-blue-700
//                   text-xs
//                 "
//               >
//                 {genre}
//               </span>
//             ))}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default MovieCard;




import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const PLACEHOLDER =
  "https://via.placeholder.com/500x750?text=No+Poster";

const MovieCard = ({ movie }) => {
  // Poster
  const poster =
    movie.poster ||
    movie.poster_url ||
    (movie.poster_path
      ? `${IMAGE_BASE_URL}${movie.poster_path}`
      : PLACEHOLDER);

  // Rating
  const rating =
    movie.rating ??
    movie.vote_average ??
    0;

  // Similarity (only recommendations)
  const similarity =
    movie.score ??
    movie.similarity_score;

  // Release Year
  const year =
    movie.release_date
      ? movie.release_date.substring(0, 4)
      : "N/A";

  // Genres
  const genres = movie.genres || [];

  return (
    <Link
      to={`/movie/${encodeURIComponent(movie.title)}`}
      className="block"
    >
      <div
        className="
          bg-white
          rounded-2xl
          overflow-hidden
          shadow-lg
          hover:shadow-2xl
          hover:-translate-y-2
          transition-all
          duration-300
        "
      >
        {/* Poster */}
        <img
          src={poster}
          alt={movie.title}
          loading="lazy"
          onError={(e) => {
            e.target.src = PLACEHOLDER;
          }}
          className="w-full h-[420px] object-cover"
        />

        {/* Details */}
        <div className="p-4">
          <h2 className="text-lg font-bold line-clamp-2">
            {movie.title}
          </h2>

          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{year}</span>

            <span className="font-semibold text-yellow-600">
              ⭐ {Number(rating).toFixed(1)}
            </span>
          </div>

          {/* Similarity */}
          {similarity !== undefined && (
            <div className="mt-3">
              <span className="text-green-600 font-semibold">
                Match {Math.round(similarity * 100)}%
              </span>
            </div>
          )}

          {/* Genres */}
          {genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {genres.map((genre) => (
                <span
                  key={genre}
                  className="
                    px-2
                    py-1
                    rounded-full
                    bg-blue-100
                    text-blue-700
                    text-xs
                  "
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;