/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react";
import TechIcons from "./TechIcon";

const ProjectCard = ({ setBgColor, titleColor, btnColor, is_image, className, linkProject, projectTitle,  projectDesc, projectStatus, projectPreview, bg, overlayColor }) => {
  return (
        <div className={`project-card relative h-80 md:95 lg:h-110 ${setBgColor} ${!is_image ? 'p-7 sm:p-10' : ''} ${className} rounded-[2.7rem] flex flex-col border border-additional/10 overflow-hidden`}>
            <div>
                <div className="container title-status__wrp flex items-center justify-between">
                    <span className="title-icon__wrp flex items-center gap-2 basis-1/2">
                    <h1 className={`${titleColor} text-xl md:text-3xl font-Archivo max-w-[8ch] md:max-w-none overflow-hidden text-ellipsis whitespace-nowrap`}>
                        {projectTitle}
                    </h1>


                        <a href={linkProject} target="_blank"><Icon icon="stash:arrow-up-light" width="24" height="24" className={`${titleColor} rotate-45 scale-90 -ml-1 md:ml-0 md:scale-100 p-2 ${btnColor} hover:bg-secondary/30 active:bg-secondary/30 rounded-full ms-1 translate-y-1 cursor-pointer`}/></a>
                    </span>
                    <span id="status-project" className={`status basis-1/2 max-w-fit ${titleColor} py-1.5 px-3 rounded-full ${btnColor} text-xs`}>{projectStatus}</span>
                </div>
                <p className="text-secondary text-sm md:text-base mt-1 lg:mt-3 lg:w-96 line-clamp-1">{projectDesc}</p>
            </div>

            <div className={`web-preview__wrp relative w-full h-fit mt-8`}>
                <img src={projectPreview} className="rounded-3xl"/>
            </div>
            <div className={`overlay__layer w-full h-32 absolute bottom-0 left-1/2 -translate-x-1/2 bg-linear-0 ${overlayColor} from-20%`}></div>

            {/* icons teknologi disini */}
            <TechIcons projectName={projectTitle} bg={bg}/>
        </div>
  )
}

export default ProjectCard
