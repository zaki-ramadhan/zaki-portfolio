import ProjectCard, { projectsCache } from '@components/ProjectCard';
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Icon } from "@iconify-icon/react";
import { projectData as staticProjectData } from "@utils/projectData";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../utils/firebase";

const categories = ["All", "Web", "Mobile", "Full-Stack", "Frontend", "Individual", "Collaboration"];

export default function ProjectSection() {
	const { t } = useTranslation();
    const [allProjects, setAllProjects] = useState(() => {
        const cached = localStorage.getItem('portfolio_projects');
        if (cached) return JSON.parse(cached);
        return projectsCache || [...staticProjectData].reverse();
    });
    const [isLoading, setIsLoading] = useState(!projectsCache);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
            const timeoutId = setTimeout(() => setIsLoading(false), 4000);
            try {
                const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const dynamicProjects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
                const filteredStatic = staticProjectData.filter(s => !dynamicProjects.some(d => d.name === s.name));
                const mergedProjects = [...dynamicProjects, ...filteredStatic.reverse()];
                
                setAllProjects(mergedProjects);
                localStorage.setItem('portfolio_projects', JSON.stringify(mergedProjects));
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                clearTimeout(timeoutId);
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearch(searchTerm), 400);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Calculate counts for each category
    const getCategoryCount = (cat) => {
        if (cat === "All") return allProjects.length;
        if (cat === "Individual" || cat === "Collaboration") {
            return allProjects.filter(p =>
                (typeof p.status === 'string' && p.status.includes(cat)) ||
                (p.status_en?.includes(cat)) ||
                (p.status_id?.includes(cat))
            ).length;
        }
        return allProjects.filter(p => p.category === cat).length;
    };

    const [visibleCount, setVisibleCount] = useState(6);

    const filteredProjects = allProjects.filter(p => {
        let matchesCategory = selectedCategory === "All";
        if (selectedCategory === "Individual" || selectedCategory === "Collaboration") {
            matchesCategory =
                (typeof p.status === 'string' && p.status.includes(selectedCategory)) ||
                (p.status_en?.includes(selectedCategory)) ||
                (p.status_id?.includes(selectedCategory));
        } else if (selectedCategory !== "All") {
            matchesCategory = p.category === selectedCategory;
        }

        const matchesSearch = p.name?.toLowerCase().includes(debouncedSearch.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const displayProjects = filteredProjects.slice(0, visibleCount);
    const hasMore = filteredProjects.length > visibleCount;

	return (
		<section
			id="projects"
			className="container mx-auto py-4 mt-16 lg:mt-12"
		>
			<div className="w-full flex flex-col space-y-6 mb-8">
				<div className="flex items-center w-full">
                    <h1 className="heading text-nowrap text-2xl md:text-3xl lg:text-4xl ml-1">
                        {t("projectSection.title")}
                    </h1>
                    <span className="inline w-full grow h-[0.05rem] bg-gradient-to-r from-stone-400 from-20% to-stone-200/0 ml-4"></span>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* Category Chips - Scrollable on mobile */}
                    <div className="flex overflow-x-auto pb-2 md:pb-0 md:flex-wrap gap-2 order-2 md:order-1 no-scrollbar scroll-smooth">
                        <div className="flex flex-nowrap md:flex-wrap gap-2">
                        {categories.map((cat) => {
                            const count = getCategoryCount(cat);
                            return (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setSelectedCategory(cat);
                                        setVisibleCount(6); // Reset count on category change
                                    }}
                                    className={`px-4 py-2.5 rounded-xl text-sm md:text-[15px] font-Archivo font-medium transition-all duration-300 border flex items-center gap-2 whitespace-nowrap ${
                                        selectedCategory === cat
                                            ? "bg-additional text-stone-900 border-additional shadow-lg shadow-additional/20"
                                            : "bg-stone-900/40 text-stone-400 border-white/5 hover:border-white/20 hover:text-white"
                                    }`}
                                >
                                    <span>{cat}</span>
                                    <span className={`text-[13px] md:text-[14px] font-bold px-2 py-0.5 rounded-lg transition-all ${
                                        selectedCategory === cat 
                                            ? "bg-stone-900/20 text-stone-900" 
                                            : "bg-white/10 text-stone-300"
                                    }`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                        </div>
                    </div>

                    <div className="relative w-full md:w-80 lg:w-[420px] order-1 md:order-2">
                        <Icon icon="solar:magnifer-broken" className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" width="20" />
                        <input 
                            type="text"
                            placeholder={t("projectSection.searchPlaceholder")}
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setVisibleCount(6); // Reset count on search
                            }}
                            className="w-full bg-stone-900/80 border border-white/15 rounded-xl py-3.5 pl-12 pr-4 text-sm md:text-base font-Archivo font-medium outline-none focus:ring-1 focus:ring-additional/50 focus:border-additional/30 transition-all placeholder:text-stone-500"
                        />
                        {searchTerm && (
                            <button 
                                onClick={() => {
                                    setSearchTerm("");
                                    setVisibleCount(6);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white transition-colors flex items-center justify-center font-bold"
                            >
                                <Icon icon="solar:close-circle-broken" width="20" />
                            </button>
                        )}
                    </div>
                </div>
			</div>
			
            <div className="grid lg:grid-cols-2 gap-6">
                <ProjectCard 
                    projects={displayProjects}
                    isLoading={isLoading}
                />
            </div>

            {hasMore && (
                <div className="flex justify-center mt-12 mb-4">
                    <button 
                        onClick={() => setVisibleCount(prev => prev + 6)}
                        className="group flex flex-col items-center gap-3 text-secondary hover:text-additional transition-all duration-300"
                    >
                        <span className="font-Archivo text-sm font-medium tracking-widest uppercase">{t("projectSection.showMore") || "Show More"}</span>
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-additional/30 group-hover:bg-additional/5 transition-all">
                            <Icon icon="solar:alt-arrow-down-broken" width="24" className="group-hover:translate-y-1 transition-transform" />
                        </div>
                    </button>
                </div>
            )}
		</section>
	);
}
