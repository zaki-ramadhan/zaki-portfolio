import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify-icon/react";
import { certificateData as staticCertificates } from "@utils/certificateData";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../utils/firebase";


export default function CertificateSection() {
    const { t } = useTranslation();
    const [selected, setSelected] = useState("All");
    const [certificates, setCertificates] = useState(() => {
        const cached = localStorage.getItem('portfolio_certificates');
        return cached ? JSON.parse(cached) : staticCertificates;
    });

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const q = query(collection(db, "certificates"), orderBy("createdAt", "desc"));
                const snap = await getDocs(q);
                const dynamic = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                const filteredStatic = staticCertificates.filter(
                    s => !dynamic.some(d => d.title === s.title)
                );
                const merged = [...dynamic, ...filteredStatic];
                setCertificates(merged);
                localStorage.setItem('portfolio_certificates', JSON.stringify(merged));
            } catch (error) {
                console.error("Error fetching certificates:", error);
            }
        };
        fetchCertificates();
    }, []);

    const categories = ["All", ...Array.from(new Set(certificates.map(c => c.category).filter(Boolean))).sort()];

    // If current selected category is removed from data, fall back to All
    useEffect(() => {
        if (selected !== "All" && !categories.includes(selected)) setSelected("All");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [certificates]);

    const filtered = selected === "All"
        ? certificates
        : certificates.filter(c => c.category === selected);

    const getCatCount = (cat) =>
        cat === "All" ? certificates.length : certificates.filter(c => c.category === cat).length;

    return (
        <section id="certificates" className="container mx-auto py-4 mt-16 lg:mt-12">
            {/* Heading */}
            <div className="flex items-center w-full mb-8">
                <h2 className="heading text-nowrap text-2xl md:text-3xl lg:text-4xl ml-1">
                    {t("certificateSection.title")}
                </h2>
                <span className="inline w-full grow h-[0.05rem] bg-gradient-to-r from-stone-400 from-20% to-stone-200/0 ml-4" />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
                <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelected(cat)}
                            className={`px-4 py-2.5 rounded-xl text-sm md:text-[15px] font-Archivo font-medium transition-all duration-300 border whitespace-nowrap flex items-center gap-2 ${
                                selected === cat
                                    ? "bg-additional text-stone-900 border-additional shadow-lg shadow-additional/20"
                                    : "bg-stone-900/40 text-stone-400 border-white/5 hover:border-white/20 hover:text-white"
                            }`}
                        >
                            <span>{cat}</span>
                            <span className={`text-[13px] md:text-[14px] font-bold px-2 py-0.5 rounded-lg transition-all ${
                                selected === cat ? "bg-stone-900/20 text-stone-900" : "bg-white/10 text-stone-300"
                            }`}>
                                {getCatCount(cat)}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((cert, i) => (
                    <div
                        key={cert.id || i}
                        className="group relative bg-stone-900/40 border border-white/5 rounded-3xl p-6 hover:border-white/15 hover:bg-stone-900/70 transition-all duration-300 overflow-hidden flex flex-col gap-5"
                        style={{ animationDelay: `${i * 60}ms` }}
                    >
                        {/* 📸 Image Preview Background (if image) */}
                        {cert.fileType === 'image' && cert.fileUrl && (
                            <div className="absolute inset-x-2 top-2 h-32 rounded-2xl overflow-hidden opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none">
                                <img src={cert.fileUrl} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" alt="" />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
                            </div>
                        )}

                        {/* Glow accent — top right circle */}
                        <div
                            className="absolute -top-6 -right-6 w-40 h-40 rounded-full blur-2xl opacity-5 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                            style={{ background: cert.color }}
                        />

                        {/* Bottom gradient decoration — ala contact form */}
                        <div className="absolute -bottom-10 -left-10 w-52 h-52 rounded-full blur-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none bg-additional" />
                        <div className="absolute bottom-0 inset-x-0 h-20 rounded-b-3xl pointer-events-none bg-gradient-to-t from-additional/3 via-stone-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Top row: icon + category badge */}
                        <div className="flex items-start justify-between relative z-10">
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 backdrop-blur-md"
                                style={{ backgroundColor: `${cert.color}18` }}
                            >
                                {cert.issuerLogo?.includes(':') ? (
                                    <Icon icon={cert.issuerLogo} width="30" style={{ color: cert.color }} />
                                ) : (
                                    <Icon icon="solar:globe-broken" width="30" style={{ color: cert.color }} />
                                )}
                            </div>
                            <span
                                className="text-xs font-bold px-3 py-1.5 rounded-xl border backdrop-blur-md"
                                style={{
                                    color: cert.color,
                                    borderColor: `${cert.color}30`,
                                    backgroundColor: `${cert.color}10`,
                                }}
                            >
                                {cert.category}
                            </span>
                        </div>

                        {/* Title & issuer */}
                        <div className="flex flex-col gap-1.5 relative z-10">
                            <h3 className="font-bold text-white text-base leading-snug group-hover:text-additional transition-colors duration-300 line-clamp-2">
                                {cert.title}
                            </h3>
                            <div className="flex items-center gap-2 text-stone-500 text-sm font-medium">
                                <Icon icon="solar:buildings-broken" width="16" />
                                <span>{cert.issuer}</span>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                            {cert.skills?.map(skill => (
                                <span
                                    key={skill}
                                    className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 text-stone-400 font-medium border border-white/5"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>

        {/* Footer: date + verify link */}
                        <div className="flex flex-col gap-3 pt-4 border-t border-white/5 relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-stone-500 text-xs font-bold uppercase tracking-wider">
                                    <Icon icon="solar:calendar-minimalistic-broken" width="16" />
                                    <span>
                                        {cert.validFrom && cert.validUntil
                                            ? `${cert.validFrom} – ${cert.validUntil}`
                                            : cert.date}
                                    </span>
                                </div>
                                {cert.credentialUrl && (
                                    <a 
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Verify this credential on the issuer's platform"
                                        className="flex items-center gap-1.5 text-xs font-bold text-additional/60 hover:text-additional transition-colors"
                                    >
                                        <Icon icon="solar:verified-check-bold" width="14" />
                                        <span>{t("certificateSection.verify")}</span>
                                        <Icon icon="solar:arrow-right-up-linear" width="13" />
                                    </a>
                                )}
                            </div>
                            {cert.credentialId && (
                                <p className="text-[10px] font-mono text-stone-600 tracking-wider truncate">
                                    ID: {cert.credentialId}
                                </p>
                            )}
                            
                            {/* 📂 Main File Link (Image or Document) */}
                            {cert.fileUrl && (() => {
                                const isImage = cert.fileType === 'image';
                                const viewUrl = isImage
                                    ? cert.fileUrl
                                    : `https://docs.google.com/viewer?url=${encodeURIComponent(cert.fileUrl)}&embedded=true`;
                                return (
                                    <a
                                        href={viewUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/5 hover:bg-additional hover:text-stone-900 text-stone-300 text-xs font-bold transition-all duration-300 border border-white/5 hover:border-additional active:scale-[0.98]"
                                    >
                                        <Icon icon={isImage ? "solar:gallery-bold" : "solar:file-text-bold"} width="18" />
                                        <span>{isImage ? t("certificateSection.viewImage") : t("certificateSection.viewPdf")}</span>
                                    </a>
                                );
                            })()}
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-stone-600">
                    <Icon icon="solar:diploma-broken" width="48" className="opacity-30 mb-3" />
                    <p className="text-sm font-medium">{t("certificateSection.empty")}</p>
                </div>
            )}
        </section>
    );
}
