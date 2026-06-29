// import MovieCard from "../MovieCard/MovieCard";

// const MovieGrid = ({ movies }) => {
//   // Show message if there are no movies
//   if (!movies || movies.length === 0) {
//     return (
//       <div className="flex justify-center items-center py-20">
//         <p className="text-lg text-gray-500">
//           No movies found.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div
//         className="
//         grid
//         grid-cols-1
//         sm:grid-cols-2
//         lg:grid-cols-3
//         xl:grid-cols-4
//         2xl:grid-cols-5
//         gap-8
//         "
//         >
//       {movies.map((movie) => (
//         <MovieCard
//           key={movie.id}
//           movie={movie}
//         />
//       ))}
//     </div>
//   );
// };

// export default MovieGrid;


import MovieCard from "../MovieCard/MovieCard";

const MovieGrid = ({ movies = [] }) => {
  // No movies found
  if (!movies.length) {
    return (
      <div className="flex justify-center items-center py-20">
        <h2 className="text-2xl font-semibold text-gray-500">
          No Movies Found
        </h2>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5
        gap-8
      "
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id || movie.title}
          movie={movie}
        />
      ))}
    </div>
  );
};

export default MovieGrid;