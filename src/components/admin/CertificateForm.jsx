/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify-icon/react";

// Sub-components
import CertificateInfoTab from "./certificate/CertificateInfoTab";
import CertificateFileTab from "./certificate/CertificateFileTab";
import CertificateStyleTab from "./certificate/CertificateStyleTab";

const CertificateForm = ({ 
    formData,
    onInputChange,
    handleSubmit,
    uploading,
    setCertificateFile,
    certificateFile,
    suggestions,
    certSuggestions,
    errors = {}
}) => {
    const fileInputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [activeTab, setActiveTab] = useState("content");

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
        }
    }, [certificateFile]);

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
                            className={`flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === tab.id ? 'bg-stone-800 text-white shadow-lg ring-1 ring-white/10' : 'text-stone-500 hover:text-stone-300'}`}
                        >
                            <Icon icon={tab.icon} width="18" />
                            <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6 flex-1 overflow-y-auto scrollbar-none space-y-6">
                {activeTab === 'content' && (
                    <CertificateInfoTab 
                        formData={formData} 
                        onInputChange={onInputChange} 
                        errors={errors} 
                        isUrl={isUrl} 
                        suggestions={suggestions}
                        certSuggestions={certSuggestions}
                    />
                )}
                {activeTab === 'file' && (
                    <CertificateFileTab 
                        errors={errors} 
                        fileInputRef={fileInputRef} 
                        setCertificateFile={setCertificateFile} 
                        certificateFile={certificateFile} 
                        formData={formData} 
                        previewUrl={previewUrl} 
                    />
                )}
                {activeTab === 'styling' && (
                    <CertificateStyleTab
                        formData={formData}
                        onInputChange={onInputChange}
                        usedIcons={certSuggestions?.icons || []}
                    />
                )}
            </div>

            <div className="p-6 border-t border-white/5 bg-stone-900/30">
                <button type="submit" disabled={uploading} className={`group relative overflow-hidden w-full py-4 rounded-2xl font-semibold transition-all duration-500 border border-additional/15 ${uploading ? 'cursor-not-allowed bg-stone-800 text-stone-500' : 'bg-stone-950 text-white shadow-2xl hover:border-additional/30 active:scale-95'}`}>
                    <span className="relative z-10 flex items-center justify-center gap-3">
                        {uploading ? (
                            <><div className="w-5 h-5 border-2 border-additional/30 border-t-additional rounded-full animate-spin"></div><span>Saving...</span></>
                        ) : (
                            <><Icon icon="solar:diskette-bold" width="20" /><span>{formData.id ? 'Update Certificate' : 'Add Certificate'}</span></>
                        )}
                    </span>
                    {!uploading && <div className="absolute inset-0 bg-radial-[at_50%_150%] from-additional/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
                </button>
                {formData.id && (
                    <button type="button" onClick={() => onInputChange({ target: { name: 'reset_form', value: null } })} className="w-full py-4 mt-3 rounded-2xl bg-stone-800/10 hover:bg-red-500/10 text-stone-500 hover:text-red-400 font-semibold transition-all border border-white/5 hover:border-red-500/20 active:scale-95 flex items-center justify-center gap-3">
                        <Icon icon="solar:undo-left-round-bold" width="20" /><span>Cancel Edit Mode</span>
                    </button>
                )}
            </div>
        </form>
    );
};

export default CertificateForm;
