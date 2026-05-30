/* eslint-disable react/prop-types */
import { auth } from "../../utils/firebase";
import { Link } from "react-router-dom";
import { Icon } from "@iconify-icon/react";

const AdminHeader = ({ onMigrate, migrating }) => {
    return (
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <Link to="/" className="w-10 h-10 rounded-xl bg-stone-900 border border-white/10 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition-all active:scale-90" title="Back to Home">
                        <Icon icon="solar:home-2-bold" width="22" />
                    </Link>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-additional to-stone-400 bg-clip-text text-transparent">
                        Admin Dashboard
                    </h1>
                </div>
                <p className="text-stone-400 mt-2">Manage your portfolio projects dynamically</p>
            </div>
            <div className="flex flex-wrap gap-4">

                <button 
                    onClick={() => auth.signOut()} 
                    className="bg-stone-800 hover:bg-red-900/30 text-stone-300 hover:text-red-400 px-6 py-2 rounded-xl transition-all border border-white/5 text-sm font-medium"
                >
                    Sign Out
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;
