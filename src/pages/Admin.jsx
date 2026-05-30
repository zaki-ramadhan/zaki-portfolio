import { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "../utils/useAuth";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import { db } from "../utils/firebase";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";

// Hooks
import { useAdminProjects } from "../hooks/admin/useAdminProjects";
import { useAdminCertificates } from "../hooks/admin/useAdminCertificates";
import { useAdminMessages } from "../hooks/admin/useAdminMessages";

// UI Components
import AdminHeader from "../components/admin/AdminHeader";
import AdminToasts from "../components/admin/ui/AdminToasts";
import { DeleteModal, MigrateModal } from "../components/admin/ui/AdminModals";
import ProjectForm from "../components/admin/ProjectForm";
import ProjectList from "../components/admin/ProjectList";
import MessageList from "../components/admin/MessageList";
import CertificateForm from "../components/admin/CertificateForm";
import CertificateList from "../components/admin/CertificateList";

const Admin = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState("projects");
    const [notification, setNotification] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [deleteType, setDeleteType] = useState('project');
    const [migrateConfirm, setMigrateConfirm] = useState(false);
    const [migrating, setMigrating] = useState(false);

    // Initial state for form logic that isn't inside hooks (like pagination)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [certCurrentPage, setCertCurrentPage] = useState(1);
    const [certItemsPerPage, setCertItemsPerPage] = useState(6);

    const showNotify = useCallback((message, type = "success") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    }, []);

    // Custom Hooks Integration
    const proj = useAdminProjects(showNotify);
    const cert = useAdminCertificates(showNotify);
    const msg = useAdminMessages(showNotify);

    useEffect(() => {
        if (!loading && !user) navigate("/login");
    }, [user, loading, navigate]);

    useEffect(() => {
        if (user) {
            if (activeView === 'projects') proj.fetchProjects();
            if (activeView === 'messages') msg.fetchMessages();
            if (activeView === 'certificates') cert.fetchCertificates();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, activeView]);

    const handleEdit = (project) => {
        proj.setFormData({
            ...project,
            desc_en: project.desc_en || (project.desc?.includes("projectCard") ? "" : project.desc) || "",
            desc_id: project.desc_id || (project.desc?.includes("projectCard") ? "" : project.desc) || "",
            status_en: project.status_en || (project.status?.includes("projectCard") ? "" : project.status) || "",
            status_id: project.status_id || (project.status?.includes("projectCard") ? "" : project.status) || "",
        });
        setActiveView('projects');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCertEdit = (certificate) => {
        cert.setFormData(certificate);
        setActiveView('certificates');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id, type) => {
        setDeleteType(type);
        setDeleteConfirm(id);
    };

    const confirmDelete = async () => {
        try {
            const collectionName = deleteType === 'project' ? 'projects' : (deleteType === 'message' ? 'messages' : 'certificates');
            await deleteDoc(doc(db, collectionName, deleteConfirm));
            showNotify(`${deleteType} deleted`);
            if (deleteType === 'project') proj.fetchProjects();
            if (deleteType === 'message') msg.fetchMessages();
            if (deleteType === 'certificate') cert.fetchCertificates();
        } catch {
            showNotify("Delete failed", "error");
        } finally {
            setDeleteConfirm(null);
        }
    };

    const confirmMigrate = async () => {
        setMigrateConfirm(false);
        setMigrating(true);
        try {
            const { projectData: staticProjects } = await import("../utils/projectData");
            let count = 0;
            for (const p of staticProjects) {
                if (!proj.projects.some(exist => exist.name === p.name)) {
                    await addDoc(collection(db, "projects"), { ...p, createdAt: new Date().toISOString() });
                    count++;
                }
            }
            showNotify(`Synced ${count} projects`);
            proj.fetchProjects();
        } catch {
            showNotify("Sync failed", "error");
        } finally {
            setMigrating(false);
        }
    };

    const paginatedProjects = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return proj.projects.slice(start, start + itemsPerPage);
    }, [proj.projects, currentPage, itemsPerPage]);

    const paginatedCertificates = useMemo(() => {
        const start = (certCurrentPage - 1) * certItemsPerPage;
        return cert.certificates.slice(start, start + certItemsPerPage);
    }, [cert.certificates, certCurrentPage, certItemsPerPage]);

    if (loading) return (
        <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-white gap-4 font-Archivo">
            <div className="w-12 h-12 border-4 border-additional/30 border-t-additional rounded-full animate-spin"></div>
            <p className="text-stone-400 animate-pulse">Authenticating Admin...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-stone-950 text-white font-Archivo p-4 md:p-8 selection:bg-emerald-500/30 relative">
            <AdminToasts notification={notification} onClose={() => setNotification(null)} />
            
            <div className="max-w-6xl mx-auto">
                <DeleteModal 
                    isOpen={!!deleteConfirm} 
                    type={deleteType} 
                    onClose={() => setDeleteConfirm(null)} 
                    onConfirm={confirmDelete} 
                />
                <MigrateModal 
                    isOpen={migrateConfirm} 
                    onClose={() => setMigrateConfirm(false)} 
                    onConfirm={confirmMigrate} 
                />

                <AdminHeader onMigrate={() => setMigrateConfirm(true)} migrating={migrating} />

                {/* View Switcher */}
                <div className="flex gap-4 mb-10 bg-black/40 p-1.5 rounded-[28px] w-fit border border-white/5 mx-auto">
                    {[
                        { id: 'projects', icon: 'solar:folder-with-files-bold', label: 'Projects' },
                        { id: 'certificates', icon: 'solar:medal-star-bold', label: 'Certificates' },
                        { id: 'messages', icon: 'solar:letter-bold', label: 'Messages', hasBadge: msg.messages.length > 0 }
                    ].map(view => (
                        <button 
                            key={view.id}
                            onClick={() => setActiveView(view.id)}
                            className={`px-8 py-3 rounded-[22px] text-sm font-bold transition-all flex items-center gap-3 ${activeView === view.id ? 'bg-stone-800 text-white shadow-xl ring-1 ring-white/10' : 'text-stone-500 hover:text-stone-300'}`}
                        >
                            <Icon icon={view.icon} width="18" />
                            {view.label}
                            {view.hasBadge && <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />}
                        </button>
                    ))}
                </div>

                {activeView === 'projects' ? (
                    <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom duration-500">
                        <ProjectForm 
                            formData={proj.formData}
                            onInputChange={proj.handleInputChange}
                            handleSubmit={(e) => proj.handleSubmit(e, proj.projects)}
                            uploading={proj.uploading}
                            handleAddTech={proj.handleAddTech}
                            removeTech={proj.removeTech}
                            setImageFile={proj.setImageFile}
                            imageFile={proj.imageFile}
                            suggestions={proj.suggestions}
                            techInput={proj.techInput}
                            setTechInput={proj.setTechInput}
                            techColor={proj.techColor}
                            setTechColor={proj.setTechColor}
                        />
                        <ProjectList 
                            projects={paginatedProjects}
                            totalData={proj.projects.length}
                            currentPage={currentPage}
                            totalPages={Math.ceil(proj.projects.length / itemsPerPage)}
                            onPageChange={setCurrentPage}
                            itemsPerPage={itemsPerPage}
                            onItemsPerPageChange={(v) => { setItemsPerPage(v); setCurrentPage(1); }}
                            onDelete={(id) => handleDelete(id, 'project')}
                            onEdit={handleEdit}
                            editingId={proj.formData.id}
                        />
                    </div>
                ) : activeView === 'certificates' ? (
                    <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom duration-500">
                        <CertificateForm 
                            formData={cert.formData}
                            onInputChange={cert.handleInputChange}
                            handleSubmit={cert.handleSubmit}
                            uploading={cert.uploading}
                            handleAddTech={cert.handleAddSkill}
                            removeTech={cert.removeSkill}
                            setCertificateFile={cert.setFile}
                            certificateFile={cert.file}
                            suggestions={proj.suggestions}
                            techInput={cert.techInput}
                            setTechInput={cert.setTechInput}
                            techColor={cert.techColor}
                            setTechColor={cert.setTechColor}
                        />
                        <CertificateList 
                            certificates={paginatedCertificates}
                            fetching={cert.fetching}
                            totalData={cert.certificates.length}
                            currentPage={certCurrentPage}
                            totalPages={Math.ceil(cert.certificates.length / certItemsPerPage)}
                            onPageChange={setCertCurrentPage}
                            itemsPerPage={certItemsPerPage}
                            onItemsPerPageChange={(v) => { setCertItemsPerPage(v); setCertCurrentPage(1); }}
                            onDelete={(id) => handleDelete(id, 'certificate')}
                            onEdit={handleCertEdit}
                            editingId={cert.formData.id}
                        />
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom duration-500">
                        <MessageList 
                            messages={msg.messages} 
                            onDelete={(id) => handleDelete(id, 'message')}
                            fetching={msg.fetching} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
