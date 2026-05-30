/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react";
import ComboInput from "../inputs/ComboInput";

const ContentTab = ({ 
    formData, 
    formLang, 
    setFormLang, 
    localHandleChange, 
    errors, 
    isUrl, 
    suggestions, 
    onInputChange 
}) => {
    return (
        <div className="space-y-6 animate-in slide-in-from-left duration-300">
            {/* Content Language Switcher */}
            <div className="flex justify-center bg-black/20 p-1.5 rounded-2xl border border-white/5">
                <div className="flex bg-stone-900 rounded-xl p-1 w-full sm:w-auto">
                    {[
                        { id: 'en', label: 'English', icon: 'twemoji:flag-united-states' },
                        { id: 'id', label: 'Indonesia', icon: 'twemoji:flag-indonesia' }
                    ].map(lang => (
                        <button
                            key={lang.id}
                            type="button"
                            onClick={() => setFormLang(lang.id)}
                            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${formLang === lang.id ? 'bg-stone-800 text-white shadow-sm ring-1 ring-white/5' : 'text-stone-500 hover:text-stone-400'}`}
                        >
                            <Icon icon={lang.icon} width="16" />
                            {lang.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm text-stone-400 font-semibold ml-1">
                    Project Name<span className="text-red-500">*</span>
                </label>
                <input 
                    name="name" 
                    value={formData.name} 
                    onChange={localHandleChange} 
                    className={`w-full bg-stone-800/40 rounded-xl p-3.5 border focus:ring-4 outline-none transition-all text-sm ${
                        errors.name 
                        ? 'border-red-500/50 ring-red-500/10 animate-shake' 
                        : 'border-white/10 focus:border-additional/30 focus:ring-additional/5'
                    }`} 
                    placeholder="e.g. My Awesome App"
                />
            </div>

            {/* Description - Conditional Rendering */}
            <div className="space-y-2">
                <label className="text-sm text-stone-400 font-semibold ml-1 flex items-center gap-2">
                    <Icon icon={formLang === 'en' ? 'twemoji:flag-united-states' : 'twemoji:flag-indonesia'} width="14" /> 
                    {formLang === 'en' ? 'Description (EN)' : 'Deskripsi (ID)'}<span className="text-red-500">*</span>
                </label>
                <textarea 
                    name={formLang === 'en' ? 'desc_en' : 'desc_id'} 
                    value={formLang === 'en' ? formData.desc_en : formData.desc_id} 
                    onChange={localHandleChange} 
                    className={`w-full bg-stone-800/40 rounded-xl p-3.5 border focus:ring-4 outline-none h-32 resize-none transition-all placeholder:text-stone-600 text-sm font-medium ${
                        (formLang === 'en' ? errors.desc_en : errors.desc_id)
                        ? 'border-red-500/50 ring-red-500/10 animate-shake' 
                        : 'border-white/10 focus:border-additional/30 focus:ring-additional/5'
                    }`} 
                    placeholder={formLang === 'en' ? 'English description...' : 'Deskripsi Bahasa Indonesia...'}
                />
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                    <label className="text-sm text-stone-400 font-semibold">
                        Project Link<span className="text-red-500">*</span>
                    </label>
                    {formData.link && (
                        <span className={`text-[12px] font-bold ${isUrl(formData.link) ? 'text-emerald-500' : 'text-red-500'}`}>
                            {isUrl(formData.link) ? '✓ Valid' : '⚠ Plain Text'}
                        </span>
                    )}
                </div>
                <input 
                    name="link" 
                    value={formData.link} 
                    onChange={localHandleChange} 
                    className={`w-full bg-stone-800/40 rounded-xl p-3.5 border focus:ring-4 outline-none transition-all text-sm ${
                        errors.link 
                        ? 'border-red-500/50 ring-red-500/10 animate-shake' 
                        : 'border-white/10 focus:border-additional/30 focus:ring-additional/5'
                    }`} 
                    placeholder="https://..."
                />
            </div>

            {/* Status - Conditional Rendering */}
            <ComboInput 
                label={<span className="flex items-center gap-2 ml-1"><Icon icon={formLang === 'en' ? 'twemoji:flag-united-states' : 'twemoji:flag-indonesia'} width="14" /> {formLang === 'en' ? 'Status (EN)' : 'Status (ID)'}</span>}
                name={formLang === 'en' ? 'status_en' : 'status_id'}
                value={formLang === 'en' ? formData.status_en : formData.status_id}
                onChange={localHandleChange}
                options={suggestions.statuses}
                placeholder={formLang === 'en' ? 'Project Ongoing...' : 'Proyek Berjalan...'}
                required
                error={formLang === 'en' ? errors.status_en : errors.status_id}
            />

            <ComboInput 
                label="Category"
                name="category"
                value={formData.category}
                onChange={localHandleChange}
                options={suggestions.categories}
                placeholder="..."
                required
                error={errors.category}
            />

            <div className="flex items-center justify-between p-4 bg-stone-900/50 rounded-2xl border border-white/5 group hover:border-white/10 transition-all cursor-pointer" onClick={() => onInputChange({ target: { name: 'is_published', type: 'checkbox', checked: !formData.is_published } })}>
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">Visible to Public</span>
                    <span className="text-[11px] text-stone-500 font-medium lowercase">Set this project status to published</span>
                </div>
                <div className={`w-12 h-6 rounded-full p-1 transition-all duration-300 relative ${formData.is_published ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-stone-800'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-lg transition-transform duration-300 ${formData.is_published ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
            </div>
        </div>
    );
};

export default ContentTab;
