// eslint-disable-next-line no-unused-vars
import React from "react";
import {Icon} from "@iconify-icon/react";

const Header = () => {
	return (
		<header id="main-header" className="container mx-auto -mb-1 sm:mb-0 px-6 md:px-12 xl:px-20 pt-7 md:pb-4 flex justify-between">
			<div className="dev-name">
                <h1 className="inline text-base md:text-xl lg:text-base">Zaki R<span className="hidden sm:inline-block">amadhan</span></h1>
                <span className="text-secondary text-base md:text-xl lg:text-base">, Front-End</span>
            </div>
			<nav>
                <ul className="hidden md:flex md:gap-7 lg:gap-12 text-secondary text-lg *:hover:text-white *:active:text-white *:duration-100 lg:text-base">
                    <li><a href="">Present</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="">Contact</a></li>
                </ul>
                <Icon icon="hugeicons:menu-01" width="26" height="26" className="md:hidden text-secondary active:text-white"/>
            </nav>
		</header>
	);
};

export default Header;
