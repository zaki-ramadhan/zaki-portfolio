/* eslint-disable react/prop-types */
import { IconSelector } from "../inputs/IconSelector";

const CertificateStyleTab = ({ 
    formData, 
    onInputChange, 
    techInput, 
    setTechInput, 
    techColor, 
    setTechColor, 
    handleAddTech, 
    removeTech, 
    suggestions 
}) => {
    return (
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
                        label: skill, 
                        color: formData.color 
                    }))}
                    removeTech={removeTech}
                />
                <p className="text-[11px] text-stone-500 mt-2 italic font-medium">* Use the Tech Stack selector above to add skills to this certificate.</p>
            </div>
        </div>
    );
};

export default CertificateStyleTab;
