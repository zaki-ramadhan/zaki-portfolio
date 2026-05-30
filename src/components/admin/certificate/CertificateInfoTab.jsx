/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify-icon/react";
import ComboInput from "../inputs/ComboInput";

const CertificateInfoTab = ({ formData, onInputChange, errors, isUrl, suggestions, certSuggestions }) => {
    const [tagInput, setTagInput] = useState("");
    const [isSkillOpen, setIsSkillOpen] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);
    const skillDropdownRef = useRef(null);

    const allSkillSuggestions = certSuggestions?.skills || [];

    const filteredSkills = allSkillSuggestions.filter(s =>
        s.toLowerCase().includes(tagInput.toLowerCase()) &&
        !(formData.skills || []).includes(s)
    );
    const exactMatch = allSkillSuggestions.find(s => s.toLowerCase() === tagInput.trim().toLowerCase());
    const isDuplicate = (formData.skills || []).some(s => s.toLowerCase() === tagInput.trim().toLowerCase());
    const showCreate = tagInput.trim().length > 0 && !exactMatch && !isDuplicate;
    const totalItems = (showCreate ? 1 : 0) + filteredSkills.length;

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (skillDropdownRef.current && !skillDropdownRef.current.contains(e.target)) {
                setIsSkillOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const addSkill = (value) => {
        const trimmed = value?.trim().replace(/,$/, "");
        if (!trimmed || (formData.skills || []).includes(trimmed)) return;
        onInputChange({ target: { name: "skills", value: [...formData.skills, trimmed] } });
        setTagInput("");
        setIsSkillOpen(false);
    };

    const removeSkill = (index) => {
        onInputChange({ target: { name: "skills", value: (formData.skills || []).filter((_, i) => i !== index) } });
    };

    const handleKeyDown = (e) => {
        if (!isSkillOpen) {
            if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addSkill(tagInput); }
            return;
        }
        if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx(p => Math.min(p + 1, totalItems - 1)); }
        else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx(p => Math.max(p - 1, 0)); }
        else if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            if (showCreate && activeIdx === 0) addSkill(tagInput);
            else {
                const idx = showCreate ? activeIdx - 1 : activeIdx;
                if (filteredSkills[idx]) addSkill(filteredSkills[idx]);
            }
        } else if (e.key === "Escape") { setIsSkillOpen(false); }
    };

    return (
        <div className="space-y-5 animate-in slide-in-from-left duration-300">
            {/* Title */}
            <div className="space-y-2">
                <label className="text-sm text-stone-400 font-semibold ml-1">
                    Certificate Title<span className="text-red-500">*</span>
                </label>
                <input
                    name="title"
                    value={formData.title || ''}
                    onChange={onInputChange}
                    className={`w-full bg-stone-800/40 rounded-xl p-3.5 border focus:ring-4 outline-none transition-all text-sm ${
                        errors.title ? 'border-red-500/50 ring-red-500/10 animate-shake' : 'border-white/10 focus:border-additional/30 focus:ring-additional/5'
                    }`}
                    placeholder="e.g. React Web Developer"
                />
            </div>

            {/* Organizer + Year */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm text-stone-400 font-semibold ml-1">Organizer</label>
                    <input
                        name="issuer"
                        value={formData.issuer || ''}
                        onChange={onInputChange}
                        className="w-full bg-stone-800/40 rounded-xl p-3.5 border border-white/10 outline-none text-sm focus:border-additional/30 focus:ring-4 focus:ring-additional/5 transition-all"
                        placeholder="e.g. Dicoding"
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-sm text-stone-400 font-semibold">Year<span className="text-red-500">*</span></label>
                        {formData.date && (
                            <span className={`text-xs font-bold ${(formData.date >= 2000 && formData.date <= 2100) ? 'text-emerald-500' : 'text-red-500'}`}>
                                {(formData.date >= 2000 && formData.date <= 2100) ? '✓ Valid' : '⚠ Min 2000'}
                            </span>
                        )}
                    </div>
                    <input
                        name="date"
                        type="number"
                        min="2000"
                        max="2100"
                        value={formData.date || ''}
                        onChange={onInputChange}
                        className={`w-full bg-stone-800/40 rounded-xl p-3.5 border focus:ring-4 outline-none transition-all text-sm [appearance:textfield] ${
                            formData.date && (formData.date < 2000 || formData.date > 2100)
                                ? 'border-red-500/30 focus:border-red-500/50 focus:ring-red-500/5'
                                : 'border-white/10 focus:border-additional/30 focus:ring-additional/5'
                        }`}
                        placeholder="e.g. 2024"
                    />
                </div>
            </div>

            {/* Validity Period (optional) */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 ml-1">
                    <label className="text-sm text-stone-400 font-semibold">Validity Period</label>
                    <span className="text-[11px] font-bold text-stone-600 bg-stone-800 px-2 py-0.5 rounded-lg">Optional</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <input
                        name="validFrom"
                        type="number"
                        min="2000"
                        max="2100"
                        value={formData.validFrom || ''}
                        onChange={onInputChange}
                        className="w-full bg-stone-800/40 rounded-xl p-3.5 border border-white/10 outline-none text-sm [appearance:textfield] focus:border-additional/30 focus:ring-4 focus:ring-additional/5 transition-all"
                        placeholder="From (e.g. 2024)"
                    />
                    <input
                        name="validUntil"
                        type="number"
                        min="2000"
                        max="2200"
                        value={formData.validUntil || ''}
                        onChange={onInputChange}
                        className="w-full bg-stone-800/40 rounded-xl p-3.5 border border-white/10 outline-none text-sm [appearance:textfield] focus:border-additional/30 focus:ring-4 focus:ring-additional/5 transition-all"
                        placeholder="Until (e.g. 2027)"
                    />
                </div>
            </div>

            {/* Credential ID (optional) */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 ml-1">
                    <label className="text-sm text-stone-400 font-semibold">Credential ID</label>
                    <span className="text-[11px] font-bold text-stone-600 bg-stone-800 px-2 py-0.5 rounded-lg">Optional</span>
                </div>
                <input
                    name="credentialId"
                    value={formData.credentialId || ''}
                    onChange={onInputChange}
                    className="w-full bg-stone-800/40 rounded-xl p-3.5 border border-white/10 outline-none focus:border-additional/30 focus:ring-4 focus:ring-additional/5 transition-all text-sm font-mono"
                    placeholder="e.g. ABCD1234 or leave blank"
                />
            </div>

            {/* Credential Link */}
            <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                    <label className="text-sm text-stone-400 font-semibold">Credential URL</label>
                    {formData.credentialUrl && (
                        <span className={`text-[12px] font-bold ${isUrl(formData.credentialUrl) ? 'text-emerald-500' : 'text-red-500'}`}>
                            {isUrl(formData.credentialUrl) ? '✓ Valid' : '⚠ Plain Text'}
                        </span>
                    )}
                </div>
                <input
                    name="credentialUrl"
                    value={formData.credentialUrl || ''}
                    onChange={onInputChange}
                    className={`w-full bg-stone-800/40 rounded-xl p-3.5 border focus:ring-4 outline-none transition-all text-sm ${
                        formData.credentialUrl && !isUrl(formData.credentialUrl)
                            ? 'border-red-500/30 focus:border-red-500/50 focus:ring-red-500/5'
                            : 'border-white/10 focus:border-additional/30 focus:ring-additional/5'
                    }`}
                    placeholder="https://..."
                />
            </div>

            {/* Category */}
            <ComboInput
                label="Category"
                name="category"
                value={formData.category || ''}
                onChange={onInputChange}
                options={certSuggestions?.categories?.length ? certSuggestions.categories : (suggestions.categories || ["Frontend", "Backend", "Cloud", "Tools", "Fundamental"])}
                placeholder="e.g. Frontend"
                required
                error={errors.category}
            />

            {/* Skills / Topics */}
            <div className="space-y-2 relative" ref={skillDropdownRef}>
                <div className="flex justify-between items-center px-1">
                    <label className="text-sm text-stone-400 font-semibold">Skills / Topics</label>
                    {isDuplicate && (
                        <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                            <Icon icon="solar:danger-triangle-bold" width="12" /> Already added
                        </span>
                    )}
                    {!isDuplicate && tagInput.trim() && !showCreate && (
                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                            <Icon icon="solar:check-circle-bold" width="12" /> Exists
                        </span>
                    )}
                </div>

                <div className="relative">
                    <input
                        value={tagInput}
                        onChange={(e) => { setTagInput(e.target.value); setIsSkillOpen(true); setActiveIdx(0); }}
                        onFocus={() => setIsSkillOpen(true)}
                        onKeyDown={handleKeyDown}
                        className={`w-full bg-stone-900 rounded-xl p-3.5 pr-10 border outline-none transition-all text-sm ${
                            isDuplicate
                                ? 'border-amber-500/40 ring-4 ring-amber-500/10'
                                : 'border-white/10 focus:border-additional/40 focus:ring-4 focus:ring-additional/5'
                        }`}
                        placeholder="Type skill and press Enter…"
                        autoComplete="off"
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-600">
                        <Icon icon="solar:tag-linear" width="18" />
                    </div>

                    {isSkillOpen && (showCreate || filteredSkills.length > 0) && (
                        <div className="absolute z-50 top-[110%] left-0 w-full bg-stone-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                            <div className="max-h-52 overflow-y-auto scrollbar-hide">
                                {showCreate && (
                                    <button
                                        type="button"
                                        onClick={() => addSkill(tagInput)}
                                        onMouseEnter={() => setActiveIdx(0)}
                                        className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors cursor-pointer ${activeIdx === 0 ? 'bg-additional/10 text-additional' : 'text-stone-300'}`}
                                    >
                                        <Icon icon="solar:add-circle-linear" className="text-additional shrink-0" width="18" />
                                        <div className="flex flex-col">
                                            <span className="font-semibold">Create: &quot;{tagInput.trim()}&quot;</span>
                                            <span className="text-[11px] opacity-60">Add as new skill</span>
                                        </div>
                                    </button>
                                )}
                                {filteredSkills.length > 0 && (
                                    <>
                                        <div className="px-4 py-2 text-[11px] text-stone-600 font-bold bg-stone-950/50 border-y border-white/5">
                                            Previously used
                                        </div>
                                        {filteredSkills.map((skill, idx) => {
                                            const displayIdx = showCreate ? idx + 1 : idx;
                                            return (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => addSkill(skill)}
                                                    onMouseEnter={() => setActiveIdx(displayIdx)}
                                                    className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between transition-colors cursor-pointer ${displayIdx === activeIdx ? 'bg-white/5 text-white' : 'text-stone-400'}`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Icon icon="solar:history-linear" width="16" className="opacity-40" />
                                                        <span className="font-semibold">{skill}</span>
                                                    </div>
                                                    {formData.skills.includes(skill) && (
                                                        <Icon icon="solar:check-read-linear" width="18" className="text-emerald-500" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {(formData.skills || []).length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                        {formData.skills.map((skill, i) => (
                            <span
                                key={i}
                                className="flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl bg-stone-800 border border-white/5 text-stone-300 animate-in zoom-in duration-200"
                            >
                                {skill}
                                <button
                                    type="button"
                                    onClick={() => removeSkill(i)}
                                    className="text-stone-500 hover:text-red-400 transition-colors mt-0.5"
                                >
                                    <Icon icon="solar:close-circle-bold" width="14" />
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CertificateInfoTab;
