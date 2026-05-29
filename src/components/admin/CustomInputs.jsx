/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify-icon/react";

/**
 * Combo Input Component (Input + Autocomplete Suggestions)
 */
export const ComboInput = ({ label, name, value, onChange, options = [], placeholder, required, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value || "");
    const [activeIndex, setActiveIndex] = useState(0);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const dropdownRef = useRef(null);

    // Sync local input with parent value when parent value changes externally
    useEffect(() => {
        setInputValue(value || "");
    }, [value]);

    const exactMatch = options.find(opt => opt.toLowerCase() === inputValue?.toLowerCase());
    const showCreateOption = inputValue && !exactMatch;
    
    // Status checks
    const isConfirmed = value && inputValue === value;
    const isPending = inputValue && inputValue !== value;

    useEffect(() => {
        const filtered = options.filter(opt => 
            opt.toLowerCase().includes(inputValue?.toLowerCase() || "") && 
            opt.toLowerCase() !== inputValue?.toLowerCase()
        );
        setFilteredOptions(filtered);
        setActiveIndex(0);
    }, [inputValue, options]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setInputValue(value || "");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [value]);

    const handleSelect = (selectedVal) => {
        onChange({ target: { name, value: selectedVal } });
        setInputValue(selectedVal);
        setIsOpen(false);
    };

    const handleKeyDown = (e) => {
        if (!isOpen) {
            if (e.key === "Enter") e.preventDefault();
            return;
        }

        const totalItems = (showCreateOption ? 1 : 0) + filteredOptions.length;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex(prev => (prev < totalItems - 1 ? prev + 1 : prev));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (showCreateOption && activeIndex === 0) {
                handleSelect(inputValue);
            } else {
                const optIndex = showCreateOption ? activeIndex - 1 : activeIndex;
                if (filteredOptions[optIndex]) handleSelect(filteredOptions[optIndex]);
            }
        } else if (e.key === "Escape") {
            setIsOpen(false);
            setInputValue(value || "");
        }
    };

    return (
        <div className="space-y-2 relative" ref={dropdownRef}>
            <div className="flex justify-between items-center px-1">
                <label className="text-sm text-stone-400 font-semibold ml-1">
                    {label}{required && <span className="text-red-500">*</span>}
                </label>
                {isConfirmed && <span className="text-[13px] text-emerald-500 font-bold flex items-center gap-1">
                    <Icon icon="solar:check-circle-bold" width="12" /> Confirmed
                </span>}
                {isPending && <span className="text-[13px] text-blue-400 font-bold animate-pulse flex items-center gap-1">
                    <Icon icon="solar:info-circle-bold" width="12" /> Pending Fix
                </span>}
            </div>
            
            <div className="relative">
                <input 
                    name={name}
                    value={inputValue} 
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder} 
                    className={`w-full bg-stone-900 rounded-xl p-3 pr-10 border outline-none transition-all text-sm placeholder:text-stone-600 cursor-pointer ${
                        error 
                        ? 'border-red-500/50 ring-4 ring-red-500/10 animate-shake' 
                        : isConfirmed 
                        ? 'border-emerald-500/40 bg-emerald-500/[0.02] focus:border-emerald-500/60 focus:ring-emerald-500/5' 
                        : isPending 
                        ? 'border-blue-500/50 ring-4 ring-blue-500/10 focus:border-blue-400' 
                        : 'border-white/10 focus:border-additional/40 focus:ring-4 focus:ring-additional/5'
                    }`} 
                    autoComplete="off"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                    {isConfirmed ? (
                        <Icon icon="solar:check-circle-bold" className="text-emerald-500" width="18" />
                    ) : isPending ? (
                        <Icon icon="solar:pen-new-square-linear" className="text-blue-400 animate-pulse" width="18" />
                    ) : (
                        <Icon icon="solar:pen-new-square-linear" className="text-stone-600" width="18" />
                    )}
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-50 top-[105%] left-0 w-full bg-stone-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="max-h-60 overflow-y-auto scrollbar-hide">
                        {showCreateOption && (
                            <button
                                type="button"
                                onClick={() => handleSelect(inputValue)}
                                onMouseEnter={() => setActiveIndex(0)}
                                className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors cursor-pointer ${activeIndex === 0 ? 'bg-additional/10 text-additional' : 'text-stone-300'}`}
                            >
                                <Icon icon="solar:add-circle-linear" className="text-additional" width="18" />
                                <div className="flex flex-col">
                                    <span className="font-semibold">Create: &quot;{inputValue}&quot;</span>
                                    <span className="text-[10px] opacity-60 font-medium">Click to confirm and use this {label.toLowerCase()}</span>
                                </div>
                            </button>
                        )}

                        {filteredOptions.length > 0 && (
                            <>
                                <div className="px-4 py-2 text-[11px] text-stone-600 font-bold bg-stone-950/50 border-y border-white/5">
                                    Suggestions
                                </div>
                                {filteredOptions.map((opt, idx) => {
                                    const displayIdx = showCreateOption ? idx + 1 : idx;
                                    return (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => handleSelect(opt)}
                                            onMouseEnter={() => setActiveIndex(displayIdx)}
                                            className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between transition-colors cursor-pointer group ${displayIdx === activeIndex ? 'bg-white/5 text-white' : 'text-stone-400'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon icon="solar:history-linear" width="16" className="opacity-40 group-hover:text-additional transition-colors" />
                                                <span>{opt}</span>
                                            </div>
                                            {value === opt && <Icon icon="solar:check-read-linear" width="16" className="text-emerald-500" />}
                                        </button>
                                    );
                                })}
                            </>
                        )}
                        
                        {!showCreateOption && filteredOptions.length === 0 && (
                            <div className="px-4 py-8 text-center bg-stone-950/20">
                                <Icon icon="solar:magnifer-linear" className="mx-auto text-stone-700 mb-2 opacity-40" width="28" />
                                <p className="text-[11px] text-stone-500 font-medium">Start typing to build your history</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

/**
 * Modern Select Component
 */
export const ModernSelect = ({ label, options, value, onChange, name, required, error }) => {
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
                <span className="text-sm text-stone-300 group-hover:text-white transition-colors">{selectedOption.label}</span>
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

/**
 * Icon Selector with Autocomplete
 */
export const IconSelector = ({ techInput, setTechInput, handleAddTech, usedIcons = [], currentTechs = [], removeTech }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [filteredIcons, setFilteredIcons] = useState([]);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (techInput.length > 0) {
            const filtered = usedIcons.filter(icon => 
                icon.toLowerCase().includes(techInput.toLowerCase()) && 
                !currentTechs.some(t => t.icon === icon)
            );
            setFilteredIcons(filtered);
            setIsMenuOpen(filtered.length > 0);
        } else {
            // Show all used icons as suggestions if input is empty
            const available = usedIcons.filter(icon => !currentTechs.some(t => t.icon === icon));
            setFilteredIcons(available.slice(0, 5));
            setIsMenuOpen(available.length > 0);
        }
    }, [techInput, usedIcons, currentTechs]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="space-y-4">
            <div className="space-y-2 relative" ref={dropdownRef}>
                <div className="flex justify-between items-center px-1">
                    <label className="text-sm text-stone-400 font-semibold ml-1">Tech Stack</label>
                    <a 
                        href="https://icon-sets.iconify.design/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-additional/60 hover:text-additional transition-colors flex items-center gap-1.5 font-bold cursor-pointer"
                    >
                        Browse Icons <Icon icon="solar:arrow-right-up-linear" width="14" />
                    </a>
                </div>
                <div className="flex gap-2">
                    <div className="relative flex-1 group">
                        <input 
                            value={techInput} 
                            onChange={(e) => setTechInput(e.target.value)} 
                            onFocus={() => setIsMenuOpen(filteredIcons.length > 0)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddTech();
                                    setIsMenuOpen(false);
                                }
                            }}
                            placeholder="Type icon (e.g. logos:react)" 
                            className="w-full bg-stone-800/40 rounded-xl p-3.5 pr-11 border border-white/5 outline-none focus:border-additional/30 focus:ring-4 focus:ring-additional/5 transition-all text-sm" 
                        />
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-additional transition-colors">
                            <Icon icon="solar:mask-h-linear" width="20" />
                        </div>
                        
                        {isMenuOpen && (
                            <div className="absolute z-50 top-[110%] left-0 w-full bg-stone-900 border border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="px-3 py-1 text-[11px] text-stone-600 font-bold">Suggestions</div>
                                {filteredIcons.map((icon, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => {
                                            setTechInput(icon);
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2.5 text-sm text-stone-400 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-3 cursor-pointer"
                                    >
                                        <Icon icon={icon} className="text-lg" />
                                        <span>{icon}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button 
                        type="button" 
                        onClick={handleAddTech} 
                        className="bg-additional/10 text-additional hover:bg-additional/20 px-6 rounded-xl transition-all font-bold text-sm border border-additional/10 active:scale-95 cursor-pointer"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Selected Techs Chips */}
            {currentTechs.length > 0 && (
                <div className="flex flex-wrap gap-2.5 p-4 bg-stone-800/20 rounded-2xl border border-white/5 min-h-[60px]">
                    {currentTechs.map((t, i) => (
                        <div 
                            key={i} 
                            className="flex items-center gap-2.5 bg-stone-900 border border-white/10 pl-3 pr-2 py-2 rounded-xl text-[13px] font-medium hover:border-additional/30 transition-colors group animate-in zoom-in duration-200"
                        >
                            <Icon icon={t.icon} className="text-xl" />
                            <span className="text-stone-300 group-hover:text-white transition-colors">{t.icon.split(':').pop()}</span>
                            <button 
                                type="button" 
                                onClick={() => removeTech(i)} 
                                className="w-6 h-6 flex items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all ml-1 cursor-pointer"
                            >
                                <Icon icon="solar:close-circle-bold" width="16" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
