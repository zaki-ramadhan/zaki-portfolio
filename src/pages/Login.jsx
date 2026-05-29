import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/admin");
        } catch (err) {
            setError("Invalid credentials. Access denied.");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-950 p-4 font-Archivo">
            <div className="w-full max-w-md bg-stone-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">Admin Access</h1>
                <p className="text-stone-400 text-center mb-8 text-sm">Secure entry for project management</p>
                
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl mb-6 text-center text-sm">
                        {error}
                    </div>
                )}

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
                        
                        <span className="relative z-10">Sign In</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
