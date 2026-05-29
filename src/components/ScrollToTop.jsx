import { useState, useEffect } from "react";
import { Icon } from "@iconify-icon/react";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled up to a certain distance
    const toggleVisibility = () => {
        if (window.pageYOffset > 500) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top coordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className={`fixed bottom-8 right-8 z-[90] transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'}`}>
            <button
                onClick={scrollToTop}
                className="group relative w-12 h-12 bg-gradient-to-br from-stone-700/90 via-stone-800/90 to-stone-950/95 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:border-additional/50 hover:scale-110 active:scale-90 transition-all duration-300"
                aria-label="Scroll to top"
            >
                <div className="absolute inset-0 bg-additional/20 opacity-0 group-hover:opacity-100 blur-2xl rounded-full transition-opacity" />
                <Icon 
                    icon="solar:alt-arrow-up-linear" 
                    width="24" 
                    className="relative z-10 text-white transition-colors" 
                />
            </button>
        </div>
    );
};

export default ScrollToTop;
