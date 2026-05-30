import { useState, useCallback } from 'react';
import { db } from '../../utils/firebase';
import { collection, addDoc, getDocs, doc, query, orderBy, updateDoc } from "firebase/firestore";

export const useAdminCertificates = (showNotify) => {
    const [certificates, setCertificates] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        issuer: "",
        date: "",
        credentialUrl: "",
        category: "Frontend",
        fileUrl: "",
        fileType: "image",
        skills: [],
        color: "#61DAFB"
    });
    const [file, setFile] = useState(null);
    const [techInput, setTechInput] = useState("");
    const [techColor, setTechColor] = useState("#61DAFB");

    const fetchCertificates = useCallback(async () => {
        setFetching(true);
        try {
            const q = query(collection(db, "certificates"), orderBy("date", "desc"));
            const querySnapshot = await getDocs(q);
            const certsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCertificates(certsData);
        } catch (error) {
            console.error("Error fetching certificates:", error);
            showNotify("Failed to fetch certificates database", "error");
        } finally {
            setFetching(false);
        }
    }, [showNotify]);

    const resetForm = useCallback(() => {
        setFormData({
            title: "", issuer: "", date: "", credentialUrl: "", 
            category: "Frontend", fileUrl: "", fileType: "image", 
            skills: [], color: "#61DAFB"
        });
        setFile(null);
    }, []);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        if (name === "reset_form") {
            resetForm();
            return;
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    }, [resetForm]);

    const handleAddSkill = useCallback((skill) => {
        if (skill) {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, skill.split(':').pop()]
            }));
            setTechInput(""); // Reset after add
        }
    }, []);

    const removeSkill = useCallback((index) => {
        setFormData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
    }, []);

    const uploadFile = async (file) => {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
        
        const isPdf = file.type === 'application/pdf';
        const resourceType = isPdf ? 'raw' : 'image';

        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("upload_preset", uploadPreset);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
            { method: "POST", body: uploadData }
        );

        if (!response.ok) throw new Error("Cloudinary upload failed");
        const data = await response.json();
        return { url: data.secure_url, type: isPdf ? 'pdf' : 'image' };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        try {
            let { fileUrl, fileType } = formData;
            if (file) {
                const uploaded = await uploadFile(file);
                fileUrl = uploaded.url;
                fileType = uploaded.type;
            }

            const certToSave = {
                ...formData,
                fileUrl,
                fileType,
                updatedAt: new Date().toISOString()
            };

            if (formData.id) {
                const { id, ...dataToUpdate } = certToSave;
                await updateDoc(doc(db, "certificates", id), dataToUpdate);
                showNotify("Certificate updated!");
            } else {
                await addDoc(collection(db, "certificates"), {
                    ...certToSave,
                    createdAt: new Date().toISOString()
                });
                showNotify("Certificate added!");
            }

            resetForm();
            fetchCertificates();
        } catch (error) {
            showNotify(error.message, "error");
        } finally {
            setUploading(false);
        }
    };

    return {
        certificates,
        formData,
        setFormData,
        file,
        setFile,
        uploading,
        fetching,
        fetchCertificates,
        handleInputChange,
        handleSubmit,
        handleAddSkill,
        removeSkill,
        resetForm,
        techInput,
        setTechInput,
        techColor,
        setTechColor
    };
};
