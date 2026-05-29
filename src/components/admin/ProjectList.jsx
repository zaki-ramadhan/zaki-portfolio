/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react";
import ProjectListItem from "./ProjectListItem";

const ProjectList = ({ 
    projects, 
    totalData,
    currentPage, 
    totalPages, 
    onPageChange, 
    itemsPerPage, 
    onItemsPerPageChange,
    onDelete, 
    onEdit,
    editingId
}) => {
    return (
        <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    Projects <span className="text-stone-500 text-lg font-bold">({totalData})</span>
                </h2>
                
                <div className="flex items-center gap-3 bg-stone-900/50 p-2 rounded-xl border border-white/5">
                    <span className="text-xs font-black text-stone-500 uppercase ml-2 tracking-wider">Show</span>
                    {[4, 8, 12, 14, 16, 20].map(size => (
                        <button
                            key={size}
                            onClick={() => onItemsPerPageChange(size)}
                            className={`px-3 py-1 rounded-lg text-sm font-black transition-all ${itemsPerPage === size ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-stone-500 hover:text-stone-300'}`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                {projects.map(project => (
                    <ProjectListItem 
                        key={project.id} 
                        project={project} 
                        onDelete={onDelete} 
                        onEdit={onEdit}
                        isEditing={editingId === project.id}
                    />
                ))}
            </div>

            {projects.length === 0 && (
                <div className="text-center py-24 bg-stone-900/10 rounded-[40px] border border-dashed border-white/5">
                    <Icon icon="solar:folder-open-linear" width="48" className="text-stone-700 mx-auto mb-4" />
                    <p className="text-stone-500 font-medium">No projects found</p>
                    <p className="text-stone-600 text-xs mt-1">Start by adding your first project using the form.</p>
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/5 gap-4">
                    <p className="text-base text-stone-500 font-extrabold tracking-wide">
                        Page <span className="text-emerald-400 mx-1">{currentPage}</span> / <span className="text-white mx-1">{totalPages}</span>
                    </p>
                    
                    <div className="flex items-center gap-2">
                        <button 
                            disabled={currentPage === 1}
                            onClick={() => onPageChange(prev => Math.max(1, prev - 1))}
                            className="w-10 h-10 rounded-xl bg-stone-900 border border-white/5 flex items-center justify-center text-stone-400 hover:text-white hover:border-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <Icon icon="solar:alt-arrow-left-linear" width="20" />
                        </button>
                        
                        <div className="flex items-center gap-1">
                            {[...Array(totalPages)].map((_, i) => {
                                const page = i + 1;
                                // Simple logic to show current, first, last and neighbors
                                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => onPageChange(page)}
                                            className={`w-10 h-10 rounded-xl text-sm font-black transition-all ${currentPage === page ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-stone-900/50 text-stone-500 hover:text-white'}`}
                                        >
                                            {page}
                                        </button>
                                    );
                                }
                                if (page === currentPage - 2 || page === currentPage + 2) {
                                    return <span key={page} className="text-stone-700">...</span>;
                                }
                                return null;
                            })}
                        </div>

                        <button 
                            disabled={currentPage === totalPages}
                            onClick={() => onPageChange(prev => Math.min(totalPages, prev + 1))}
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

export default ProjectList;
