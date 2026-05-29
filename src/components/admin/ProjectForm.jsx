/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react";

const ProjectForm = ({ 
    formData, 
    handleInputChange, 
    handleSubmit, 
    uploading, 
    techInput, 
    setTechInput, 
    handleAddTech, 
    removeTech, 
    setImageFile 
}) => {
    return (
        <form onSubmit={handleSubmit} className="bg-stone-900/50 backdrop-blur-xl p-6 rounded-3xl border border-white/10 space-y-5 sticky top-8">
            <h2 className="text-xl font-semibold mb-2">Add New Project</h2>
            
            <div className="space-y-1">
                <label className="text-xs text-stone-500 uppercase tracking-wider ml-1">Project Name</label>
                <input 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    className="w-full bg-stone-800/50 rounded-xl p-3 border border-white/5 focus:ring-1 focus:ring-additional outline-none" 
                    required 
                />
            </div>

            <div className="space-y-1">
                <label className="text-xs text-stone-500 uppercase tracking-wider ml-1">Description (i18n key or text)</label>
                <textarea 
                    name="desc" 
                    value={formData.desc} 
                    onChange={handleInputChange} 
                    className="w-full bg-stone-800/50 rounded-xl p-3 border border-white/5 focus:ring-1 focus:ring-emerald-500 outline-none h-24" 
                    required 
                />
            </div>

            <div className="space-y-1">
                <label className="text-xs text-stone-500 uppercase tracking-wider ml-1">Live Link / Github</label>
                <input 
                    name="link" 
                    value={formData.link} 
                    onChange={handleInputChange} 
                    className="w-full bg-stone-800/50 rounded-xl p-3 border border-white/5 focus:ring-1 focus:ring-additional outline-none" 
                    required 
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs text-stone-500 uppercase tracking-wider ml-1">Status</label>
                    <input 
                        name="status" 
                        value={formData.status} 
                        onChange={handleInputChange} 
                        className="w-full bg-stone-800/50 rounded-xl p-3 border border-white/5 focus:ring-1 focus:ring-additional outline-none" 
                    />
                </div>
                <div className="flex items-center gap-2 pt-6">
                    <input 
                        type="checkbox" 
                        name="is_published" 
                        checked={formData.is_published} 
                        onChange={handleInputChange} 
                        className="w-5 h-5 accent-additional" 
                    />
                    <label className="text-sm text-stone-300">Published</label>
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-xs text-stone-500 uppercase tracking-wider ml-1">Preview Image</label>
                <input 
                    type="file" 
                    onChange={(e) => setImageFile(e.target.files[0])} 
                    className="w-full text-sm text-stone-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-additional/10 file:text-additional hover:file:bg-additional/20 cursor-pointer" 
                />
            </div>

            <div className="space-y-1">
                <label className="text-xs text-stone-500 uppercase tracking-wider ml-1">Tech Stack (Iconify names)</label>
                <div className="flex gap-2">
                    <input 
                        value={techInput} 
                        onChange={(e) => setTechInput(e.target.value)} 
                        placeholder="e.g. logos:react" 
                        className="flex-1 bg-stone-800/50 rounded-xl p-3 border border-white/5 outline-none" 
                    />
                    <button 
                        type="button" 
                        onClick={handleAddTech} 
                        className="bg-additional/20 text-additional p-3 rounded-xl hover:bg-additional/30 transition-all"
                    >
                        Add
                    </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {formData.techs.map((t, i) => (
                        <span key={i} className="flex items-center gap-1 bg-stone-800 px-2 py-1 rounded-md text-xs border border-white/5">
                            <Icon icon={t.icon} />
                            <button type="button" onClick={() => removeTech(i)} className="text-red-400 hover:text-red-300 ml-1">×</button>
                        </span>
                    ))}
                </div>
            </div>

            <button 
                type="submit" 
                disabled={uploading} 
                className={`group relative overflow-hidden w-full py-4 rounded-2xl font-bold transition-all duration-500 ease-in-out border border-additional/15 hover:border-additional/30 ${uploading ? 'bg-stone-700' : 'bg-stone-950 text-white shadow-lg shadow-black/80 hover:shadow-additional/10 active:scale-95'}`}
            >
                {!uploading && (
                    <>
                        {/* Idle Glow Layer */}
                        <div className="absolute inset-0 bg-radial-[at_50%_160%] from-additional/30 via-transparent to-transparent transition-opacity duration-500" />
                        
                        {/* Hover Glow Layer */}
                        <div className="absolute inset-0 bg-radial-[at_50%_130%] from-additional/70 via-additional/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </>
                )}
                <span className="relative z-10">
                    {uploading ? "Uploading..." : "Save Project"}
                </span>
            </button>
        </form>
    );
};

export default ProjectForm;
