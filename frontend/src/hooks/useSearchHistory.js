import { useEffect, useState } from "react";

import {

    getSearchHistory,

    addSearchHistory,

    clearSearchHistory,

} from "../utils/storage";

const useSearchHistory = () => {

    const [history, setHistory] = useState([]);

    useEffect(() => {

        setHistory(

            getSearchHistory()

        );

    }, []);

    const addSearch = (query) => {

        const updated = addSearchHistory(query);

        setHistory(updated);

    };

    const clearHistory = () => {

        clearSearchHistory();

        setHistory([]);

    };

    return {

        history,

        addSearch,

        clearHistory,

    };

};

export default useSearchHistory;