/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react";

const ProjectListItem = ({ project, onDelete }) => {
    return (
        <div className="bg-stone-900/30 border border-white/5 p-4 rounded-3xl group relative overflow-hidden transition-all hover:bg-stone-900/50">
            <div className="flex justify-between items-start mb-4">
                <div className="basis-3/4">
                    <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors truncate">{project.name}</h3>
                    <p className="text-stone-500 text-xs truncate">{project.desc}</p>
                </div>
                <button 
                    onClick={() => onDelete(project.id)} 
                    className="p-2 text-stone-600 hover:text-red-500 transition-colors bg-stone-950/50 rounded-lg border border-white/5"
                >
                    <Icon icon="mdi:trash-can-outline" width="20" />
                </button>
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
