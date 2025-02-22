// import React from 'react'
import { Icon } from "@iconify-icon/react";
import TechIcons from "./TechIcon";

const Card = ({ typeCard, setBgColor, titleColor, btnColor, is_image, children, className, is_projectCard, linkProject, projectTitle,  projectDesc, projectStatus, projectPreview, bg, overlayColor }) => {

    is_image ? null : 'p-10';
    
    // apakah project card
    const projectCard = is_projectCard ? (
        <>
            <div className={`card relative ${typeCard} h-128 lg:h-110 ${setBgColor} ${!is_image ? 'p-10' : ''} ${className} rounded-[2.7rem] flex flex-col border border-additional/10 overflow-hidden`}>
                <span>
                    <h1 className={`text-3xl font-Archivo flex items-center gap-2 ${titleColor}`}>{projectTitle}<a href={linkProject} target="_blank"><Icon icon="stash:arrow-up-light" width="24" height="24" className={`${titleColor} rotate-45 p-2 ${btnColor} hover:bg-secondary/30 active:bg-secondary/30 rounded-full ms-1 translate-y-1 cursor-pointer`}/></a></h1>
                    <p className="text-secondary mt-3 lg:w-96 line-clamp-1">{projectDesc}</p>
                </span>

                <div className={`web-preview__wrp relative w-full h-fit mt-8`}>
                    <img src={projectPreview} className="rounded-3xl"/>
                </div>
                <span id="status-project" className={`status ${titleColor} absolute top-13 right-13 py-2 px-3 rounded-full ${btnColor} text-xs`}>{projectStatus}</span>
                <div className={`overlay__layer w-full h-32 absolute bottom-0 left-1/2 -translate-x-1/2 bg-linear-0 ${overlayColor} from-20%`}></div>

                {/* icons teknologi disini */}
                <TechIcons projectName={projectTitle} bg={bg}/>
            </div>
        </>

    // card biasa
    ) : (
        <div className={`card ${typeCard} ${setBgColor} ${!is_image ? 'p-10 sm:p-16 pb-10' : ''} ${className} rounded-[2.7rem] flex flex-col space-y-6 border border-additional/10`}>
            {children} {/*isinya custom sendiri*/}
        </div>
    );
    
    return (
        projectCard
    )
}

export default Card
