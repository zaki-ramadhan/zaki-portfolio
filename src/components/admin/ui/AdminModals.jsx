/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react";

export const DeleteModal = ({ isOpen, onClose, onConfirm, type }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
            <div className="bg-stone-900 border border-white/10 p-8 rounded-[40px] max-w-sm w-full relative z-10 shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6 ring-8 ring-red-500/5">
                        <Icon icon="solar:trash-bin-minimalistic-bold" className="text-red-500" width="40" />
                    </div>
                    <h3 className="text-2xl font-bold text-center mb-2 text-white">Confirmation</h3>
                    <p className="text-stone-400 text-center text-sm mb-8 leading-relaxed">
                        Are you sure you want to delete this {type}? This action is permanent and cannot be undone.
                    </p>
                    <div className="flex flex-col w-full gap-3">
                        <button 
                            onClick={onConfirm}
                            className="w-full py-4 rounded-2xl bg-red-500 hover:bg-red-600 font-bold text-sm transition-all shadow-lg shadow-red-500/20 active:scale-95"
                        >
                            Yes, Delete {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                        <button 
                            onClick={onClose}
                            className="w-full py-4 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-sm transition-all active:scale-95"
                        >
                            Cancel Action
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const MigrateModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
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
                            onClick={onConfirm}
                            className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                        >
                            Start Database Sync
                        </button>
                        <button 
                            onClick={onClose}
                            className="w-full py-4 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-sm transition-all active:scale-95"
                        >
                            Cancel Action
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
