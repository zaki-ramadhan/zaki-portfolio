import { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "../utils/useAuth";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import { db } from "../utils/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, updateDoc } from "firebase/firestore";
// Firebase Storage removed in favor of Cloudinary

// Sub-components
import AdminHeader from "../components/admin/AdminHeader";
import ProjectForm from "../components/admin/ProjectForm";
import ProjectList from "../components/admin/ProjectList";
import MessageList from "../components/admin/MessageList";

const Admin = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState("projects"); // 'projects' or 'messages'
    const [projects, setProjects] = useState([]);
    const [messages, setMessages] = useState([]);
    const [fetchingMessages, setFetchingMessages] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        desc_en: "",
        desc_id: "",
        link: "",
        status_en: "",
        status_id: "",
        category: "Web",
        is_published: true,
        styleName: "Default",
        colors: {
            titleColor: "text-primary",
            bgColor: "from-white to-slate-200",
            btnColor: "bg-secondary/10",
            iconsBgColor: "bg-white/20",
            overlayColor: "from-slate-200 to-slate-200/0",
        },
        techs: []
    });
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [migrating, setMigrating] = useState(false);
    const [techInput, setTechInput] = useState("");
    const [techColor, setTechColor] = useState("#FFFFFF"); // Default White
    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null); // id of object to delete
    const [deleteType, setDeleteType] = useState('project'); // 'project' or 'message'
    const [migrateConfirm, setMigrateConfirm] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const showNotify = (message, type = "success") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    };

    const fetchProjects = useCallback(async () => {
        try {
            const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProjects(projectsData);
        } catch (error) {
            console.error("Error fetching projects:", error);
            showNotify("Failed to fetch projects database", "error");
        }
    }, []);

    const fetchMessages = useCallback(async () => {
        setFetchingMessages(true);
        try {
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const messagesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(messagesData);
        } catch (error) {
            console.error("Error fetching messages:", error);
            showNotify("Failed to fetch messages database", "error");
        } finally {
            setFetchingMessages(false);
        }
    }, []);

    useEffect(() => {
        if (!loading && !user) navigate("/login");
        if (user) {
            if (activeView === 'projects') fetchProjects();
            if (activeView === 'messages') fetchMessages();
        }
    }, [user, loading, navigate, fetchProjects, fetchMessages, activeView]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === "reset_form") {
            resetForm();
            return;
        }
        if (name === "colors_preset") {
            setFormData(prev => ({ ...prev, colors: value }));
        } else if (name.includes("colors.")) {
            const colorField = name.split(".")[1];
            setFormData(prev => ({
                ...prev,
                colors: { ...prev.colors, [colorField]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
        }
    };

    const handleAddTech = (icon, color) => {
        const iconToAdd = icon || techInput;
        const colorToAdd = color || techColor;
        if (iconToAdd) {
            setFormData(prev => ({ 
                ...prev, 
                techs: [...prev.techs, { icon: iconToAdd, color: colorToAdd }] 
            }));
            setTechInput("");
        }
    };

    const removeTech = (index) => {
        setFormData(prev => ({ ...prev, techs: prev.techs.filter((_, i) => i !== index) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation Logic with Specific Messages
        const newErrors = {};
        const missingFields = [];

        if (!formData.name?.trim()) {
            newErrors.name = true;
            missingFields.push("Project Name");
        }

        // Bilingual Fallback: logic if one is empty, use the other
        const finalDescEn = formData.desc_en?.trim() || formData.desc_id?.trim();
        const finalDescId = formData.desc_id?.trim() || formData.desc_en?.trim();
        const finalStatusEn = formData.status_en?.trim() || formData.status_id?.trim();
        const finalStatusId = formData.status_id?.trim() || formData.status_en?.trim();

        if (!finalDescEn) {
            newErrors.desc_en = true;
            missingFields.push("Description");
        }
        if (!finalStatusEn) {
            newErrors.status_en = true;
            missingFields.push("Status");
        }
        if (!formData.link?.trim()) {
            newErrors.link = true;
            missingFields.push("Project Link");
        }
        if (!formData.category?.trim()) {
            newErrors.category = true;
            missingFields.push("Category");
        }
        if (!imageFile && !formData.preview) {
            newErrors.image = true;
            missingFields.push("Project Image");
        }

        if (missingFields.length > 0) {
            setErrors(newErrors);
            showNotify(`Required fields missing: ${missingFields.join(", ")}`, "error");
            return;
        }

        // Apply synchronized values
        formData.desc_en = finalDescEn;
        formData.desc_id = finalDescId;
        formData.status_en = finalStatusEn;
        formData.status_id = finalStatusId;
        if (!formData.styleName?.trim()) formData.styleName = "Default";

        // Check for duplicate names in database
        const normalizedName = formData.name.trim().toLowerCase();
        const normalizedStyle = formData.styleName?.trim().toLowerCase();

        const duplicateName = projects.find(p => 
            p.name.trim().toLowerCase() === normalizedName && 
            p.id !== formData.id
        );

        const duplicateStyle = projects.find(p => 
            p.styleName?.trim().toLowerCase() === normalizedStyle && 
            p.id !== formData.id
        );

        const identicalColors = projects.find(p => 
            JSON.stringify(p.colors) === JSON.stringify(formData.colors) && 
            p.id !== formData.id &&
            p.styleName?.trim().toLowerCase() !== normalizedStyle
        );

        if (duplicateName) {
            showNotify(`Project name "${formData.name}" already exists!`, "error");
            setErrors({ ...newErrors, name: true });
            return;
        }

        if (duplicateStyle) {
            showNotify(`Template style "${formData.styleName}" already exists!`, "error");
            setErrors({ ...newErrors, styleName: true });
            return;
        }

        if (identicalColors) {
            showNotify(`These colors are already used by style "${identicalColors.styleName}"!`, "error");
            setErrors({ ...newErrors, styleName: true });
            return;
        }

        setUploading(true);
        setErrors({});

        try {
            console.log("🚀 Starting upload process with Cloudinary...");
            let imageUrl = formData.preview || "";

            if (imageFile) {
                console.log("📸 Uploading image to Cloudinary:", imageFile.name);
                
                const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
                const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

                if (!cloudName || !uploadPreset) {
                    throw new Error("Cloudinary configuration missing in .env!");
                }

                const uploadData = new FormData();
                uploadData.append("file", imageFile);
                uploadData.append("upload_preset", uploadPreset);

                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                    { method: "POST", body: uploadData }
                );

                if (!response.ok) throw new Error("Cloudinary upload failed");
                
                const data = await response.json();
                imageUrl = data.secure_url;
                console.log("✅ Image uploaded to Cloudinary:", imageUrl);
            }

            console.log("💾 Saving project data to Firestore...");
            const sanitizedFormData = { ...formData };
            delete sanitizedFormData.desc;
            delete sanitizedFormData.status;
            
            const projectToSave = {
                ...sanitizedFormData,
                preview: imageUrl,
                updatedAt: new Date().toISOString()
            };

            if (formData.id) {
                console.log("📝 Updating existing project:", formData.id);
                const { id, ...dataToUpdate } = projectToSave;
                await updateDoc(doc(db, "projects", id), dataToUpdate);
                showNotify("Project successfully updated!");
            } else {
                console.log("💾 Adding new project to Firestore...");
                await addDoc(collection(db, "projects"), {
                    ...projectToSave,
                    createdAt: new Date().toISOString()
                });
                showNotify("Project successfully added!");
            }

            resetForm();
            fetchProjects();
        } catch (error) {
            console.error("❌ CRITICAL ERROR:", error);
            showNotify(error.message, "error");
        } finally {
            setUploading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "", 
            desc_en: "", 
            desc_id: "", 
            link: "", 
            status_en: "", 
            status_id: "", 
            category: "Web", 
            is_published: true,
            styleName: "Default",
            colors: { 
                titleColor: "text-primary", 
                bgColor: "from-white to-slate-200", 
                btnColor: "bg-secondary/10", 
                iconsBgColor: "bg-white/20", 
                overlayColor: "from-slate-200 to-slate-200/0" 
            },
            techs: []
        });
        setImageFile(null);
    };

    const handleEdit = (project) => {
        setFormData({
            ...project,
            desc_en: project.desc_en || (project.desc?.includes("projectCard") ? "" : project.desc) || "",
            desc_id: project.desc_id || (project.desc?.includes("projectCard") ? "" : project.desc) || "",
            status_en: project.status_en || (project.status?.includes("projectCard") ? "" : project.status) || "",
            status_id: project.status_id || (project.status?.includes("projectCard") ? "" : project.status) || "",
        });
        setActiveView('projects');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id, type = 'project') => {
        setDeleteType(type);
        setDeleteConfirm(id);
    };

    const confirmDelete = async () => {
        if (!deleteConfirm) return;
        
        try {
            const collectionName = deleteType === 'project' ? "projects" : "messages";
            await deleteDoc(doc(db, collectionName, deleteConfirm));
            showNotify(`${deleteType === 'project' ? 'Project' : 'Message'} permanently deleted`, "success");
            if (deleteType === 'project') fetchProjects();
            else fetchMessages();
        } catch (error) {
            console.error("Error deleting:", error);
            showNotify("Failed to delete", "error");
        } finally {
            setDeleteConfirm(null);
        }
    };

    const handleMigrate = () => {
        setMigrateConfirm(true);
    };

    const confirmMigrate = async () => {
        setMigrateConfirm(false);
        setMigrating(true);
        try {
            const { projectData: staticProjects } = await import("../utils/projectData");
            let count = 0;
            for (const project of staticProjects) {
                if (!projects.some(p => p.name === project.name)) {
                    await addDoc(collection(db, "projects"), {
                        ...project,
                        createdAt: new Date().toISOString(),
                    });
                    count++;
                }
            }
            showNotify(`Migration successful! Added ${count} projects.`);
            fetchProjects();
        } catch (error) {
            console.error("Migration failed:", error);
            showNotify("Migration failed: " + error.message, "error");
        } finally {
            setMigrating(false);
        }
    };

    const suggestions = useMemo(() => {
        const icons = new Set();
        const cats = new Set();
        const stats = new Set();
        const colorPresets = new Map();
        
        projects.forEach(p => {
            if (p.techs) p.techs.forEach(t => icons.add(t.icon));
            if (p.category) cats.add(p.category);
            if (p.status) stats.add(p.status);
            if (p.colors) {
                const s = JSON.stringify(p.colors);
                if (!colorPresets.has(s)) colorPresets.set(s, p.colors);
            }
        });

        return {
            icons: Array.from(icons),
            categories: Array.from(cats),
            statuses: Array.from(stats),
            colorPresets: Array.from(colorPresets.values())
        };
    }, [projects]);

    const paginatedProjects = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return projects.slice(startIndex, startIndex + itemsPerPage);
    }, [projects, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(projects.length / itemsPerPage);

    if (loading) return (
        <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-white gap-4 font-Archivo">
            <div className="w-12 h-12 border-4 border-additional/30 border-t-additional rounded-full animate-spin"></div>
            <p className="text-stone-400 animate-pulse">Authenticating Admin...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-stone-950 text-white font-Archivo p-4 md:p-8 selection:bg-emerald-500/30 relative">
            {/* Toast Notification */}
            {notification && (
                <div className={`fixed top-8 right-8 z-[100] flex items-center gap-3 px-6 py-4 rounded-3xl border backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] animate-in slide-in-from-right duration-500 ring-1 ring-white/10 ${
                    notification.type === 'error' 
                    ? 'bg-red-500/10 border-red-500/20 text-red-500' 
                    : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                }`}>
                    <Icon 
                        icon={notification.type === 'error' ? 'solar:danger-bold' : 'solar:check-circle-bold'} 
                        width="24" 
                    />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                            {notification.type === 'error' ? 'System Alert' : 'System Message'}
                        </span>
                        <p className="text-sm font-bold tracking-tight">{notification.message}</p>
                    </div>
                    <button onClick={() => setNotification(null)} className="ml-4 opacity-30 hover:opacity-100 transition-opacity p-1">
                        <Icon icon="solar:close-circle-bold" width="18" />
                    </button>
                </div>
            )}

            <div className="max-w-6xl mx-auto">
                {/* Custom Delete Confirmation Modal */}
                {deleteConfirm && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setDeleteConfirm(null)} />
                        <div className="bg-stone-900 border border-white/10 p-8 rounded-[40px] max-w-sm w-full relative z-10 shadow-2xl animate-in zoom-in-95 duration-300">
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6 ring-8 ring-red-500/5">
                                    <Icon icon="solar:trash-bin-minimalistic-bold" className="text-red-500" width="40" />
                                </div>
                                <h3 className="text-2xl font-bold text-center mb-2 text-white">Confirmation</h3>
                                <p className="text-stone-400 text-center text-sm mb-8 leading-relaxed">
                                    Are you sure you want to delete this project? This action is permanent and cannot be undone.
                                </p>
                                <div className="flex flex-col w-full gap-3">
                                    <button 
                                        onClick={confirmDelete}
                                        className="w-full py-4 rounded-2xl bg-red-500 hover:bg-red-600 font-bold text-sm transition-all shadow-lg shadow-red-500/20 active:scale-95"
                                    >
                                        Yes, Delete Permanently
                                    </button>
                                    <button 
                                        onClick={() => setDeleteConfirm(null)}
                                        className="w-full py-4 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-sm transition-all active:scale-95"
                                    >
                                        Cancel Action
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Custom Migration Confirmation Modal */}
                {migrateConfirm && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setMigrateConfirm(false)} />
                        <div className="bg-stone-900 border border-white/10 p-8 rounded-[40px] max-w-sm w-full relative z-10 shadow-2xl animate-in zoom-in-95 duration-300">
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 ring-8 ring-emerald-500/5">
                                    <Icon icon="solar:database-bold" className="text-emerald-500" width="40" />
                                </div>
                                <h3 className="text-2xl font-bold text-center mb-2 text-white">Sync Data</h3>
                                <p className="text-stone-400 text-center text-sm mb-8 leading-relaxed">
                                    This will migrate all static projects to your Firestore database. Duplicate names will be automatically skipped.
                                </p>
                                <div className="flex flex-col w-full gap-3">
                                    <button 
                                        onClick={confirmMigrate}
                                        className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                                    >
                                        Start Database Sync
                                    </button>
                                    <button 
                                        onClick={() => setMigrateConfirm(false)}
                                        className="w-full py-4 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-sm transition-all active:scale-95"
                                    >
                                        Cancel Action
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <AdminHeader onMigrate={handleMigrate} migrating={migrating} />

                {/* View Switcher */}
                <div className="flex gap-4 mb-10 bg-black/40 p-1.5 rounded-[28px] w-fit border border-white/5 mx-auto">
                    <button 
                        onClick={() => setActiveView('projects')}
                        className={`px-8 py-3 rounded-[22px] text-sm font-bold transition-all flex items-center gap-3 ${activeView === 'projects' ? 'bg-stone-800 text-white shadow-xl ring-1 ring-white/10' : 'text-stone-500 hover:text-stone-300'}`}
                    >
                        <Icon icon="solar:folder-with-files-bold" width="18" />
                        Projects
                    </button>
                    <button 
                        onClick={() => setActiveView('messages')}
                        className={`px-8 py-3 rounded-[22px] text-sm font-bold transition-all flex items-center gap-3 ${activeView === 'messages' ? 'bg-stone-800 text-white shadow-xl ring-1 ring-white/10' : 'text-stone-500 hover:text-stone-300'}`}
                    >
                        <Icon icon="solar:letter-bold" width="18" />
                        Messages
                        {messages.length > 0 && <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />}
                    </button>
                </div>

                {activeView === 'projects' ? (
                    <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom duration-500">
                        <ProjectForm 
                            formData={formData}
                            onInputChange={handleInputChange}
                            handleSubmit={handleSubmit}
                            uploading={uploading}
                            techInput={techInput}
                            setTechInput={setTechInput}
                            techColor={techColor}
                            setTechColor={setTechColor}
                            handleAddTech={handleAddTech}
                            removeTech={removeTech}
                            setImageFile={setImageFile}
                            imageFile={imageFile}
                            suggestions={suggestions}
                            errors={errors}
                        />
                        <ProjectList 
                            projects={paginatedProjects}
                            totalData={projects.length}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            itemsPerPage={itemsPerPage}
                            onItemsPerPageChange={(val) => {
                                setItemsPerPage(val);
                                setCurrentPage(1);
                            }}
                            onDelete={(id) => handleDelete(id, 'project')}
                            onEdit={handleEdit}
                            editingId={formData.id}
                        />
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom duration-500">
                        <MessageList 
                            messages={messages} 
                            onDelete={(id) => handleDelete(id, 'message')}
                            loading={fetchingMessages} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
