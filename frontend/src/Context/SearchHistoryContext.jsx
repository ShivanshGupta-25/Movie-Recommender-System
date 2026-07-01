import {

    createContext,

    useContext,

} from "react";

import useSearchHistory from "../hooks/useSearchHistory";

const SearchHistoryContext = createContext();

export const SearchHistoryProvider = ({

    children,

}) => {

    const value = useSearchHistory();

    return (

        <SearchHistoryContext.Provider

            value={value}

        >

            {children}

        </SearchHistoryContext.Provider>

    );

};

export const useSearchHistoryContext = () =>

    useContext(SearchHistoryContext);