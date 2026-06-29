
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import MovieCard from "../MovieCard/MovieCard";

const MovieCarousel = ({ movies = [] }) => {

    const sliderRef = useRef(null);

    const scrollLeft = () => {

        sliderRef.current?.scrollBy({

            left: -1200,

            behavior: "smooth",

        });

    };

    const scrollRight = () => {

        sliderRef.current?.scrollBy({

            left: 1200,

            behavior: "smooth",

        });

    };

    if (!movies.length) return null;

    return (

        <div className="relative group">

            {/* Left Arrow */}

            <button

                onClick={scrollLeft}

                className="
                absolute
                left-0
                top-1/2
                -translate-y-1/2
                z-20
                hidden
                md:flex
                w-12
                h-20
                rounded-r-xl
                bg-black/70
                backdrop-blur
                items-center
                justify-center
                opacity-0
                group-hover:opacity-100
                transition
                hover:bg-red-600
                "

            >

                <ChevronLeft size={28} />

            </button>

            {/* Right Arrow */}

            <button

                onClick={scrollRight}

                className="
                absolute
                right-0
                top-1/2
                -translate-y-1/2
                z-20
                hidden
                md:flex
                w-12
                h-20
                rounded-l-xl
                bg-black/70
                backdrop-blur
                items-center
                justify-center
                opacity-0
                group-hover:opacity-100
                transition
                hover:bg-red-600
                "

            >

                <ChevronRight size={28} />

            </button>

            {/* Movies */}

            <motion.div

                ref={sliderRef}

                className="
                flex
                gap-6
                overflow-x-auto
                scroll-smooth
                pb-4
                scrollbar-hide
                "

                initial={{

                    opacity: 0,

                    y: 20,

                }}

                whileInView={{

                    opacity: 1,

                    y: 0,

                }}

                transition={{

                    duration: .5,

                }}

                viewport={{

                    once: true,

                }}

            >

                {

                    movies.map(movie => (

                        <div

                            key={movie.id}

                            className="
                            flex-none
                            w-[180px]
                            sm:w-[200px]
                            md:w-[220px]
                            lg:w-[240px]
                            "

                        >

                            <MovieCard

                                movie={movie}

                            />

                        </div>

                    ))

                }

            </motion.div>

        </div>

    );

};

export default MovieCarousel;