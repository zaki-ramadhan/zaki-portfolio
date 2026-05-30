/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify-icon/react";
import { IconSelector, ComboInput } from "./CustomInputs";

const CertificateForm = ({ 
    formData,
    onInputChange,
    handleSubmit,
    uploading,
    techInput,
    setTechInput,
    techColor,
    setTechColor,
    handleAddTech,
    removeTech,
    setCertificateFile,
    certificateFile,
    suggestions,
    errors = {}
}) => {
    const fileInputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Handle File Preview
    useEffect(() => {
        if (!certificateFile) {
            setPreviewUrl(null);
            return;
        }

        if (certificateFile.type.startsWith('image/')) {
            const url = URL.createObjectURL(certificateFile);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else if (certificateFile.type === 'application/pdf') {
            setPreviewUrl(null); // Can't easily preview PDF in <img>
        }
    }, [certificateFile]);

    const activeTabClasses = "bg-stone-800 text-white shadow-lg ring-1 ring-white/10";
    const inactiveTabClasses = "text-stone-500 hover:text-stone-300";

    const [activeTab, setActiveTab] = useState("content");
    
    // Simple URL Validation Helper
    const isUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    };


    return (
        <form onSubmit={handleSubmit} className="bg-stone-900/50 backdrop-blur-xl p-0 overflow-hidden rounded-3xl border border-white/10 lg:sticky top-8 animate-in fade-in duration-500 h-fit">
            {/* Header / Tabs */}
            <div className="p-6 border-b border-white/5 bg-stone-900/30">
                <h2 className="text-xl font-semibold mb-6 text-stone-200">
                    {formData.id ? 'Edit Certificate' : 'Add New Certificate'}
                </h2>
                
                <div className="flex p-1 bg-black/40 rounded-2xl w-full">
                    {[
                        { id: 'content', icon: 'solar:document-text-bold', label: 'Info' },
                        { id: 'file', icon: 'solar:file-bold', label: 'File' },
                        { id: 'styling', icon: 'solar:palette-bold', label: 'Style' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                                activeTab === tab.id ? activeTabClasses : inactiveTabClasses
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
                {activeTab === 'content' && (
                    <div className="space-y-6 animate-in slide-in-from-left duration-300">
                        <div className="space-y-2">
                            <label className="text-sm text-stone-400 font-semibold ml-1">
                                Certificate Title<span className="text-red-500">*</span>
                            </label>
                            <input 
                                name="title" 
                                value={formData.title} 
                                onChange={onInputChange} 
                                className={`w-full bg-stone-800/40 rounded-xl p-3.5 border focus:ring-4 outline-none transition-all text-sm ${
                                    errors.title ? 'border-red-500/50 ring-red-500/10' : 'border-white/10 focus:border-additional/30'
                                }`} 
                                placeholder="e.g. React Web Developer"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-stone-400 font-semibold ml-1">Issuer</label>
                                <input 
                                    name="issuer" 
                                    value={formData.issuer} 
                                    onChange={onInputChange} 
                                    className="w-full bg-stone-800/40 rounded-xl p-3.5 border border-white/10 outline-none text-sm" 
                                    placeholder="e.g. Dicoding"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-sm text-stone-400 font-semibold ml-1">Date</label>
                                    {formData.date && (
                                        <span className={`text-[10px] font-bold ${(formData.date >= 2000 && formData.date <= 2100) ? 'text-emerald-500' : 'text-red-500'}`}>
                                            {(formData.date >= 2000 && formData.date <= 2100) ? '✓ Valid' : '⚠ Min 2000'}
                                        </span>
                                    )}
                                </div>
                                <input 
                                    name="date" 
                                    type="number"
                                    min="2000"
                                    max="2100"
                                    value={formData.date} 
                                    onChange={onInputChange} 
                                    className={`w-full bg-stone-800/40 rounded-xl p-3.5 border focus:ring-4 outline-none transition-all text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                                        formData.date && (formData.date < 2000 || formData.date > 2100)
                                        ? 'border-red-500/30 focus:border-red-500/50 focus:ring-red-500/5'
                                        : 'border-white/10 focus:border-additional/30 focus:ring-additional/5'
                                    }`} 
                                    placeholder="e.g. 2024"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-sm text-stone-400 font-semibold">Credential Link (URL)</label>
                                {formData.credentialUrl && (
                                    <span className={`text-[12px] font-bold ${isUrl(formData.credentialUrl) ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {isUrl(formData.credentialUrl) ? '✓ Valid' : '⚠ Plain Text'}
                                    </span>
                                )}
                            </div>
                            <input 
                                name="credentialUrl" 
                                value={formData.credentialUrl} 
                                onChange={onInputChange} 
                                className={`w-full bg-stone-800/40 rounded-xl p-3.5 border focus:ring-4 outline-none transition-all text-sm ${
                                    formData.credentialUrl && !isUrl(formData.credentialUrl) 
                                    ? 'border-red-500/30 focus:border-red-500/50 focus:ring-red-500/5' 
                                    : 'border-white/10 focus:border-additional/30 focus:ring-additional/5'
                                }`} 
                                placeholder="https://..."
                            />
                        </div>

                        <ComboInput 
                            label="Category"
                            name="category"
                            value={formData.category}
                            onChange={onInputChange}
                            options={suggestions.categories || ["Frontend", "Backend", "Cloud", "Tools", "Fundamental"]}
                            placeholder="e.g. Frontend"
                            required
                            error={errors.category}
                        />
                    </div>
                )}

                {activeTab === 'file' && (
                    <div className="space-y-6 animate-in slide-in-from-right duration-300">
                        <div className={`space-y-2 p-1 rounded-2xl transition-all ${errors.file ? 'bg-red-500/10' : ''}`}>
                            <label className="text-sm text-stone-400 font-semibold ml-1">
                                Certificate File (Image or PDF)<span className="text-red-500">*</span>
                            </label>
                            
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                accept="image/*,application/pdf"
                                onChange={(e) => setCertificateFile(e.target.files[0])} 
                                className="hidden" 
                            />

                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="relative group cursor-pointer"
                            >
                                {certificateFile || formData.fileUrl ? (
                                    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-lg group-hover:border-additional/30 transition-all flex items-center justify-center bg-stone-900">
                                        { (previewUrl || (formData.fileUrl && formData.fileType === 'image')) ? (
                                            <img src={previewUrl || formData.fileUrl} className="w-full h-full object-contain" alt="Preview" />
                                        ) : (
                                            <div className="flex flex-col items-center gap-4 p-6">
                                                <div className="w-20 h-20 rounded-full bg-stone-800 flex items-center justify-center border border-white/5 shadow-inner">
                                                    <Icon icon="solar:file-text-bold" className="text-additional" width="40" />
                                                </div>
                                                <div className="text-center">
                                                    <span className="text-stone-300 font-bold uppercase tracking-widest text-sm block mb-1">PDF Document</span>
                                                    <p className="text-xs text-stone-500 font-medium break-all max-w-[240px] px-4">
                                                        {certificateFile ? certificateFile.name : (formData.fileUrl ? 'Existing Certificate.pdf' : 'No file selected')}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-[2px]">
                                            <Icon icon="solar:camera-rotate-bold" className="text-white text-3xl" />
                                            <span className="text-white text-[10px] font-bold uppercase tracking-widest">Replace File</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-64 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-stone-600 bg-stone-800/20 hover:bg-stone-800/40 hover:border-white/10 transition-all">
                                        <Icon icon="solar:upload-bold" width="48" />
                                        <span className="text-sm mt-3 font-semibold">Click to Upload Certificate</span>
                                        <p className="text-[10px] mt-1 text-stone-500 opacity-60 uppercase tracking-[0.15em]">Image or PDF (Max 10MB)</p>
                                    </div>
                                )}

                                {(certificateFile) && (
                                    <button 
                                        type="button" 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCertificateFile(null);
                                        }}
                                        className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-2xl hover:bg-red-600 transition-colors z-20"
                                    >
                                        <Icon icon="solar:trash-bin-minimalistic-bold" width="20" />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl flex gap-3 text-blue-500/80">
                            <Icon icon="solar:info-circle-bold" width="20" className="flex-shrink-0" />
                            <p className="text-[12px] leading-relaxed">
                                Uploaded document will be stored securely. If it&apos;s a PDF, a direct download/view link will be provided to visitors.
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'styling' && (
                    <div className="space-y-6 animate-in slide-in-from-right duration-300">
                        <div className="space-y-4">
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

                        <div className="pt-4 border-t border-white/5">
                            <IconSelector 
                                techInput={techInput}
                                setTechInput={setTechInput}
                                techColor={techColor}
                                setTechColor={setTechColor}
                                handleAddTech={handleAddTech}
                                usedIcons={suggestions.icons}
                                currentTechs={formData.skills.map(skill => ({ 
                                    icon: 'solar:check-circle-bold', 
                                    label: skill, // IconSelector might use name or label, let's check
                                    color: formData.color 
                                }))}
                                removeTech={removeTech}
                            />
                            <p className="text-[11px] text-stone-500 mt-2 italic font-medium">* Use the Tech Stack selector above to add skills to this certificate.</p>
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
                                <span>{formData.id ? 'Update Certificate' : 'Add Certificate'}</span>
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
                        className="w-full py-4 mt-3 rounded-2xl bg-stone-800/10 hover:bg-red-500/10 text-stone-500 hover:text-red-400 font-semibold transition-all border border-white/5 hover:border-red-500/20 active:scale-95 flex items-center justify-center gap-3"
                    >
                        <Icon icon="solar:undo-left-round-bold" width="20" />
                        <span>Cancel Edit Mode</span>
                    </button>
                )}
            </div>
        </form>
    );
};

export default CertificateForm;
