import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SearchHistoryList from "../../components/SearchHistoryList/SearchHistoryList";

import {

useSearchHistoryContext

}

from "../../Context/SearchHistoryContext";

const SearchHistory = ()=>{

const{

history,

clearHistory,

}=useSearchHistoryContext();

return(

<div className="min-h-screen bg-slate-950 text-white">

<Navbar/>

<main className="max-w-7xl mx-auto px-6 py-32">

<h1 className="text-4xl font-bold mb-8">

🔍 Search History

</h1>

<SearchHistoryList

history={history}

onSearch={(query)=>console.log(query)}

onClear={clearHistory}

/>

</main>

<Footer/>

</div>

);

};

export default SearchHistory;