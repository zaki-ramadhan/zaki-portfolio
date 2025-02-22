/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Icon } from "@iconify-icon/react";

const ListSocialMedia = ({ size }) => {
    return (
        <span className='hidden md:flex gap-3 items-start'>
            {[
                { href: "https://www.instagram.com/zaki_ramadhannn", icon: "basil:instagram-outline", label: "Instagram" },
                { href: "https://www.linkedin.com/in/zaki-ramadhan", icon: "la:linkedin-in", label: "LinkedIn" },
                { href: "https://github.com/zaki-ramadhan", icon: "mdi:github", label: "Github" }

            ].map((item, index) => (
                <a key={index} href={item.href} target='_blank' 
                    className='socmed group w-fit flex items-center gap-2 p-2 pr-0 hover:pr-2 rounded-lg transition-all duration-300 bg-secondary/5 hover:bg-secondary/10 group-hover:pr-4 hover:animate-pulse overflow-hidden'>

                    <Icon icon={item.icon} width={size} height={size} className="transition-all duration-300"/>

                    {/* Animasi width & opacity */}
                    <span className='max-w-0 opacity-0 overflow-hidden whitespace-nowrap group-hover:max-w-[100px] group-hover:opacity-100 transition-all duration-500 text-sm translate-x-2 group-hover:translate-x-0'>
                        {item.label}
                    </span>
                </a>
            ))}
        </span>
    );
}

export default ListSocialMedia;
