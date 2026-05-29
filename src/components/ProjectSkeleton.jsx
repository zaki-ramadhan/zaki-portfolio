const ProjectSkeleton = () => {
    return (
        <div className="relative h-80 lg:h-100 bg-stone-900/40 rounded-4xl flex flex-col border border-white/5 overflow-hidden animate-pulse">
            <div className="p-7 sm:p-10 w-full h-fit space-y-4">
                <div className="flex justify-between items-center">
                    <div className="h-8 w-1/2 bg-stone-800 rounded-lg"></div>
                    <div className="h-6 w-20 bg-stone-800 rounded-full"></div>
                </div>
                <div className="h-4 w-3/4 bg-stone-800 rounded-lg"></div>
            </div>
            <div className="mx-7 sm:mx-10 mt-4 flex-1 bg-stone-800/50 rounded-2xl"></div>
            <div className="absolute bottom-7 left-1/2 -translate-x-1/2 h-10 w-32 bg-stone-800/80 rounded-xl"></div>
        </div>
    );
};

export default ProjectSkeleton;
