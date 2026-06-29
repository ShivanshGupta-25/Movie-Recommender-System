import {

    createContext,

    useContext,

} from "react";

import useRecentlyViewed from "../hooks/useRecentlyViewed";

const RecentlyViewedContext = createContext();

export const RecentlyViewedProvider = ({

    children,

}) => {

    const value = useRecentlyViewed();

    return (

        <RecentlyViewedContext.Provider value={value}>

            {children}

        </RecentlyViewedContext.Provider>

    );

};

export const useRecentlyViewedContext = () =>

    useContext(RecentlyViewedContext);