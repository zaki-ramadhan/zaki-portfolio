/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react";
import ProjectListItem from "./ProjectListItem";

const ProjectList = ({ projects, onDelete }) => {
    return (
        <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                Existing Projects <span className="text-stone-500 text-sm font-normal">({projects.length})</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
                {projects.map(project => (
                    <ProjectListItem 
                        key={project.id} 
                        project={project} 
                        onDelete={onDelete} 
                    />
                ))}
            </div>
            {projects.length === 0 && (
                <div className="text-center py-24 bg-stone-900/10 rounded-3xl border border-dashed border-white/5">
                    <Icon icon="mdi:folder-open-outline" width="48" className="text-stone-700 mx-auto mb-4" />
                    <p className="text-stone-500">No projects found in database</p>
                    <p className="text-stone-600 text-sm mt-1">Start by adding your first project using the form.</p>
                </div>
            )}
        </div>
    );
};

export default ProjectList;
