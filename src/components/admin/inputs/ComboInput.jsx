/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify-icon/react";

const ComboInput = ({ label, name, value, onChange, options = [], placeholder, required, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value || "");
    const [activeIndex, setActiveIndex] = useState(0);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setInputValue(value || "");
    }, [value]);

    const exactMatch = options.find(opt => typeof opt === 'string' && opt.toLowerCase() === inputValue?.toLowerCase());
    const showCreateOption = inputValue && !exactMatch;
    const isConfirmed = value && inputValue === value;
    const isPending = inputValue && inputValue !== value;

    useEffect(() => {
        const filtered = options.filter(opt =>
            typeof opt === 'string' && opt.toLowerCase().includes(inputValue?.toLowerCase() || "")
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
                <label className="text-sm text-stone-400 font-semibold ml-1 flex items-center gap-1">
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
                    <Icon icon={isConfirmed ? "solar:check-circle-bold" : (isPending ? "solar:pen-new-square-linear" : "solar:pen-new-square-linear")} className={isConfirmed ? "text-emerald-500" : (isPending ? "text-blue-400 animate-pulse" : "text-stone-600")} width="18" />
                </div>
            </div>

            {isOpen && inputValue.trim().length > 0 && (
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
                                    <span className="text-[10px] opacity-60 font-medium tracking-tight">Confirmed new custom value</span>
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
                                                <Icon icon="solar:history-linear" width="18" className="opacity-40 group-hover:text-additional transition-colors" />
                                                <span className="font-bold tracking-tight">{opt}</span>
                                            </div>
                                            {value === opt && <Icon icon="solar:check-read-linear" width="20" className="text-emerald-500" />}
                                        </button>
                                    );
                                })}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ComboInput;
