/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react";

const ProjectListItem = ({ project, onDelete, onEdit, isEditing }) => {
    return (
        <div className={`p-4 rounded-3xl group relative overflow-hidden transition-all border ${
            isEditing 
            ? 'bg-emerald-500/10 border-emerald-500/50 shadow-2xl shadow-emerald-500/10' 
            : 'bg-stone-900/30 border-white/5 hover:bg-stone-900/50 hover:border-white/10'
        }`}>
            <div className="flex justify-between items-start mb-4">
                <div className="basis-1/2">
                    <h3 className={`font-bold text-lg transition-colors truncate ${isEditing ? 'text-emerald-400' : 'text-white group-hover:text-emerald-400'}`}>
                        {project.name}
                        {isEditing && <span className="ml-2 text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full animate-pulse font-bold tracking-tight">Editing...</span>}
                    </h3>
                    <p className="text-stone-500 text-xs truncate">{project.desc}</p>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => onEdit(project)} 
                        className={`w-10 h-10 flex items-center justify-center transition-all rounded-xl border active:scale-90 ${
                            isEditing 
                            ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/20' 
                            : 'bg-stone-950/50 text-stone-600 hover:text-emerald-400 border-white/5'
                        }`}
                    >
                        <Icon icon={isEditing ? "solar:pen-new-square-bold" : "solar:pen-new-square-linear"} width="20" />
                    </button>
                    <button 
                        onClick={() => onDelete(project.id)} 
                        className="p-2 text-stone-600 hover:text-red-500 transition-colors bg-stone-950/50 rounded-lg border border-white/5 active:scale-90"
                    >
                        <Icon icon="mdi:trash-can-outline" width="20" />
                    </button>
                </div>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-white/5 bg-stone-950">
                <img 
                    src={project.preview} 
                    alt={project.name} 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" 
                    loading="lazy"
                />
            </div>
            <div className="flex justify-between items-center text-xs">
                <span className={`px-2 py-1 rounded-full font-medium ${project.is_published ? 'bg-emerald-500/10 text-emerald-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                    {project.is_published ? 'Published' : 'Draft'}
                </span>
                <span className="text-stone-600 font-mono">
                    {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A'}
                </span>
            </div>
        </div>
    );
};

export default ProjectListItem;
