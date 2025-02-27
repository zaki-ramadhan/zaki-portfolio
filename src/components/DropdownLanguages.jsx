import { useState, useRef, useEffect } from "react";
import i18n from "../i18n"; // Import konfigurasi bahasa
import { Icon } from "@iconify-icon/react";

const languages = [
    { code: "en", name: "English", flag: "twemoji:flag-united-kingdom" },
    { code: "es", name: "Spanish", flag: "twemoji:flag-spain" },
    { code: "fr", name: "French", flag: "twemoji:flag-france" },
    { code: "de", name: "German", flag: "twemoji:flag-germany" },
    { code: "pt", name: "Portuguese", flag: "twemoji:flag-portugal" },
    { code: "zh", name: "Chinese", flag: "twemoji:flag-china" },
    { code: "ja", name: "Japanese", flag: "twemoji:flag-japan" },
    { code: "id", name: "Bahasa Indonesia", flag: "twemoji:flag-indonesia" },
];

const DropdownLanguages = () => {
    const [language, setLanguage] = useState("en");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const switchLanguage = (lang) => {
        setLanguage(lang);
        i18n.changeLanguage(lang);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative switch-language-btn ms-6 -translate-y-0.5" ref={dropdownRef}>
            {/* Button untuk membuka dropdown */}
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 focus:outline-none">
                <Icon icon={languages.find((l) => l.code === language)?.flag || "twemoji:flag-united-kingdom"} width="28" height="28" className="text-secondary active:text-white rounded-full" />
                <Icon icon="dashicons:arrow-down" width="22" height="22" className={`transition-all duration-300 ${isOpen ? 'rotate-180 text-secondary' : ''}`} />
            </button>
            
            {/* Dropdown Language Selection */}
            {isOpen && (
                <div className="absolute right-0 top-10 bg-white shadow-md rounded-md py-2 w-46 text-black origin-top-right">
                    {languages.map(({ code, name, flag }) => (
                        <button key={code} onClick={() => switchLanguage(code)} className="flex items-center gap-3 ps-4 pe-2 py-2 hover:bg-gray-200 w-full text-left text-sm">
                            <Icon icon={flag} width="24" height="24" />
                            {name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownLanguages;
