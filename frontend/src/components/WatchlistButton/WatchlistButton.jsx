import { BookmarkPlus } from "lucide-react";

import {

    useWatchlistContext,

} from "../../Context/WatchlistContext";

const WatchlistButton = ({ movie }) => {

    const {

        toggleWatchlist,

        isWatchlistMovie,

    } = useWatchlistContext();

    const saved = isWatchlistMovie(movie.id);

    return (

        <button

            onClick={(e) => {

                e.preventDefault();

                e.stopPropagation();

                toggleWatchlist(movie);

            }}

            className="
            absolute
            top-16
            left-3
            w-10
            h-10
            rounded-full
            bg-black/70
            backdrop-blur
            flex
            items-center
            justify-center
            transition
            hover:bg-blue-600
            z-20
            "

        >

            <BookmarkPlus

                size={20}

                fill={

                    saved

                        ? "currentColor"

                        : "none"

                }

                className={

                    saved

                        ? "text-blue-400"

                        : "text-white"

                }

            />

        </button>

    );

};

export default WatchlistButton;