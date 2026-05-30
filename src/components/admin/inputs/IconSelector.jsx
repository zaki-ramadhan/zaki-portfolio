/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify-icon/react";

const SOLID_COLORS = [
    { name: 'White', hex: '#FFFFFF' }, { name: 'Pure Black', hex: '#000000' },
    { name: 'HTML / Red', hex: '#E34F26' }, { name: 'CSS / Blue', hex: '#1572B6' },
    { name: 'JS / Yellow', hex: '#F7DF1E' }, { name: 'TS / Blue', hex: '#3178C6' },
    { name: 'React / Cyan', hex: '#61DAFB' }, { name: 'Vue / Green', hex: '#42D392' },
    { name: 'Angular / Red', hex: '#DD0031' }, { name: 'Svelte / Orange', hex: '#FF3E00' },
    { name: 'PHP / Purple', hex: '#777BB4' }, { name: 'Laravel / Red', hex: '#FF2D20' },
    { name: 'Node / Green', hex: '#339933' }, { name: 'Python / Blue', hex: '#3776AB' },
    { name: 'Python / Yellow', hex: '#FFD43B' }, { name: 'Go / Cyan', hex: '#00ADD8' },
    { name: 'Rust / Orange', hex: '#DEA584' }, { name: 'Ruby / Red', hex: '#CC342D' },
    { name: 'Swift / Orange', hex: '#F05138' }, { name: 'Kotlin / Purple', hex: '#7F52FF' },
    { name: 'Tailwind / Cyan', hex: '#06B6D4' }, { name: 'Bootstrap / Purple', hex: '#7952B3' },
    { name: 'Firebase / Yellow', hex: '#FFCA28' }, { name: 'Supabase / Green', hex: '#3ECF8E' },
    { name: 'MySQL / Blue', hex: '#4479A1' }, { name: 'PostgreSQL / Blue', hex: '#4169E1' },
    { name: 'MongoDB / Green', hex: '#47A248' }, { name: 'Redis / Red', hex: '#DC382D' },
    { name: 'Docker / Blue', hex: '#2496ED' }, { name: 'Nginx / Green', hex: '#009639' },
    { name: 'Git / Orange', hex: '#F05032' }, { name: 'Vite / Purple', hex: '#646CFF' },
    { name: 'Linux / Yellow', hex: '#FCC624' }, { name: 'Next.js / White', hex: '#FFFFFE' },
    { name: 'Nuxt / Green', hex: '#00C58E' }, { name: 'Wordpress / Blue', hex: '#21759B' },
    { name: 'Sass / Pink', hex: '#CC6699' }, { name: 'MUI / Blue', hex: '#007FFF' },
    { name: 'Figma / Purple', hex: '#A259FF' }, { name: 'Figma / Green', hex: '#0ACF83' },
    { name: 'Figma / Blue', hex: '#1ABCFE' }
];

export const IconSelector = ({ techInput, setTechInput, techColor, setTechColor, handleAddTech, usedIcons = [], currentTechs = [], removeTech }) => {
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
            const available = usedIcons.filter(icon => !currentTechs.some(t => t.icon === icon));
            setFilteredIcons(available.slice(0, 5));
            setIsMenuOpen(false);
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
            <div className="space-y-4 relative" ref={dropdownRef}>
                <div className="flex justify-between items-center px-1">
                    <label className="text-sm text-stone-400 font-semibold ml-1">Tech Stack & Icon Styling</label>
                    <a 
                        href="https://icon-sets.iconify.design/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-additional/60 hover:text-additional transition-colors flex items-center gap-1.5 font-bold cursor-pointer"
                    >
                        Browse Icons <Icon icon="solar:arrow-right-up-linear" width="14" />
                    </a>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                        <div className="relative flex-1 group">
                            <input 
                                value={techInput} 
                                onChange={(e) => setTechInput(e.target.value)} 
                                onFocus={() => setIsMenuOpen(filteredIcons.length > 0)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && techInput.includes(':')) {
                                        e.preventDefault();
                                        handleAddTech(techInput, techColor);
                                        setIsMenuOpen(false);
                                    }
                                }}
                                placeholder="Type icon (e.g. logos:react)" 
                                className="w-full bg-stone-900 rounded-xl p-3.5 pr-11 border border-white/10 outline-none focus:border-additional/40 focus:ring-4 focus:ring-additional/5 transition-all text-sm" 
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
                            disabled={!techInput?.includes(':')}
                            onClick={() => handleAddTech(techInput, techColor)} 
                            className="bg-additional/10 text-additional hover:bg-additional/20 px-6 rounded-xl transition-all font-bold text-sm border border-additional/10 active:scale-95 cursor-pointer disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed"
                        >
                            Add
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2.5 px-1 py-2">
                        {SOLID_COLORS.map((color, idx) => (
                            <button
                                key={`${color.hex}-${idx}`}
                                type="button"
                                onClick={() => setTechColor(color.hex)}
                                className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center p-1 ${techColor === color.hex ? 'border-additional scale-125 z-10' : 'border-white/5'}`}
                                style={{ backgroundColor: color.hex }}
                            >
                                {techColor === color.hex && <Icon icon="solar:check-circle-bold" className={color.hex === '#FFFFFF' ? 'text-black' : 'text-white'} width="14" />}
                            </button>
                        ))}
                        <div className="flex items-center gap-3 ml-auto pl-4 border-l border-white/5">
                           <input type="color" value={techColor} onChange={(e) => setTechColor(e.target.value)} className="w-10 h-10 rounded-xl bg-stone-800 border border-white/10 cursor-pointer overflow-hidden p-0" />
                           <div className="flex flex-col">
                               <span className="text-[11px] text-stone-600 font-bold uppercase tracking-wider">Custom Hex</span>
                               <span className="text-xs font-mono text-stone-400 font-bold uppercase">{techColor}</span>
                           </div>
                        </div>
                    </div>
                </div>
            </div>

            {currentTechs.length > 0 && (
                <div className="flex flex-wrap gap-2.5 p-4 bg-stone-800/20 rounded-2xl border border-white/5 min-h-[60px]">
                    {currentTechs.map((t, i) => (
                        <div key={i} className="flex items-center gap-2.5 bg-stone-900 border border-white/10 pl-3 pr-2 py-2 rounded-xl text-[13px] font-medium hover:border-additional/30 transition-colors group animate-in zoom-in duration-200">
                            <Icon icon={t.icon} className="text-xl" style={{ color: t.color || '#FFFFFF' }} />
                            <span className="text-stone-300 group-hover:text-white transition-colors">{t.label || t.name || t.icon.split(':').pop()}</span>
                            <button type="button" onClick={() => removeTech(i)} className="w-6 h-6 flex items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all ml-1 cursor-pointer">
                                <Icon icon="solar:close-circle-bold" width="16" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
