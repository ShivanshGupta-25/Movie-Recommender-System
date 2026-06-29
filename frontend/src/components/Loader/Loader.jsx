import { Loader2 } from "lucide-react";

const Loader = () => {

    return (

        <div className="min-h-screen flex justify-center items-center bg-slate-950">

            <Loader2

                size={45}

                className="animate-spin text-red-500"

            />

        </div>

    );

};

export default Loader;