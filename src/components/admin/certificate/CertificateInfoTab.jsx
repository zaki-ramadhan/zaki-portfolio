/* eslint-disable react/prop-types */
import ComboInput from "../inputs/ComboInput";

const CertificateInfoTab = ({ formData, onInputChange, errors, isUrl, suggestions }) => {
    return (
        <div className="space-y-6 animate-in slide-in-from-left duration-300">
            <div className="space-y-2">
                <label className="text-sm text-stone-400 font-semibold ml-1">
                    Certificate Title<span className="text-red-500">*</span>
                </label>
                <input 
                    name="title" 
                    value={formData.title} 
                    onChange={onInputChange} 
                    className={`w-full bg-stone-800/40 rounded-xl p-3.5 border focus:ring-4 outline-none transition-all text-sm ${
                        errors.title ? 'border-red-500/50 ring-red-500/10' : 'border-white/10 focus:border-additional/30'
                    }`} 
                    placeholder="e.g. React Web Developer"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm text-stone-400 font-semibold ml-1">Issuer</label>
                    <input 
                        name="issuer" 
                        value={formData.issuer} 
                        onChange={onInputChange} 
                        className="w-full bg-stone-800/40 rounded-xl p-3.5 border border-white/10 outline-none text-sm" 
                        placeholder="e.g. Dicoding"
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-sm text-stone-400 font-semibold ml-1">Date</label>
                        {formData.date && (
                            <span className={`text-[10px] font-bold ${(formData.date >= 2000 && formData.date <= 2100) ? 'text-emerald-500' : 'text-red-500'}`}>
                                {(formData.date >= 2000 && formData.date <= 2100) ? '✓ Valid' : '⚠ Min 2000'}
                            </span>
                        )}
                    </div>
                    <input 
                        name="date" 
                        type="number"
                        min="2000"
                        max="2100"
                        value={formData.date} 
                        onChange={onInputChange} 
                        className={`w-full bg-stone-800/40 rounded-xl p-3.5 border focus:ring-4 outline-none transition-all text-sm [appearance:textfield] ${
                            formData.date && (formData.date < 2000 || formData.date > 2100)
                            ? 'border-red-500/30 focus:border-red-500/50'
                            : 'border-white/10 focus:border-additional/30'
                        }`} 
                        placeholder="e.g. 2024"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                    <label className="text-sm text-stone-400 font-semibold">Credential Link (URL)</label>
                    {formData.credentialUrl && (
                        <span className={`text-[12px] font-bold ${isUrl(formData.credentialUrl) ? 'text-emerald-500' : 'text-red-500'}`}>
                            {isUrl(formData.credentialUrl) ? '✓ Valid' : '⚠ Plain Text'}
                        </span>
                    )}
                </div>
                <input 
                    name="credentialUrl" 
                    value={formData.credentialUrl} 
                    onChange={onInputChange} 
                    className={`w-full bg-stone-800/40 rounded-xl p-3.5 border focus:ring-4 outline-none transition-all text-sm ${
                        formData.credentialUrl && !isUrl(formData.credentialUrl) 
                        ? 'border-red-500/30 focus:border-red-500/50' 
                        : 'border-white/10 focus:border-additional/30'
                    }`} 
                    placeholder="https://..."
                />
            </div>

            <ComboInput 
                label="Category"
                name="category"
                value={formData.category}
                onChange={onInputChange}
                options={suggestions.categories || ["Frontend", "Backend", "Cloud", "Tools", "Fundamental"]}
                placeholder="e.g. Frontend"
                required
                error={errors.category}
            />
        </div>
    );
};

export default CertificateInfoTab;
