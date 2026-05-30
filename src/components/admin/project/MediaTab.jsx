/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react";

const MediaTab = ({ 
    errors, 
    fileInputRef, 
    setImageFile, 
    previewUrl, 
    formData, 
    imageFile 
}) => {
    return (
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
    );
};

export default MediaTab;
