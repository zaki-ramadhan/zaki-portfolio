import { useState, useRef, useEffect, useMemo } from "react";
import i18n from "../i18n"; // Import konfigurasi bahasa
import { Icon } from "@iconify-icon/react";

const languages = [
    { code: "en", name: "English", flag: "twemoji:flag-united-kingdom" },
    { code: "es", name: "Spanish", flag: "twemoji:flag-spain" },
    { code: "fr", name: "French", flag: "twemoji:flag-france" },
    { code: "de", name: "German", flag: "twemoji:flag-germany" },
    { code: "pt", name: "Portuguese", flag: "twemoji:flag-portugal" },
    { code: "it", name: "Italian", flag: "twemoji:flag-italy" }, // ✅ Ditambahkan bahasa Italia
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
        // kalo dia selesai milih bahasa dan atau dia klik di luar elemen, maka tutup elemen dropdownnya
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

    // menggunakan useMemo, hanya akan dihitung ulang ketika state/nilainya berubah
    const selectedLanguage = useMemo(()=> {
        return languages.find((l) => l.code === language)?.flag || "twemoji:flag-united-kingdom";
    }, [language]);

    // Memakai useMemo agar languageButtons tidak dihitung ulang setiap render
    const languageButtons = useMemo(() => {
        return languages.map(({ code, name, flag }) => (
            <button key={code} onClick={() => switchLanguage(code)} className="flex items-center gap-3 ps-4 pe-2 py-2 hover:bg-gray-200 w-full text-left text-sm">
                <Icon icon={flag} width="24" height="24" className="text-secondary active:text-white rounded-full" />
                {name}
            </button>
        ));
    }, []); // ini depedenci kosong / gada nama, karena dia array statis jadi gausah di re-render 

    return (
        <div className="relative switch-language-btn ms-6 -translate-y-0.5" ref={dropdownRef}>
            {/* Button untuk membuka dropdown */}
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 focus:outline-none">
                <Icon icon={selectedLanguage} width="28" height="28" className="text-secondary active:text-white rounded-full" />
                <Icon icon="dashicons:arrow-down" width="22" height="22" className={`transition-all duration-300 ${isOpen ? 'rotate-180 text-secondary' : ''}`} />
            </button>
            
            {/* Dropdown Language Selection */}
            {isOpen && (
                <div className="absolute right-0 top-10 bg-white shadow-md rounded-md py-2 w-46 text-black origin-top-right">
                    {languageButtons}
                </div>
            )}
        </div>
    );
};

export default DropdownLanguages;
