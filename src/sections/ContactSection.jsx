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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus(null);

        try {
            await addDoc(collection(db, "messages"), {
                ...formData,
                createdAt: serverTimestamp(),
            });
            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
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
                            <span className="font-Archivo">zaki.ramadhan@example.com</span>
                        </div>
                        <div className="flex items-center gap-4 text-secondary group">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-additional/30 transition-all duration-300">
                                <Icon icon="solar:map-point-broken" className="group-hover:text-additional transition-colors" width="24" />
                            </div>
                            <span className="font-Archivo">Jakarta, Indonesia</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="lg:basis-2/3">
                    <form onSubmit={handleSubmit} className="bg-stone-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-10 space-y-6 relative overflow-hidden group">
                        {/* Decorative glow */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-additional/5 blur-3xl rounded-full group-hover:bg-additional/10 transition-all duration-700" />
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-Archivo text-stone-400 ml-1">{t("contactSection.nameLabel")}</label>
                                <input 
                                    required
                                    type="text" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 outline-none focus:ring-1 focus:ring-additional/30 focus:border-additional/20 hover:border-white/20 transition-all text-white font-Archivo"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-Archivo text-stone-400 ml-1">{t("contactSection.emailLabel")}</label>
                                <input 
                                    required
                                    type="email" 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 outline-none focus:ring-1 focus:ring-additional/30 focus:border-additional/20 hover:border-white/20 transition-all text-white font-Archivo"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-Archivo text-stone-400 ml-1">{t("contactSection.messageLabel")}</label>
                            <textarea 
                                required
                                rows="5"
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 outline-none focus:ring-1 focus:ring-additional/30 focus:border-additional/20 hover:border-white/20 transition-all text-white font-Archivo resize-none"
                            ></textarea>
                        </div>

                        <button 
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full bg-additional text-stone-900 font-bold py-4 rounded-xl shadow-lg shadow-additional/10 hover:shadow-additional/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:scale-100"
                        >
                            {isSubmitting ? (
                                <>
                                    <Icon icon="line-md:loading-twotone-loop" width="24" />
                                    <span>{t("contactSection.sending")}</span>
                                </>
                            ) : (
                                <>
                                    <span>{t("contactSection.sendButton")}</span>
                                    <Icon icon="solar:plain-2-broken" width="22" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </>
                            )}
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
