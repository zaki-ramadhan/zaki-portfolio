// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify-icon/react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n"; // Import konfigurasi bahasa

const MainHeader = () => {
    const { t } = useTranslation();
    const [language, setLanguage] = useState("en");
    const [isOpen, setIsOpen] = useState(false); // State untuk toggle dropdown
    const headerRef = useRef(null); // Untuk mendeteksi klik di luar elemen

    const switchLanguage = (lang) => {
        setLanguage(lang);
        i18n.changeLanguage(lang);
        setIsOpen(false); // Tutup dropdown setelah pilih bahasa
    };

    // Deteksi klik di luar elemen header
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (headerRef.current && !headerRef.current.contains(event.target)) {
                setIsOpen(false); // Tutup elemen jika klik di luar
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header id="main-header" className="container mx-auto -mb-1 sm:mb-0 px-6 pb-3 md:px-12 xl:px-20 pt-7 md:pb-2 flex justify-between z-50">
            <div className="dev-name">
                <h1 className="inline text-lg md:text-xl lg:text-base">Zaki R<span className="hidden sm:inline-block">amadhan</span></h1>
                <span className="text-secondary text-base md:text-xl lg:text-base">, Front-End</span>
            </div>

            <nav className="flex items-center gap-4 relative">
                <ul className="hidden md:flex md:gap-7 lg:gap-12 text-secondary text-lg *:hover:text-white *:active:text-white *:duration-100 lg:text-base">
                    <li><a href="">{t("header.present")}</a></li>
                    <li><a href="#projects">{t("header.projects")}</a></li>
                    <li><a href="">{t("header.contact")}</a></li>
                </ul>

                {/* Button untuk membuka dropdown */}
                <span className="swicth-language-btn relative ms-6 -translate-y-0.5">
                    <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 focus:outline-none">
                        <Icon icon={language === "en" ? "twemoji:flag-united-kingdom" : "twemoji:flag-indonesia"} 
                            width="28" height="28" 
                            className="text-secondary active:text-white rounded-full"/>
                        <Icon icon="dashicons:arrow-down" width="22" height="22" className={`${isOpen ? 'rotate-180' : ''}`}/>
                    </button>

                    {/* Dropdown Language Selection */}
                    {isOpen && (
                        <div ref={headerRef} className="dropdown absolute right-0 top-10 bg-white shadow-md rounded-md py-2 w-32 text-black">
                            <button onClick={() => switchLanguage("en")} className="flex items-center gap-3 px-4 py-1 hover:bg-gray-200 w-full text-left text-sm">
                                <Icon icon="twemoji:flag-united-kingdom" width="24" height="24" />
                                English
                            </button>
                            <button onClick={() => switchLanguage("id")} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 w-full text-left text-sm">
                                <Icon icon="twemoji:flag-indonesia" width="24" height="24" />
                                Bahasa Indonesia
                            </button>
                        </div>
                    )}
                </span>

                 {/* Button untuk menu mobile */}
                 <span className="flex items-center gap-2">
                    <Icon icon="hugeicons:menu-01" width="26" height="26" className={`md:hidden text-secondary active:text-white `}/>
                 </span>
            </nav>
        </header>
    );
};

export default MainHeader;
