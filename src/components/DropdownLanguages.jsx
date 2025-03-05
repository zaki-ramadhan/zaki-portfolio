import { useState, useRef, useEffect, useMemo } from "react";
import i18n from "../i18n";
import { Icon } from "@iconify-icon/react";

const languages = [
    { code: "en", name: "English", flag: "twemoji:flag-united-kingdom" },
    { code: "es", name: "Spanish", flag: "twemoji:flag-spain" },
    { code: "fr", name: "French", flag: "twemoji:flag-france" },
    { code: "de", name: "German", flag: "twemoji:flag-germany" },
    { code: "pt", name: "Portuguese", flag: "twemoji:flag-portugal" },
    { code: "it", name: "Italian", flag: "twemoji:flag-italy" },
    { code: "zh", name: "Chinese", flag: "twemoji:flag-china" },
    { code: "ja", name: "Japanese", flag: "twemoji:flag-japan" },
    { code: "id", name: "Bahasa Indonesia", flag: "twemoji:flag-indonesia" },
];

const DropdownLanguages = () => {
    const [language, setLanguage] = useState("en");
    const [isOpen, setIsOpen] = useState(false);
    const [delays, setDelays] = useState([]); // Untuk menyimpan delay tiap elemen
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

    useEffect(() => {
        if (isOpen) {
            // Reset delays saat dropdown dibuka
            setDelays([]);
            languages.forEach((_, index) => {
                setTimeout(() => {
                    setDelays((prev) => [...prev, index]);
                }, index * 50); // Setiap tombol muncul dengan delay bertahap (100ms)
            });
        }
    }, [isOpen]);

    const selectedLanguage = useMemo(() => {
        return languages.find((l) => l.code === language)?.flag || "twemoji:flag-united-kingdom";
    }, [language]);

    const languageButtons = useMemo(() => {
        return languages.map(({ code, name, flag }, index) => (
            <button
                key={code}
                onClick={() => switchLanguage(code)}
                className={`flex items-center gap-3 ps-4 pe-2 py-2 hover:bg-gray-200 w-full text-left text-sm transition-all duration-300 ${
                    delays.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
                }`}
            >
                <Icon icon={flag} width="24" height="24" className="text-secondary active:text-white rounded-full" />
                {name}
            </button>
        ));
    }, [delays]);

    return (
        <div className="relative switch-language-btn ms-6 -translate-y-0.5" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 focus:outline-none">
                <Icon icon={selectedLanguage} width="28" height="28" className="text-secondary active:text-white rounded-full" />
                <Icon icon="dashicons:arrow-down" width="22" height="22" className={`transition-all duration-300 ${isOpen ? "rotate-180 text-secondary" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-10 bg-white shadow-md rounded-md py-2 w-46 text-black origin-top-right">
                    {languageButtons}
                </div>
            )}
        </div>
    );
};

export default DropdownLanguages;
