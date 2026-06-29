import {

    createContext,

    useContext,

} from "react";

import useWatchlist from "../hooks/useWatchlist";

const WatchlistContext = createContext();

export const WatchlistProvider = ({

    children,

}) => {

    const value = useWatchlist();

    return (

        <WatchlistContext.Provider value={value}>

            {children}

        </WatchlistContext.Provider>

    );

};

export const useWatchlistContext = () =>

    useContext(WatchlistContext);