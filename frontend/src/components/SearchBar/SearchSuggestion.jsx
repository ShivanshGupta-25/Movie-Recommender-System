const IMAGE = "https://image.tmdb.org/t/p/w92";

const SearchSuggestion = ({ movie, onClick }) => {

    const poster = movie.poster_path
        ? `${IMAGE}${movie.poster_path}`
        : "https://dummyimage.com/92x138/1f2937/ffffff&text=No+Image";

    return (
        <button
            onClick={() => onClick(movie)}
            className="
            w-full
            flex
            items-center
            gap-4
            px-4
            py-3
            hover:bg-gray-800
            transition-all
            duration-200
        "
        >

            <img
                src={poster}
                alt={movie.title}
                className="
                w-16
                h-24
                rounded-lg
                object-cover
                flex-shrink-0
            "
            />

            <div className="text-left">

                <h3 className="text-white font-semibold text-lg">
                    {movie.title}
                </h3>

                <div className="flex gap-3 mt-1 text-sm text-gray-400">

                    <span>
                        ⭐ {movie.vote_average?.toFixed(1)}
                    </span>

                    <span>
                        {movie.release_date?.slice(0,4)}
                    </span>

                </div>

            </div>

        </button>
    );
};

export default SearchSuggestion;