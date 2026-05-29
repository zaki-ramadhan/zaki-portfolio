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
                className="group relative w-12 h-12 bg-stone-900/80 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl hover:border-additional/30 hover:scale-110 active:scale-90 transition-all duration-300"
                aria-label="Scroll to top"
            >
                <div className="absolute inset-0 bg-additional/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <Icon 
                    icon="solar:alt-arrow-up-linear" 
                    width="24" 
                    className="text-stone-400 group-hover:text-additional transition-colors" 
                />
            </button>
        </div>
    );
};

export default ScrollToTop;
