/* eslint-disable react/prop-types */
import { useState } from "react";
import { Icon } from "@iconify-icon/react";
import { IconSelector } from "../inputs/IconSelector";

const DEFAULT_PRESETS = [
    { name: "Midnight", colors: { bgColor: "from-stone-900 to-black", titleColor: "text-white", overlayColor: "from-black to-transparent" } },
    { name: "Luxury Gold", colors: { bgColor: "from-amber-900 to-stone-950", titleColor: "text-amber-200", overlayColor: "from-stone-950 to-transparent" } },
    { name: "Frozen Deep", colors: { bgColor: "from-indigo-950 to-stone-950", titleColor: "text-indigo-200", overlayColor: "from-stone-950 to-transparent" } },
    { name: "Cyberpunk", colors: { bgColor: "from-fuchsia-900 to-stone-950", titleColor: "text-fuchsia-300", overlayColor: "from-stone-950 to-transparent" } },
    { name: "Emerald", colors: { bgColor: "from-emerald-900 to-stone-950", titleColor: "text-emerald-300", overlayColor: "from-stone-950 to-transparent" } },
    { name: "Oceanic", colors: { bgColor: "from-blue-900 to-stone-950", titleColor: "text-blue-300", overlayColor: "from-stone-950 to-transparent" } },
    { name: "Crimson", colors: { bgColor: "from-red-900 to-stone-950", titleColor: "text-red-300", overlayColor: "from-stone-950 to-transparent" } },
    { name: "Amethyst", colors: { bgColor: "from-violet-900 to-stone-950", titleColor: "text-violet-300", overlayColor: "from-stone-950 to-transparent" } },
    { name: "Slate Calm", colors: { bgColor: "from-slate-800 to-slate-950", titleColor: "text-slate-100", overlayColor: "from-slate-950/80 to-transparent" } },
    { name: "Forest", colors: { bgColor: "from-green-950 to-black", titleColor: "text-green-400", overlayColor: "from-black to-transparent" } },
    { name: "Sunset", colors: { bgColor: "from-orange-950 to-stone-950", titleColor: "text-orange-300", overlayColor: "from-stone-950 to-transparent" } },
    { name: "Metallic", colors: { bgColor: "from-stone-700 to-stone-900", titleColor: "text-stone-100", overlayColor: "from-stone-900 to-transparent" } },
    { name: "Rose Wine", colors: { bgColor: "from-rose-900 to-stone-950", titleColor: "text-rose-200", overlayColor: "from-stone-950 to-transparent" } },
    { name: "Neon Cyan", colors: { bgColor: "from-cyan-900 to-stone-950", titleColor: "text-cyan-200", overlayColor: "from-stone-950 to-transparent" } },
    { name: "Earth", colors: { bgColor: "from-orange-900 to-stone-950", titleColor: "text-amber-100", overlayColor: "from-stone-950 to-transparent" } },
    { name: "Teal Deep", colors: { bgColor: "from-teal-900 to-stone-950", titleColor: "text-teal-200", overlayColor: "from-stone-950 to-transparent" } },
    { name: "Charcoal", colors: { bgColor: "from-zinc-900 to-black", titleColor: "text-zinc-100", overlayColor: "from-black to-transparent" } },
    { name: "Electric", colors: { bgColor: "from-blue-800 to-black", titleColor: "text-blue-200", overlayColor: "from-black to-transparent" } },
    { name: "Volcanic", colors: { bgColor: "from-red-950 to-black", titleColor: "text-red-400", overlayColor: "from-black to-transparent" } },
    { name: "Sky High", colors: { bgColor: "from-sky-900 to-stone-950", titleColor: "text-sky-200", overlayColor: "from-stone-100/10 to-transparent" } },
    { name: "Mizu", colors: { bgColor: "from-blue-400 to-stone-950", titleColor: "text-blue-100", overlayColor: "from-stone-100/10 to-transparent" } },
    { name: "Sakura", colors: { bgColor: "from-pink-900 to-stone-950", titleColor: "text-pink-100", overlayColor: "from-stone-100/10 to-transparent" } },
    { name: "Matcha", colors: { bgColor: "from-lime-900 to-stone-950", titleColor: "text-lime-100", overlayColor: "from-stone-100/10 to-transparent" } }
];

