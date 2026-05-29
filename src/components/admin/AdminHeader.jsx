/* eslint-disable react/prop-types */
import { auth } from "../../utils/firebase";

const AdminHeader = ({ onMigrate }) => {
    return (
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-additional to-stone-400 bg-clip-text text-transparent">
                    Admin Dashboard
                </h1>
                <p className="text-stone-400 mt-2">Manage your portfolio projects dynamically</p>
            </div>
            <div className="flex flex-wrap gap-4">
                <button 
                    onClick={onMigrate} 
                    className="bg-blue-600/20 text-blue-400 px-6 py-2 rounded-xl transition-all border border-blue-500/20 hover:bg-blue-600/30 text-sm font-medium"
                >
                    Migrate Static
                </button>
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
