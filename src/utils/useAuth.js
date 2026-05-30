import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

const SESSION_KEY = "admin_session_start";
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const sessionStart = sessionStorage.getItem(SESSION_KEY);

                if (!sessionStart) {
                    // Fresh login — stamp the time
                    sessionStorage.setItem(SESSION_KEY, Date.now().toString());
                    setUser(currentUser);
                } else {
                    const elapsed = Date.now() - parseInt(sessionStart, 10);
                    if (elapsed > SESSION_DURATION_MS) {
                        // Session expired — force logout
                        sessionStorage.removeItem(SESSION_KEY);
                        signOut(auth);
                        setUser(null);
                    } else {
                        setUser(currentUser);
                    }
                }
            } else {
                sessionStorage.removeItem(SESSION_KEY);
                setUser(null);
            }
            setLoading(false);
        });

        // Periodic check every minute to catch expiry while tab is open
        const interval = setInterval(() => {
            const sessionStart = sessionStorage.getItem(SESSION_KEY);
            if (sessionStart) {
                const elapsed = Date.now() - parseInt(sessionStart, 10);
                if (elapsed > SESSION_DURATION_MS) {
                    sessionStorage.removeItem(SESSION_KEY);
                    signOut(auth);
                }
            }
        }, 60_000);

        return () => {
            unsubscribe();
            clearInterval(interval);
        };
    }, []);

    return { user, loading };
};
