/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react";

const CertificateFileTab = ({ 
    errors, 
    fileInputRef, 
    setCertificateFile, 
    certificateFile, 
    formData, 
    previewUrl 
}) => {
    return (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className={`space-y-2 p-1 rounded-2xl transition-all ${errors.file ? 'bg-red-500/10' : ''}`}>
                <label className="text-sm text-stone-400 font-semibold ml-1">
                    Certificate File<span className="text-red-500">*</span>
                </label>
                
                <input 
                    type="file" 
                    ref={fileInputRef}
                    accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.pptx"
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
                            <p className="text-[10px] mt-1 text-stone-500 opacity-60 uppercase tracking-[0.15em]">Image · PDF · DOCX · XLSX · PPTX (Max 10MB)</p>
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
                    Supported: images, PDF, DOCX, DOC, XLSX, XLS, PPTX. Documents are stored securely on Cloudinary.
                </p>
            </div>
        </div>
    );
};

export default CertificateFileTab;
