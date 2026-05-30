import { useState, useCallback, useMemo } from 'react';
import { db } from '../../utils/firebase';
import { collection, addDoc, getDocs, doc, query, orderBy, updateDoc } from "firebase/firestore";

export const useAdminProjects = (showNotify) => {
    const [projects, setProjects] = useState([]);
    const [uploading, setUploading] = useState(false);
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
    const [techInput, setTechInput] = useState("");
    const [techColor, setTechColor] = useState("#61DAFB");

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
    }, [showNotify]);

    const resetForm = useCallback(() => {
        setFormData({
            name: "", desc_en: "", desc_id: "", link: "", status_en: "", status_id: "", 
            category: "Web", is_published: true, styleName: "Default",
            colors: { 
                titleColor: "text-primary", bgColor: "from-white to-slate-200", 
                btnColor: "bg-secondary/10", iconsBgColor: "bg-white/20", 
                overlayColor: "from-slate-200 to-slate-200/0" 
            },
            techs: []
        });
        setImageFile(null);
    }, []);

    const handleInputChange = useCallback((e) => {
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
    }, [resetForm]);

    const handleAddTech = useCallback((icon, color) => {
        if (icon) {
            setFormData(prev => ({ 
                ...prev, 
                techs: [...prev.techs, { icon, color }] 
            }));
            setTechInput(""); // Reset after add
        }
    }, []);

    const removeTech = useCallback((index) => {
        setFormData(prev => ({ ...prev, techs: prev.techs.filter((_, i) => i !== index) }));
    }, []);

    const uploadImage = async (file) => {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("upload_preset", uploadPreset);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            { method: "POST", body: uploadData }
        );

        if (!response.ok) throw new Error("Cloudinary upload failed");
        const data = await response.json();
        return data.secure_url;
    };

    const handleSubmit = async (e, projects) => {
        e.preventDefault();
        
        // Validation logic
        if (!formData.name?.trim()) {
            showNotify("Project Name is required", "error");
            return false;
        }

        const normalizedName = formData.name.trim().toLowerCase();
        const duplicate = projects.find(p => p.name.trim().toLowerCase() === normalizedName && p.id !== formData.id);
        if (duplicate) {
            showNotify(`Project name "${formData.name}" already exists!`, "error");
            return false;
        }

        // Bilingual Sync
        const finalDescEn = formData.desc_en?.trim() || formData.desc_id?.trim();
        const finalDescId = formData.desc_id?.trim() || formData.desc_en?.trim();
        const finalStatusEn = formData.status_en?.trim() || formData.status_id?.trim();
        const finalStatusId = formData.status_id?.trim() || formData.status_en?.trim();

        if (!finalDescEn || !finalStatusEn) {
            showNotify("Description and Status are required", "error");
            return false;
        }

        setUploading(true);
        try {
            let imageUrl = formData.preview || "";
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            const projectToSave = {
                ...formData,
                desc_en: finalDescEn,
                desc_id: finalDescId,
                status_en: finalStatusEn,
                status_id: finalStatusId,
                preview: imageUrl,
                updatedAt: new Date().toISOString()
            };

            if (formData.id) {
                const { id, ...dataToUpdate } = projectToSave;
                await updateDoc(doc(db, "projects", id), dataToUpdate);
                showNotify("Project successfully updated!");
            } else {
                await addDoc(collection(db, "projects"), {
                    ...projectToSave,
                    createdAt: new Date().toISOString()
                });
                showNotify("Project successfully added!");
            }

            resetForm();
            fetchProjects();
            return true;
        } catch (error) {
            console.error("Submit Error:", error);
            showNotify(error.message, "error");
            return false;
        } finally {
            setUploading(false);
        }
    };

    const suggestions = useMemo(() => ({
        icons: Array.from(new Set(projects.flatMap(p => p.techs?.map(t => t.icon) || []))),
        categories: Array.from(new Set(projects.map(p => p.category).filter(Boolean))),
        statuses: Array.from(new Set(projects.flatMap(p => [p.status_en, p.status_id]).filter(Boolean))),
        colorPresets: Array.from(new Map(projects.map(p => [JSON.stringify(p.colors), p.colors])).values())
    }), [projects]);

    return {
        projects,
        formData,
        setFormData,
        imageFile,
        setImageFile,
        uploading,
        fetchProjects,
        handleInputChange,
        handleSubmit,
        handleAddTech,
        removeTech,
        resetForm,
        suggestions,
        techInput,
        setTechInput,
        techColor,
        setTechColor
    };
};
