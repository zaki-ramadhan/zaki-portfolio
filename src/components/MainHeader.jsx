/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react";
import { useTranslation } from "react-i18next";

const MainHeader = ({children}) => {
    const {t} = useTranslation();
    
    return (
        <header id="main-header" className="container mx-auto -mb-1 sm:mb-0 px-6 pb-2 md:px-12 lg:px-14 pt-7 md:pb-2 flex justify-between z-50">
            <div className="dev-name">
                <h1 className="inline text-lg md:text-xl lg:text-base">Zaki R<span className="hidden sm:inline-block">amadhan</span></h1>
                <span className="text-secondary text-base md:text-xl lg:text-base">, Front-End</span>
            </div>

            <nav className="flex items-center gap-4 relative">
                <ul className="hidden md:flex md:gap-7 lg:gap-12 text-secondary text-lg *:hover:text-white *:active:text-white *:duration-100 lg:text-base">
                    <li><a href="">{t("header.present")}</a></li>
                    <li><a href="#projects">{t("header.projects")}</a></li>
                    <li><a href="">{t("header.contact")}</a></li>
                </ul>

                {children}

                 {/* Button untuk menu mobile */}
                 <span className="flex items-center gap-2">
                    <Icon icon="hugeicons:menu-01" width="26" height="26" className={`md:hidden text-secondary active:text-white `}/>
                 </span>
                 </nav>
                 {/* <nav id="mobile-menu" className={`container fixed top-0 left-0 w-screen h-0 bg-primary z-50 p-12`}>
                    <ul className="flex flex-col items-center gap-6 text-secondary text-xl *:hover:text-white *:active:text-white">
                        <li><a href="">Present</a></li>
                        <li><a href="">Projects</a></li>
                        <li><a href="">Skillls</a></li>
                    </ul>
            </nav> */}
        </header>
    );
};

export default MainHeader;
