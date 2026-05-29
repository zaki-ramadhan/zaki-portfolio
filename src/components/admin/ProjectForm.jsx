/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify-icon/react";
import { ComboInput, IconSelector } from "./CustomInputs";

const ProjectForm = ({ 
    formData,
    onInputChange,
    handleSubmit,
    uploading,
    techInput,
    setTechInput,
    handleAddTech,
    removeTech,
    setImageFile,
    imageFile,
    suggestions,
    errors = {}
}) => {
    const fileInputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Handle Image Preview
    useEffect(() => {
        if (!imageFile) {
            setPreviewUrl(null);
            return;
        }
        const url = URL.createObjectURL(imageFile);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [imageFile]);

    // Simple URL Validation
    const isUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    };

    const [activeTab, setActiveTab] = useState("content");
    const [showAdvanced, setShowAdvanced] = useState(false);

    const localHandleChange = (e) => {
        const { name, value } = e.target;
        if (name === "colors_preset") {
            onInputChange({ target: { name: 'colors_preset', value } });
        } else {
            onInputChange(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-stone-900/50 backdrop-blur-xl p-0 overflow-hidden rounded-3xl border border-white/10 sticky top-8 animate-in fade-in duration-500 flex flex-col min-h-[600px]">
            {/* Header / Tabs */}
            <div className="p-6 border-b border-white/5 bg-stone-900/30">
                <h2 className="text-xl font-semibold mb-6 text-stone-200">
                    {formData.id ? 'Edit Project' : 'Add New Project'}
                </h2>
                
                <div className="flex p-1 bg-black/40 rounded-2xl w-full">
                    {[
                        { id: 'content', icon: 'solar:document-text-bold', label: 'Content' },
                        { id: 'media', icon: 'solar:gallery-wide-bold', label: 'Media' },
                        { id: 'design', icon: 'solar:palette-bold', label: 'Design' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                                activeTab === tab.id 
                                ? 'bg-stone-800 text-white shadow-lg ring-1 ring-white/10' 
                                : 'text-stone-500 hover:text-stone-300'
                            }`}
                        >
                            <Icon icon={tab.icon} width="18" />
                            <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Form Content Area */}
            <div className="p-6 flex-1 overflow-y-auto scrollbar-none space-y-6">
                {/* TAB 1: CONTENT */}
                {activeTab === 'content' && (
                    <div className="space-y-6 animate-in slide-in-from-left duration-300">
                        <div className="space-y-2">
                            <label className="text-sm text-stone-400 font-semibold ml-1">
                                Project Name<span className="text-red-500">*</span>
                            </label>
                            <input 
                                name="name" 
                                value={formData.name} 
                                onChange={localHandleChange} 
                                className={`w-full bg-stone-800/40 rounded-xl p-3.5 border focus:ring-4 outline-none transition-all text-sm ${
                                    errors.name 
                                    ? 'border-red-500/50 ring-red-500/10 animate-shake' 
                                    : 'border-white/10 focus:border-additional/30 focus:ring-additional/5'
                                }`} 
                                placeholder="e.g. My Awesome App"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-stone-400 font-semibold ml-1">
                                Description<span className="text-red-500">*</span>
                            </label>
                            <textarea 
                                name="desc" 
                                value={formData.desc} 
                                onChange={localHandleChange} 
                                className={`w-full bg-stone-800/40 rounded-xl p-3.5 border focus:ring-4 outline-none h-32 resize-none transition-all placeholder:text-stone-600 text-sm ${
                                    errors.desc 
                                    ? 'border-red-500/50 ring-red-500/10 animate-shake' 
                                    : 'border-white/10 focus:border-additional/30 focus:ring-additional/5'
                                }`} 
                                placeholder="Enter project description or i18n key..."
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-sm text-stone-400 font-semibold">
                                    Project Link<span className="text-red-500">*</span>
                                </label>
                                {formData.link && (
                                    <span className={`text-[12px] font-bold ${isUrl(formData.link) ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {isUrl(formData.link) ? '✓ Valid' : '⚠ Plain Text'}
                                    </span>
                                )}
                            </div>
                            <input 
                                name="link" 
                                value={formData.link} 
                                onChange={localHandleChange} 
                                className={`w-full bg-stone-800/40 rounded-xl p-3.5 border focus:ring-4 outline-none transition-all text-sm ${
                                    errors.link 
                                    ? 'border-red-500/50 ring-red-500/10 animate-shake' 
                                    : 'border-white/10 focus:border-additional/30 focus:ring-additional/5'
                                }`} 
                                placeholder="https://..."
                            />
                        </div>

                        <ComboInput 
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={localHandleChange}
                            options={suggestions.statuses}
                            placeholder="..."
                            required
                            error={errors.status}
                        />

                        <ComboInput 
                            label="Category"
                            name="category"
                            value={formData.category}
                            onChange={localHandleChange}
                            options={suggestions.categories}
                            placeholder="..."
                            required
                            error={errors.category}
                        />

                        <div className="flex items-center gap-3 px-1 pt-2">
                            <input 
                                type="checkbox" 
                                id="is_published"
                                name="is_published" 
                                checked={formData.is_published} 
                                onChange={localHandleChange} 
                                className="w-5 h-5 accent-additional cursor-pointer" 
                            />
                            <label htmlFor="is_published" className="text-sm text-stone-300 font-medium cursor-pointer">Published to Live Site</label>
                        </div>
                    </div>
                )}

                {/* TAB 2: MEDIA */}
                {activeTab === 'media' && (
                    <div className="space-y-6 animate-in slide-in-from-right duration-300">
                        <div className={`space-y-2 p-1 rounded-2xl transition-all ${errors.image ? 'bg-red-500/10 ring-4 ring-red-500/5 animate-shake' : ''}`}>
                            <label className="text-sm text-stone-400 font-semibold ml-1">
                                Hero Image<span className="text-red-500">*</span>
                            </label>
                            
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files[0])} 
                                className="hidden" 
                            />

                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="relative group cursor-pointer"
                            >
                                {previewUrl || formData.preview ? (
                                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-lg group-hover:border-additional/30 transition-all">
                                        <img src={previewUrl || formData.preview} className="w-full h-full object-cover" alt="Preview" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-[2px]">
                                            <Icon icon="solar:camera-rotate-bold" className="text-white text-3xl" />
                                            <span className="text-white text-[10px] font-bold uppercase tracking-widest">Replace Image</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-64 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-stone-600 bg-stone-800/20 hover:bg-stone-800/40 hover:border-white/10 transition-all">
                                        <Icon icon="solar:camera-add-broken" width="48" />
                                        <span className="text-sm mt-3 font-semibold">Click to Upload Image</span>
                                        <p className="text-[10px] mt-1 text-stone-500 opacity-60 uppercase tracking-[0.15em]">Recommended: 16:9 aspect ratio</p>
                                    </div>
                                )}

                                {(previewUrl || imageFile) && (
                                    <button 
                                        type="button" 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setImageFile(null);
                                        }}
                                        className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-2xl hover:bg-red-600 transition-colors z-20 active:scale-90"
                                    >
                                        <Icon icon="solar:trash-bin-minimalistic-bold" width="20" />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-2xl flex gap-3 text-emerald-500/80">
                            <Icon icon="solar:info-circle-bold" width="20" className="flex-shrink-0" />
                            <p className="text-[12px] leading-relaxed">
                                Images will be automatically optimized and hosted on Cloudinary for maximum loading speed.
                            </p>
                        </div>
                    </div>
                )}

                {/* TAB 3: DESIGN */}
                {activeTab === 'design' && (
                    <div className="space-y-6 animate-in slide-in-from-right duration-300">
                        {/* Preset Name Input - Only show if it's a "New Style" (not a default or saved preset) */}
                        {!(
                            [
                                { name: "Midnight", colors: { bgColor: "from-stone-900 to-black", titleColor: "text-white", overlayColor: "from-black to-transparent" } },
                                { name: "Luxury Gold", colors: { bgColor: "from-amber-900/60 to-stone-950", titleColor: "text-amber-200", overlayColor: "from-stone-950 to-transparent" } },
                                { name: "Frozen Deep", colors: { bgColor: "from-indigo-950/60 to-stone-950", titleColor: "text-indigo-200", overlayColor: "from-stone-950 to-transparent" } }
                            ].some(p => JSON.stringify(p.colors) === JSON.stringify(formData.colors)) ||
                            suggestions.colorPresets?.some(p => JSON.stringify(p) === JSON.stringify(formData.colors))
                        ) && (
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
                                {/* New Style / Reset */}
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

                                {/* Default Presets */}
                                {[
                                    { name: "Midnight", colors: { bgColor: "from-stone-900 to-black", titleColor: "text-white", overlayColor: "from-black to-transparent" } },
                                    { name: "Luxury Gold", colors: { bgColor: "from-amber-900/60 to-stone-950", titleColor: "text-amber-200", overlayColor: "from-stone-950 to-transparent" } },
                                    { name: "Frozen Deep", colors: { bgColor: "from-indigo-950/60 to-stone-950", titleColor: "text-indigo-200", overlayColor: "from-stone-950 to-transparent" } }
                                ].map((preset, idx) => (
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
                                        <span className={`text-xs font-semibold text-center leading-tight transition-colors ${JSON.stringify(formData.colors) === JSON.stringify(preset.colors) ? 'text-white' : 'text-stone-600 group-hover:text-stone-400'}`}>
                                            {preset.name}
                                        </span>
                                    </button>
                                ))}

                                {/* Saved Presets (from other projects) */}
                                {suggestions.colorPresets?.map((preset, idx) => {
                                    // Extract preset name if it exists in a hypothetical metadata or use index
                                    // For now, suggestions.colorPresets is usually just a list of color objects.
                                    // To simplify, we'll try to find if a saved preset matches a project's styleName.
                                    return (
                                        <button
                                            key={`saved-${idx}`}
                                            type="button"
                                            onClick={() => {
                                                // We try to find the project name that used this preset if possible, or just stay as "Saved"
                                                localHandleChange({ target: { name: 'colors_preset', value: preset } });
                                            }}
                                            className="group flex flex-col items-center gap-2.5"
                                        >
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${preset.bgColor} border border-white/10 flex items-center justify-center transition-all ${JSON.stringify(formData.colors) === JSON.stringify(preset) ? 'ring-2 ring-emerald-500' : ''}`}>
                                                <Icon icon="solar:history-bold" className="text-white/20" width="16" />
                                            </div>
                                            <span className={`text-xs font-semibold text-center leading-tight transition-colors ${JSON.stringify(formData.colors) === JSON.stringify(preset) ? 'text-white' : 'text-stone-600'}`}>
                                                Saved {idx+1}
                                            </span>
                                        </button>
                                    );
                                })}
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
                                    <label className="text-[10px] text-stone-500 uppercase font-black ml-1">BG Classes</label>
                                    <input name="colors.bgColor" value={formData.colors.bgColor} onChange={localHandleChange} className="w-full bg-stone-950 rounded-xl p-3 text-xs font-mono text-stone-400 border border-white/5 outline-none focus:border-additional/30 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-stone-500 uppercase font-black ml-1">Title Class</label>
                                    <input name="colors.titleColor" value={formData.colors.titleColor} onChange={localHandleChange} className="w-full bg-stone-950 rounded-xl p-3 text-xs font-mono text-stone-400 border border-white/5 outline-none focus:border-additional/30 transition-all" />
                                </div>
                            </div>
                        )}

                        <div className="pt-4 border-t border-white/5">
                            <IconSelector 
                                techInput={techInput}
                                setTechInput={setTechInput}
                                handleAddTech={handleAddTech}
                                usedIcons={suggestions.icons}
                                currentTechs={formData.techs}
                                removeTech={removeTech}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-white/5 bg-stone-900/30">
                <button 
                    type="submit" 
                    disabled={uploading} 
                    className={`group relative overflow-hidden w-full py-4 rounded-2xl font-semibold transition-all duration-500 border border-additional/15 ${uploading ? 'cursor-not-allowed bg-stone-800 text-stone-500' : 'bg-stone-950 text-white shadow-2xl hover:border-additional/30 active:scale-95'}`}
                >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                        {uploading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-additional/30 border-t-additional rounded-full animate-spin"></div>
                                <span>Saving...</span>
                            </>
                        ) : (
                            <>
                                <Icon icon="solar:diskette-bold" width="20" />
                                <span>{formData.id ? 'Update Project' : 'Add Project'}</span>
                            </>
                        )}
                    </span>
                    {!uploading && (
                        <div className="absolute inset-0 bg-radial-[at_50%_150%] from-additional/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    )}
                </button>

                {formData.id && (
                    <button 
                        type="button"
                        onClick={() => onInputChange({ target: { name: 'reset_form', value: null } })}
                        className="w-full py-3 mt-2 text-[11px] font-bold text-stone-600 hover:text-red-400 transition-colors"
                    >
                        ⇠ Cancel Edit Mode
                    </button>
                )}
            </div>
        </form>
    );
};

export default ProjectForm;
