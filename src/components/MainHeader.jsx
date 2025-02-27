// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify-icon/react";
import { useTranslation } from "react-i18next";
import DropdownLanguages from './DropdownLanguages';

const MainHeader = () => {
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

                <DropdownLanguages />

                 {/* Button untuk menu mobile */}
                 <span className="flex items-center gap-2">
                    <Icon icon="hugeicons:menu-01" width="26" height="26" className={`md:hidden text-secondary active:text-white `}/>
                 </span>
            </nav>
        </header>
    );
};

export default MainHeader;
