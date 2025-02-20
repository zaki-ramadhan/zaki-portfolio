// import React from 'react'
import { Icon } from "@iconify-icon/react";

const Card = ({ typeCard, setBgColor, is_image, children, className, is_projectCard }) => {
    is_image ? null : 'p-10';

    // apakah project card
    const projectCard = is_projectCard ? (
        <>
            <div className={`card ${typeCard} ${setBgColor} ${!is_image ? 'p-10' : ''} ${className} rounded-[2.7rem] flex flex-col border border-additional/10 basis-2/4`}>
                <span>
                    <h1 className="text-3xl font-Archivo flex items-center gap-2">zappify<span className="text-secondary -ms-2">.com</span><a href="https://github.com/zaki-ramadhan/zappify" target="_blank"><Icon icon="stash:arrow-up-light" width="24" height="24" className="text-white/80 rotate-45 p-2 bg-secondary/20 hover:bg-secondary/30 rounded-full ms-1 translate-y-1 cursor-pointer"/></a></h1>
                    <p className="text-secondary mt-3">Smart rank-tracker for everyone.</p>
                </span>

                <div className="web-preview__wrp w-fit h-fit absolute -bottom-100 left-0 scale-85">
                    <img className="rounded-3xl"/>
                </div>
                <span className="status absolute top-13 right-13 py-2 px-3 rounded-full bg-secondary/20 text-xs">In Progress</span>
            </div>
        </>
    ) : (
        <div className={`card ${typeCard} ${setBgColor} ${!is_image ? 'p-10' : ''} ${className} rounded-[2.7rem] flex flex-col border border-additional/10`}>
            {children} {/*isinya custom sendiri*/}
        </div>
    );
    
    return (
        projectCard
    )
}

export default Card
