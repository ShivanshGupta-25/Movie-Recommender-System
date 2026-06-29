const ErrorState = ({ message }) => {

    return (

        <div className="min-h-screen flex justify-center items-center bg-slate-950">

            <div className="bg-red-900/20 border border-red-500 rounded-xl p-10">

                <h2 className="text-3xl font-bold text-red-400">

                    Oops!

                </h2>

                <p className="mt-4 text-gray-300">

                    {message}

                </p>

            </div>

        </div>

    );

};

export default ErrorState;