/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react";

const CertificateList = ({ 
    certificates, 
    fetching,
    onDelete, 
    onEdit, 
    editingId,
    totalData,
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage,
    onItemsPerPageChange
}) => {
    return (
        <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2 px-2">
                <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                    Certificates <span className="text-stone-500 text-lg font-bold">({totalData})</span>
                </h2>
                
                <div className="flex items-center gap-3 bg-stone-900/50 p-2 rounded-xl border border-white/5">
                    <span className="text-xs font-black text-stone-500 uppercase ml-2 tracking-wider">Show</span>
                    {[6, 12, 18, 24].map(num => (
                        <button
                            key={num}
                            onClick={() => onItemsPerPageChange(num)}
                            className={`px-3 py-1 rounded-lg text-sm font-black transition-all ${itemsPerPage === num ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-stone-500 hover:text-stone-300'}`}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </div>

            {fetching ? (
                <div className="py-24 flex flex-col items-center justify-center text-stone-600 gap-4 bg-stone-900/10 rounded-[40px] border border-dashed border-white/5">
                    <div className="w-12 h-12 border-4 border-additional/20 border-t-additional rounded-full animate-spin"></div>
                    <p className="text-sm font-bold text-stone-500 animate-pulse">Fetching credentials...</p>
                </div>
            ) : certificates.length === 0 ? (
                <div className="py-24 flex flex-col items-center justify-center text-stone-600 gap-4 bg-stone-900/10 rounded-[40px] border border-dashed border-white/5">
                    <div className="w-20 h-20 rounded-full bg-stone-800/30 flex items-center justify-center border border-dashed border-white/5">
                        <Icon icon="solar:folder-error-bold" width="40" />
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-bold text-stone-400">No Certificates Found</p>
                        <p className="text-sm">Start adding your achievements to show them off.</p>
                    </div>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                    {certificates.map((cert) => (
                        <div 
                            key={cert.id} 
                            className={`group relative p-4 rounded-[28px] border transition-all duration-500 flex gap-4 items-center ${
                                editingId === cert.id 
                                ? 'bg-emerald-500/10 border-emerald-500/40 shadow-2xl shadow-emerald-500/10 ring-1 ring-emerald-500/10' 
                                : 'bg-stone-900/20 border-white/5 hover:bg-stone-800/40 hover:border-white/10'
                            }`}
                        >
                            {/* Thumbnail */}
                            <div className="w-[72px] h-[72px] rounded-2xl overflow-hidden bg-stone-800 flex-shrink-0 border border-white/5 relative">
                                {cert.fileType === 'image' ? (
                                    <img src={cert.fileUrl} className="w-full h-full object-cover" alt={cert.title} />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-stone-500">
                                        <Icon icon="solar:file-bold" width="28" />
                                        <span className="text-[11px] font-bold uppercase mt-1">
                                            {cert.format?.toUpperCase() || 'DOC'}
                                        </span>
                                    </div>
                                )}
                                {editingId === cert.id && (
                                    <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-[1px] flex items-center justify-center">
                                        <Icon icon="solar:pen-bold" className="text-emerald-400 animate-bounce" width="22" />
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0 space-y-1.5">
                                <div className="flex items-center gap-2">
                                    <span className={`px-2.5 py-0.5 rounded-lg border text-[11px] font-bold transition-colors ${
                                        editingId === cert.id 
                                        ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' 
                                        : 'bg-white/5 border-white/10 text-stone-400'
                                    }`}>
                                        {cert.category}
                                    </span>
                                    <span className="text-xs font-semibold text-stone-600">{cert.date}</span>
                                </div>
                                <h3 className={`text-[15px] font-bold truncate leading-snug transition-colors ${
                                    editingId === cert.id ? 'text-emerald-400' : 'text-white group-hover:text-emerald-400'
                                }`}>
                                    {cert.title}
                                    {editingId === cert.id && <span className="ml-2 inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />}
                                </h3>
                                <p className="text-xs text-stone-500 font-medium truncate">{cert.issuer}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 pr-1 shrink-0">
                                <button 
                                    onClick={() => onEdit(cert)}
                                    className={`w-9 h-9 rounded-xl transition-all flex items-center justify-center shadow-xl active:scale-90 ${
                                        editingId === cert.id 
                                        ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                                        : 'bg-stone-800 text-stone-400 hover:bg-emerald-500 hover:text-white'
                                    }`}
                                >
                                    <Icon icon={editingId === cert.id ? "solar:pen-new-square-bold" : "solar:pen-bold"} width="16" />
                                </button>
                                <button 
                                    onClick={() => onDelete(cert.id)}
                                    className="w-9 h-9 rounded-xl bg-stone-800 text-stone-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-xl active:scale-90"
                                >
                                    <Icon icon="solar:trash-bin-minimalistic-bold" width="16" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/5 gap-4">
                    <p className="text-base text-stone-500 font-extrabold tracking-wide">
                        Page <span className="text-emerald-400 mx-1">{currentPage}</span> / <span className="text-white mx-1">{totalPages}</span>
                    </p>
                    
                    <div className="flex items-center gap-2">
                        <button 
                            disabled={currentPage === 1}
                            onClick={() => onPageChange(currentPage - 1)}
                            className="w-10 h-10 rounded-xl bg-stone-900 border border-white/5 flex items-center justify-center text-stone-400 hover:text-white hover:border-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <Icon icon="solar:alt-arrow-left-linear" width="20" />
                        </button>
                        
                        <div className="flex items-center gap-1 px-4 bg-stone-950/50 rounded-xl border border-white/5 h-10">
                            <span className="text-white font-black text-sm">{currentPage}</span>
                            <span className="text-stone-600 font-bold text-xs">/ {totalPages}</span>
                        </div>

                        <button 
                            disabled={currentPage === totalPages}
                            onClick={() => onPageChange(currentPage + 1)}
                            className="w-10 h-10 rounded-xl bg-stone-900 border border-white/5 flex items-center justify-center text-stone-400 hover:text-white hover:border-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <Icon icon="solar:alt-arrow-right-linear" width="20" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CertificateList;
