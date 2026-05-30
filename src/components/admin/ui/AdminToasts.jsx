/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react";

const AdminToasts = ({ notification, onClose }) => {
    if (!notification) return null;

    return (
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
            <button onClick={onClose} className="ml-4 opacity-30 hover:opacity-100 transition-opacity p-1">
                <Icon icon="solar:close-circle-bold" width="18" />
            </button>
        </div>
    );
};

export default AdminToasts;
