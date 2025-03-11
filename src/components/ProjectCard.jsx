/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react";
import TechIcons from "./TechIcon";
import zappifyPreview from "../assets/images/ss_pricing_page.webp";
import katIbuPreview from "../assets/images/ss_dashboard_admin_katering_ibu.webp";
import { useTranslation } from "react-i18next";

const projectData = [
    {
        id: 1,
        name: "Zappify",
        desc: "projectCard.zappify.desc",
        link: "https://github.com/zaki-ramadhan/zappify?tab=readme-ov-file#zappify",
        status: "projectCard.zappify.status",
        preview: zappifyPreview,
        colors: {
            titleColor: 'text-white/80',
            bgColor: 'from-emerald-800 to-zappify-darker',
            btnColor: 'bg-secondary/20',
            iconsBgColor: 'bg-white/5',
            overlayColor: 'from-zappify-darker to-zappify-darker/0',
        }
    },
    {
        id: 2,
        name: "Katering Ibu",
        desc: "projectCard.kateringIbu.desc",
        link: "https://github.com/zaki-ramadhan/katering-ibu?tab=readme-ov-file#katering-ibu-a-laravel-based-catering-website",
        status: "projectCard.kateringIbu.status",
        preview: katIbuPreview,
        colors: {
            titleColor: 'text-primary',
            bgColor: 'from-white to-slate-200',
            btnColor: 'bg-secondary/10',
            iconsBgColor: 'bg-white/20',
            overlayColor: 'from-slate-200 to-slate-200/0',
        }
    }
];

const ProjectCard = ({ is_image, className }) => {
    const {t} = useTranslation();
    return (
        <>
            {projectData.map((project) => {
                const { titleColor, bgColor, btnColor, overlayColor } = project.colors;

                return (
                    <div key={project.id} className={`project-card relative h-90 lg:h-110 bg-radial-[at_100%_-40%] ${bgColor} to-60% ${!is_image ? 'p-7 sm:p-10' : ''} ${className} rounded-[2.7rem] flex flex-col border border-additional/10 overflow-hidden`}>
                        <div>
                            <div className="container title-status__wrp flex items-center justify-between">
                                <span className="title-icon__wrp flex items-center gap-2 basis-1/2">
                                    <h1 className={`${titleColor} text-3xl md:text-3xl font-Archivo max-w-[8ch] md:max-w-none overflow-hidden text-ellipsis whitespace-nowrap`}>
                                        {project.name}
                                    </h1>
                                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                                        <Icon icon="stash:arrow-up-light" width="24" height="24" className={`${titleColor} rotate-45 scale-95 md:scale-100 md:ml-0 p-1.5 ${btnColor} hover:bg-secondary/30 active:bg-secondary/30 rounded-full ms-1 translate-y-1 cursor-pointer`} />
                                    </a>
                                </span>
                                <span id="status-project" className={`status basis-1/2 max-w-fit ${titleColor} py-1.5 px-3 rounded-full ${btnColor} text-xs`}>
                                    {t(project.status)}
                                </span>
                            </div>
                            <p className="text-secondary md:text-base mt-1 lg:mt-3 lg:w-96 line-clamp-1">{t(project.desc)}</p>
                        </div>

                        <div className="web-preview__wrp relative w-full h-fit mt-8">
                            <img src={project.preview} className="rounded-3xl" alt={`${project.name} preview`} />
                        </div>
                        <div className={`overlay__layer w-full h-32 absolute bottom-0 left-1/2 -translate-x-1/2 bg-linear-0 ${overlayColor} from-20%`}></div>

                        {/* Icons Teknologi */}
                        <TechIcons projectName={project.name} bg={bgColor} />
                    </div>
                );
            })}
        </>
    );
};

export default ProjectCard;
