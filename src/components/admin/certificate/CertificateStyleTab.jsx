/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify-icon/react";

const DEFAULT_ICON = "solar:globe-broken";

const CertificateStyleTab = ({ formData, onInputChange, usedIcons = [] }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [filteredIcons, setFilteredIcons] = useState([]);
    const dropdownRef = useRef(null);

    const iconValue = formData.issuerLogo || "";
    const liveIcon = iconValue.trim() || DEFAULT_ICON;
    const isValidIcon = liveIcon.includes(":");

    useEffect(() => {
        if (iconValue.length > 0) {
            const filtered = usedIcons.filter(icon =>
                icon.toLowerCase().includes(iconValue.toLowerCase())
            );
            setFilteredIcons(filtered);
            setIsMenuOpen(filtered.length > 0);
        } else {
            setFilteredIcons(usedIcons.slice(0, 5));
            setIsMenuOpen(false);
        }
    }, [iconValue, usedIcons]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleClear = () => onInputChange({ target: { name: "issuerLogo", value: "" } });
    const handleSelect = (icon) => {
        onInputChange({ target: { name: "issuerLogo", value: icon } });
        setIsMenuOpen(false);
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
            {/* Theme Color */}
            <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                    <label className="text-sm text-stone-400 font-bold">Theme Color</label>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border border-white/10" style={{ backgroundColor: formData.color }} />
                        <span className="text-xs font-mono text-stone-500 uppercase">{formData.color}</span>
                    </div>
                </div>
                <input
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={onInputChange}
                    className="w-full h-12 rounded-xl bg-stone-800 border border-white/10 cursor-pointer overflow-hidden p-0"
                />
            </div>

            {/* Certificate Icon */}
            <div className="space-y-3 pt-4 border-t border-white/5" ref={dropdownRef}>
                {/* Header */}
                <div className="flex justify-between items-center px-1">
                    <label className="text-sm text-stone-400 font-bold">Certificate Icon</label>
                    <a
                        href="https://icon-sets.iconify.design"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-additional/60 hover:text-additional transition-colors flex items-center gap-1 font-bold"
                    >
                        Browse Icons <Icon icon="solar:arrow-right-up-linear" width="13" />
                    </a>
                </div>

                {/* Preview + Input row */}
                <div className="flex gap-3 items-center">
                    {/* Live preview box */}
                    <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/5 shrink-0 transition-all duration-300"
                        style={{ backgroundColor: `${formData.color}22` }}
                    >
                        {isValidIcon
                            ? <Icon icon={liveIcon} width="26" style={{ color: formData.color }} />
                            : <Icon icon={DEFAULT_ICON} width="26" style={{ color: formData.color }} />
                        }
                    </div>

                    {/* Input */}
                    <div className="relative flex-1 group">
                        <input
                            name="issuerLogo"
                            value={iconValue}
                            onChange={(e) => {
                                onInputChange({ target: { name: "issuerLogo", value: e.target.value } });
                                setIsMenuOpen(true);
                            }}
                            onFocus={() => setIsMenuOpen(filteredIcons.length > 0)}
                            placeholder="e.g. logos:react"
                            className="w-full bg-stone-900 rounded-xl p-3.5 pr-10 border border-white/10 outline-none focus:border-additional/40 focus:ring-4 focus:ring-additional/5 transition-all text-sm font-mono placeholder:font-sans placeholder:text-stone-600"
                            autoComplete="off"
                            spellCheck={false}
                        />
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-additional transition-colors">
                            {iconValue
                                ? <button type="button" onClick={handleClear} className="text-stone-500 hover:text-red-400 transition-colors cursor-pointer">
                                    <Icon icon="solar:close-circle-bold" width="18" />
                                </button>
                                : <Icon icon="solar:mask-h-linear" width="18" />
                            }
                        </div>

                        {/* Suggestions dropdown */}
                        {isMenuOpen && (
                            <div className="absolute z-50 top-[110%] left-0 w-full bg-stone-900 border border-white/10 rounded-2xl shadow-2xl py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="px-3 py-1 text-[11px] text-stone-600 font-bold">Suggestions</div>
                                {filteredIcons.map((icon, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => handleSelect(icon)}
                                        className="w-full text-left px-4 py-2.5 text-sm text-stone-400 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-3 cursor-pointer"
                                    >
                                        <Icon icon={icon} className="text-lg" />
                                        <span className="font-mono text-xs">{icon}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed px-1">
                    Leave blank to use the default <span className="font-mono">globe</span> icon with theme color.
                </p>
            </div>
        </div>
    );
};

export default CertificateStyleTab;
