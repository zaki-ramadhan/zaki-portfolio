/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ErrorHero = ({ code = "404", title, description }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center text-center p-6 max-w-2xl w-full">
            <div className="relative mb-8">
                <span className="text-[10rem] md:text-[14rem] font-Archivo font-black text-white/5 select-none leading-none">
                    {code}
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Icon 
                        icon={code === "404" ? "solar:ghost-broken" : "solar:shield-warning-broken"} 
                        width="100" 
                        className="text-additional animate-floating-ghost"
                    />
                </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-semibold text-white mb-4">
                {title || t(`error.${code === "401" ? "unauthorized" : "not_found"}`)}
            </h1>
            
            <p className="text-stone-400 text-lg mb-10 max-w-md">
                {description || t(`error.desc_${code}`)}
            </p>
            
            <Link 
                to="/" 
                className="group relative overflow-hidden bg-stone-950 text-white font-semibold py-4 px-10 rounded-2xl transition-all duration-500 ease-in-out shadow-lg shadow-black/80 hover:shadow-additional/20 active:scale-95 flex items-center gap-2 border border-additional/15 hover:border-additional/40"
            >
                {/* Idle Glow Layer */}
                <div className="absolute inset-0 bg-radial-[at_50%_160%] from-additional/30 via-transparent to-transparent transition-opacity duration-500" />
                
                {/* Hover Glow Layer */}
                <div className="absolute inset-0 bg-radial-[at_50%_130%] from-additional/70 via-additional/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <span className="relative z-10 flex items-center gap-2">
                    <Icon icon="solar:home-2-broken" width="24" className="group-hover:text-additional transition-colors duration-500" />
                    {t("error.go_home")}
                </span>
            </Link>
        </div>
    );
};

export default ErrorHero;
