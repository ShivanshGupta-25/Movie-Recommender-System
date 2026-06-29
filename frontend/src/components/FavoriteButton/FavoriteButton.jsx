import { Heart } from "lucide-react";

import { useFavoritesContext } from "../../Context/FavoritesContext";

const FavoriteButton = ({ movie }) => {

    const {

        toggleFavorite,

        isFavoriteMovie,

    } = useFavoritesContext();

    const favorite = isFavoriteMovie(movie.id);

    return (

        <button

            onClick={(e) => {

                e.preventDefault();

                e.stopPropagation();

                toggleFavorite(movie);

            }}

            className="
            absolute
            top-3
            left-3
            w-10
            h-10
            rounded-full
            backdrop-blur
            bg-black/70
            hover:bg-red-600
            transition
            flex
            items-center
            justify-center
            z-20
            "

        >

            <Heart

                size={20}

                fill={

                    favorite

                        ? "currentColor"

                        : "none"

                }

                className={

                    favorite

                        ? "text-red-500"

                        : "text-white"

                }

            />

        </button>

    );

};

export default FavoriteButton;