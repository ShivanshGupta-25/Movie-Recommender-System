import {

Clock,

Trash2

}

from "lucide-react";

const SearchHistoryList = ({

history,

onSearch,

onClear,

}) => {

if(!history.length)

return null;

return(

<div className="bg-slate-900 rounded-xl p-5 mt-5">

<div className="flex justify-between mb-4">

<h2 className="font-semibold">

Recent Searches

</h2>

<button

onClick={onClear}

className="text-red-500"

>

<Trash2 size={18}/>

</button>

</div>

<div className="flex flex-wrap gap-3">

{

history.map(query=>(

<button

key={query}

onClick={()=>onSearch(query)}

className="px-4 py-2 bg-slate-800 rounded-full hover:bg-red-600 transition"

>

<Clock size={15}/>

<span className="ml-2">

{query}

</span>

</button>

))

}

</div>

</div>

);

};

export default SearchHistoryList;