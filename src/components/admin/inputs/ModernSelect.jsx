/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify-icon/react";

const ModernSelect = ({ label, options, value, onChange, name, required, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value) || options[0];

    return (
        <div className="space-y-2 relative" ref={dropdownRef}>
            <label className="text-sm text-stone-400 font-semibold ml-1">
                {label}{required && <span className="text-red-500">*</span>}
            </label>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-stone-800/40 rounded-xl p-3.5 border flex items-center justify-between hover:bg-stone-800/60 transition-all outline-none group cursor-pointer ${
                    error ? 'border-red-500/50 ring-4 ring-red-500/10 animate-shake' : 'border-white/5'
                }`}
            >
                <span className="text-sm text-stone-300 group-hover:text-white transition-colors">{selectedOption?.label}</span>
                <Icon 
                    icon="solar:alt-arrow-down-linear" 
                    className={`text-stone-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-additional' : ''}`}
                    width="20"
                />
            </button>

            {isOpen && (
                <div className="absolute z-50 top-[110%] left-0 w-full bg-stone-900 border border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in duration-200">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                                onChange({ target: { name, value: opt.value } });
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between cursor-pointer ${value === opt.value ? 'bg-additional/10 text-additional' : 'text-stone-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            {opt.label}
                            {value === opt.value && <Icon icon="solar:check-read-linear" width="16" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ModernSelect;
