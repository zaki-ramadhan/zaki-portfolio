// eslint-disable-next-line no-unused-vars
import React from "react";
import {Icon} from "@iconify-icon/react";

const Header = () => {
	return (
		<section className="container mx-auto px-6 md:px-12 xl:px-20 pt-7 pb-4 flex justify-between">
			<div className="dev-name">
                <h1 className="inline text-xl lg:text-base">Zaki R<span className="hidden sm:inline-block">amadhan</span></h1>
                <span className="text-secondary text-xl lg:text-base">, Front-End</span>
            </div>
			<nav>
                <ul className="hidden md:flex md:gap-7 lg:gap-12 text-secondary text-lg lg:text-base">
                    <li><a href="" className="hover:text-white active:text-white duration-100">Present</a></li>
                    <li><a href="#projects" className="hover:text-white active:text-white duration-100">Projects</a></li>
                    <li><a href="" className="hover:text-white active:text-white duration-100">Contact</a></li>
                </ul>
                <Icon icon="hugeicons:menu-01" width="28" height="28" className="md:hidden text-secondary active:text-white"/>
            </nav>
		</section>
	);
};

export default Header;
