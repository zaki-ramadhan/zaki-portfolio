import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Icon } from "@iconify-icon/react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../utils/firebase";

export default function ContactSection() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error'

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.name || formData.name.trim().length < 3) {
            newErrors.name = true;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            newErrors.email = true;
        }
        if (!formData.message || formData.message.trim().length === 0) {
            newErrors.message = true;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        
        setIsSubmitting(true);
        setStatus(null);

        try {
            await addDoc(collection(db, "messages"), {
                ...formData,
                createdAt: serverTimestamp(),
            });
            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
            setErrors({});
            setTimeout(() => setStatus(null), 5000);
        } catch (error) {
            console.error("Error sending message:", error);
            setStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="container mx-auto py-20 px-4 mt-20">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Side: Text & Info */}
                <div className="lg:basis-1/3 flex flex-col space-y-6">
                    <div className="flex items-center w-full">
                        <h1 className="heading text-nowrap text-2xl md:text-3xl lg:text-4xl ml-1">
                            {t("contactSection.title")}
                        </h1>
                        <span className="inline w-full grow h-[0.05rem] bg-gradient-to-r from-stone-400 from-20% to-stone-200/0 ml-4"></span>
                    </div>
                    <p className="text-secondary text-lg font-light leading-relaxed">
                        {t("contactSection.subtitle")}
                    </p>
                    
                    <div className="flex flex-col space-y-4 pt-4">
                        <div className="flex items-center gap-4 text-secondary group">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-additional/30 transition-all duration-300">
                                <Icon icon="solar:letter-broken" className="group-hover:text-additional transition-colors" width="24" />
                            </div>
                            <a href="mailto:zakiram4dhan@gmail.com" className="font-Archivo hover:text-white transition-colors">zakiram4dhan@gmail.com</a>
                        </div>
                        <div className="flex items-center gap-4 text-secondary group">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-additional/30 transition-all duration-300">
                                <Icon icon="basil:instagram-outline" className="group-hover:text-additional transition-colors" width="24" />
                            </div>
                            <a href="https://www.instagram.com/zqramadhan_" target="_blank" rel="noreferrer" className="font-Archivo hover:text-white transition-colors">@zqramadhan_</a>
                        </div>
                        <div className="flex items-center gap-4 text-secondary group">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-additional/30 transition-all duration-300">
                                <Icon icon="mdi:github" className="group-hover:text-additional transition-colors" width="24" />
                            </div>
                            <a href="https://github.com/zaki-ramadhan" target="_blank" rel="noreferrer" className="font-Archivo hover:text-white transition-colors">zaki-ramadhan</a>
                        </div>
                        <div className="flex items-center gap-4 text-secondary group">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-additional/30 transition-all duration-300">
                                <Icon icon="la:linkedin-in" className="group-hover:text-additional transition-colors" width="24" />
                            </div>
                            <a href="https://www.linkedin.com/in/zaki-ramadhan" target="_blank" rel="noreferrer" className="font-Archivo hover:text-white transition-colors">Zaki Ramadhan</a>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="lg:basis-2/3">
                    <form onSubmit={handleSubmit} className="bg-stone-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-10 space-y-6 relative overflow-hidden group">
                        {/* Decorative glows (Coklat Muda / Additional) */}
                        <div className="absolute -top-32 -right-32 w-80 h-80 bg-additional/10 blur-[100px] rounded-full group-hover:bg-additional/20 transition-all duration-1000 pointer-events-none" />
                        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-additional/5 blur-[120px] rounded-full group-hover:bg-additional/15 transition-all duration-1000 pointer-events-none" />
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-Archivo text-stone-400 ml-1">
                                    {t("contactSection.nameLabel")} <span className="text-additional">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    value={formData.name}
                                    placeholder={t("contactSection.namePlaceholder")}
                                    onChange={(e) => {
                                        setFormData({...formData, name: e.target.value});
                                        if (errors.name) setErrors({...errors, name: false});
                                    }}
                                    className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3.5 px-4 outline-none focus:ring-1 focus:ring-additional/30 focus:border-additional/20 hover:border-white/20 transition-all text-white font-Archivo`}
                                />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{t('contactSection.nameError')}</p>
                                    )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-Archivo text-stone-400 ml-1">
                                    {t("contactSection.emailLabel")} <span className="text-additional">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    value={formData.email}
                                    placeholder={t("contactSection.emailPlaceholder")}
                                    onChange={(e) => {
                                        setFormData({...formData, email: e.target.value});
                                        if (errors.email) setErrors({...errors, email: false});
                                    }}
                                    className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-3.5 px-4 outline-none focus:ring-1 focus:ring-additional/30 focus:border-additional/20 hover:border-white/20 transition-all text-white font-Archivo`}
                                />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{t('contactSection.emailError')}</p>
                                    )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-Archivo text-stone-400 ml-1">
                                {t("contactSection.messageLabel")} <span className="text-additional">*</span>
                            </label>
                            <textarea 
                                rows="5"
                                value={formData.message}
                                placeholder={t("contactSection.messagePlaceholder")}
                                onChange={(e) => {
                                    setFormData({...formData, message: e.target.value});
                                    if (errors.message) setErrors({...errors, message: false});
                                }}
                                className={`w-full bg-white/5 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-4 px-4 outline-none focus:ring-1 focus:ring-additional/30 focus:border-additional/20 hover:border-white/20 transition-all text-white font-Archivo resize-none`}
                            ></textarea>
                                    {errors.message && (
                                        <p className="text-red-500 text-sm mt-1">{t('contactSection.messageError')}</p>
                                    )}
                        </div>

                        <button 
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full relative overflow-hidden group/btn bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
                        >
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                            <div className="relative flex items-center justify-center gap-2">
                                {isSubmitting ? (
                                    <>
                                        <Icon icon="line-md:loading-twotone-loop" width="24" />
                                        <span>{t("contactSection.sending")}</span>
                                    </>
                                ) : (
                                    <>
                                        <span>{t("contactSection.sendButton")}</span>
                                        <Icon icon="solar:plain-2-bold" width="22" className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </div>
                        </button>

                        {status === 'success' && (
                            <div className="flex items-center gap-2 text-green-400 bg-green-400/10 p-4 rounded-xl animate-in slide-in-from-bottom-2 duration-300">
                                <Icon icon="solar:check-circle-broken" width="20" />
                                <span className="text-sm font-Archivo">{t("contactSection.success")}</span>
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl animate-in slide-in-from-bottom-2 duration-300">
                                <Icon icon="solar:danger-broken" width="20" />
                                <span className="text-sm font-Archivo">{t("contactSection.error")}</span>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
