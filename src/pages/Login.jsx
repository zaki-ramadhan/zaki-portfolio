import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

    const showNotify = (message, type = "success") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            showNotify("Access Granted. Redirecting...");
            setTimeout(() => navigate("/0/admin"), 1000);
        } catch (err) {
            showNotify("Invalid credentials. Access denied.", "error");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-950 p-4 font-Archivo">
            {/* Toast Notification - Moved outside to prevent stacking context issues */}
            {notification && (
                <div className={`fixed top-8 right-8 z-[100] flex items-center gap-3 px-6 py-4 rounded-3xl border backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-right duration-500 ring-1 ring-white/10 ${
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
                            {notification.type === 'error' ? 'Access Denied' : 'System Message'}
                        </span>
                        <p className="text-sm font-bold tracking-tight">{notification.message}</p>
                    </div>
                </div>
            )}

            <div className="w-full max-w-md bg-stone-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl relative">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">Admin Access</h1>
                <p className="text-stone-400 text-center mb-8 text-sm">Secure entry for project management</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-stone-300 ml-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-stone-800/50 border border-white/5 rounded-2xl p-4 text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-additional transition-all"
                            placeholder="admin@zaki.com"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-stone-300 ml-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-stone-800/50 border border-white/5 rounded-2xl p-4 text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-additional transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="group relative overflow-hidden w-full bg-stone-950 text-white font-bold h-14 rounded-2xl active:scale-95 transition-all duration-500 ease-in-out shadow-lg shadow-black/80 hover:shadow-additional/10 mt-4 border border-additional/15 hover:border-additional/30"
                    >
                        {/* Idle Glow Layer */}
                        <div className="absolute inset-0 bg-radial-[at_50%_160%] from-additional/30 via-transparent to-transparent transition-opacity duration-500" />
                        
                        {/* Hover Glow Layer */}
                        <div className="absolute inset-0 bg-radial-[at_50%_130%] from-additional/70 via-additional/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative z-10 flex items-center justify-center gap-2">
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span className="opacity-70">Verifying...</span>
                                </>
                            ) : (
                                <>
                                    <Icon icon="solar:lock-password-bold" width="20" />
                                    <span>Sign In</span>
                                </>
                            )}
                        </div>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
