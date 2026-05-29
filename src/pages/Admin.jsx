import { useState, useEffect } from "react";
import { useAuth } from "../utils/useAuth";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../utils/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Sub-components
import AdminHeader from "../components/admin/AdminHeader";
import ProjectForm from "../components/admin/ProjectForm";
import ProjectList from "../components/admin/ProjectList";

const Admin = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        desc: "",
        link: "",
        status: "Project Ongoing",
        is_published: true,
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
    const [techInput, setTechInput] = useState("");

    useEffect(() => {
        if (!loading && !user) navigate("/login");
        if (user) fetchProjects();
    }, [user, loading, navigate]);

    const fetchProjects = async () => {
        try {
            const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProjects(projectsData);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.includes("colors.")) {
            const colorField = name.split(".")[1];
            setFormData(prev => ({
                ...prev,
                colors: { ...prev.colors, [colorField]: value }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value
            }));
        }
    };

    const handleAddTech = () => {
        if (techInput) {
            setFormData(prev => ({ ...prev, techs: [...prev.techs, { icon: techInput }] }));
            setTechInput("");
        }
    };

    const removeTech = (index) => {
        setFormData(prev => ({ ...prev, techs: prev.techs.filter((_, i) => i !== index) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        try {
            let imageUrl = formData.preview || "";
            if (imageFile) {
                const storageRef = ref(storage, `projects/${Date.now()}_${imageFile.name}`);
                await uploadBytes(storageRef, imageFile);
                imageUrl = await getDownloadURL(storageRef);
            }

            const projectToSave = {
                ...formData,
                preview: imageUrl,
                createdAt: new Date().toISOString()
            };

            await addDoc(collection(db, "projects"), projectToSave);
            alert("Project added successfully!");
            resetForm();
            fetchProjects();
        } catch (error) {
            console.error("Error adding project:", error);
            alert("Error adding project");
        } finally {
            setUploading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "", desc: "", link: "", status: "Project Ongoing", is_published: true,
            colors: { titleColor: "text-primary", bgColor: "from-white to-slate-200", btnColor: "bg-secondary/10", iconsBgColor: "bg-white/20", overlayColor: "from-slate-200 to-slate-200/0" },
            techs: []
        });
        setImageFile(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                await deleteDoc(doc(db, "projects", id));
                fetchProjects();
            } catch (error) {
                console.error("Error deleting project:", error);
            }
        }
    };

    const handleMigrate = async () => {
        if (window.confirm("Migrate all static projects to Firestore?")) {
            setUploading(true);
            try {
                const { projectData: staticProjects } = await import("../utils/projectData");
                for (const project of staticProjects) {
                    if (!projects.some(p => p.name === project.name)) {
                        await addDoc(collection(db, "projects"), {
                            ...project,
                            createdAt: new Date().toISOString(),
                        });
                    }
                }
                alert("Migration complete!");
                fetchProjects();
            } catch (error) {
                console.error("Migration failed:", error);
            } finally {
                setUploading(false);
            }
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-white gap-4 font-Archivo">
            <div className="w-12 h-12 border-4 border-additional/30 border-t-additional rounded-full animate-spin"></div>
            <p className="text-stone-400 animate-pulse">Authenticating Admin...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-stone-950 text-white font-Archivo p-4 md:p-8 selection:bg-emerald-500/30">
            <div className="max-w-6xl mx-auto">
                <AdminHeader onMigrate={handleMigrate} />

                <div className="grid lg:grid-cols-3 gap-8">
                    <ProjectForm 
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleSubmit}
                        uploading={uploading}
                        techInput={techInput}
                        setTechInput={setTechInput}
                        handleAddTech={handleAddTech}
                        removeTech={removeTech}
                        setImageFile={setImageFile}
                    />
                    <ProjectList 
                        projects={projects}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    );
};

export default Admin;