const DesignTab = ({ 
    formData, 
    onInputChange, 
    localHandleChange, 
    suggestions, 
    techInput, 
    setTechInput, 
    techColor, 
    setTechColor, 
    handleAddTech, 
    removeTech, 
    errors 
}) => {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const isCustomStyle = !(
        DEFAULT_PRESETS.some(p => JSON.stringify(p.colors) === JSON.stringify(formData.colors)) ||
        suggestions.colorPresets?.some(p => JSON.stringify(p) === JSON.stringify(formData.colors))
    );

    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
            {isCustomStyle && (
                <div className="space-y-4 animate-in slide-in-from-top duration-300">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-sm text-stone-400 font-bold">Template / Preset Name<span className="text-red-500">*</span></label>
                    </div>
                    <input 
                        name="styleName"
                        value={formData.styleName || ''}
                        onChange={localHandleChange}
                        placeholder="e.g. Modern Pink"
                        className={`w-full bg-stone-950/40 border rounded-xl p-3.5 text-sm outline-none transition-all ${errors.styleName ? 'border-red-500/50 ring-4 ring-red-500/10 animate-shake' : 'border-white/5 focus:border-additional/30'}`}
                    />
                </div>
            )}

            <div className="space-y-3">
                <label className="text-sm text-stone-400 font-bold ml-1">Color Presets</label>
                <div className="grid grid-cols-4 gap-y-6 gap-x-2 pt-2 pb-4 px-1">
                    {/* New Style */}
                    <button
                        type="button"
                        onClick={() => {
                            onInputChange({ target: { name: 'styleName', value: '' } });
                            localHandleChange({ 
                                target: { 
                                    name: 'colors_preset', 
                                    value: { bgColor: "from-stone-800 to-stone-900", titleColor: "text-stone-300", btnColor: "bg-white/5", iconsBgColor: "bg-white/10", overlayColor: "from-stone-900 to-transparent" } 
                                } 
                            });
                        }}
                        className="group flex flex-col items-center gap-2"
                    >
                        <div className={`w-12 h-12 rounded-xl bg-stone-800/40 border-2 border-dashed flex items-center justify-center transition-all group-hover:border-additional/50 ${formData.colors.bgColor === "from-stone-800 to-stone-900" ? 'ring-2 ring-emerald-500 border-transparent' : 'border-white/10'}`}>
                            <Icon icon="solar:add-circle-bold" className="text-stone-600 group-hover:text-additional" width="20" />
                        </div>
                        <span className="text-xs font-semibold text-stone-600 group-hover:text-stone-400 text-center leading-tight">New Style</span>
                    </button>

                    {/* Presets */}
                    {DEFAULT_PRESETS.map((preset, idx) => (
                        <button
                            key={`p-${idx}`}
                            type="button"
                            onClick={() => {
                                onInputChange({ target: { name: 'styleName', value: preset.name } });
                                localHandleChange({ target: { name: 'colors_preset', value: preset.colors } });
                            }}
                            className="group flex flex-col items-center gap-2"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${preset.colors.bgColor} border border-white/10 flex items-center justify-center transition-all ${JSON.stringify(formData.colors) === JSON.stringify(preset.colors) ? 'ring-2 ring-emerald-500' : ''}`}>
                                <div className={`w-2.5 h-2.5 rounded-full ${preset.colors.titleColor.replace('text-', 'bg-')}`} />
                            </div>
                            <span className={`text-[11px] font-semibold text-center leading-tight transition-colors ${JSON.stringify(formData.colors) === JSON.stringify(preset.colors) ? 'text-white' : 'text-stone-600 group-hover:text-stone-400'}`}>
                                {preset.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <button 
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-[12px] font-bold text-stone-500 hover:text-white transition-colors"
            >
                <Icon icon={showAdvanced ? 'solar:eye-closed-bold' : 'solar:eye-bold'} width="16" />
                {showAdvanced ? 'Hide CSS Classes' : 'Show CSS Classes'}
            </button>

            {showAdvanced && (
                <div className="grid grid-cols-1 gap-4 animate-in slide-in-from-top duration-300">
                    <div className="space-y-2">
                        <label className="text-[11px] text-stone-500 uppercase font-black ml-1">BG Classes</label>
                        <input name="colors.bgColor" value={formData.colors.bgColor} onChange={localHandleChange} className="w-full bg-stone-950 rounded-xl p-3 text-xs font-mono text-stone-400 border border-white/5 outline-none focus:border-additional/30 transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] text-stone-500 uppercase font-black ml-1">Title Class</label>
                        <input name="colors.titleColor" value={formData.colors.titleColor} onChange={localHandleChange} className="w-full bg-stone-950 rounded-xl p-3 text-xs font-mono text-stone-400 border border-white/5 outline-none focus:border-additional/30 transition-all" />
                    </div>
                </div>
            )}

            <div className="pt-4 border-t border-white/5">
                <IconSelector 
                    techInput={techInput}
                    setTechInput={setTechInput}
                    techColor={techColor}
                    setTechColor={setTechColor}
                    handleAddTech={handleAddTech}
                    usedIcons={suggestions.icons}
                    currentTechs={formData.techs}
                    removeTech={removeTech}
                />
            </div>
        </div>
    );
};

export default DesignTab;
