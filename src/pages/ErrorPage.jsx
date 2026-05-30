/* eslint-disable react/prop-types */
import ErrorHero from "../components/ErrorHero";

const ErrorPage = ({ code = "404" }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-950 px-4 py-20 font-Archivo overflow-hidden relative">
            {/* Background decorative elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            
            <ErrorHero code={code} />
        </div>
    );
};

export default ErrorPage;
