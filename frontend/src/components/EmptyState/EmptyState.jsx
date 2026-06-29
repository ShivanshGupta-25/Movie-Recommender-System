const EmptyState = ({

    title,

    description,

}) => {

    return (

        <div className="min-h-screen flex justify-center items-center bg-slate-950">

            <div className="text-center">

                <div className="text-6xl">

                    🎬

                </div>

                <h2 className="text-3xl font-bold mt-6">

                    {title}

                </h2>

                <p className="text-gray-400 mt-4">

                    {description}

                </p>

            </div>

        </div>

    );

};

export default EmptyState;