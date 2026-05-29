/* eslint-disable react/prop-types */
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify-icon/react";
import ProjectSkeleton from "./ProjectSkeleton";
import TechIcons from "./TechIcon";

// Single Project Card Component, extracted for reusability
const SingleProjectCard = ({ project, is_image, className }) => {
  const { t, i18n } = useTranslation();
  const { titleColor, bgColor, btnColor, overlayColor } = project.colors;
  
  // Dynamic translation logic for multilingual DB fields
  const currentLang = i18n.language; // 'en', 'id', 'es', 'ja', 'zh'
  
  // High priority: matched language. Secondary: English fallback. Tertiary: Legacy field/key
  const projectStatus = project[`status_${currentLang}`] || project.status_en || (project.status ? t(project.status) : '...');
  const projectDesc = project[`desc_${currentLang}`] || project.desc_en || (project.desc?.includes('projectCard') ? t(project.desc) : project.desc);

  return (
    <div
      key={project.id}
      className={`project-card relative h-80 lg:h-100 bg-radial-[at_100%_-40%] ${bgColor} to-60% ${
        !is_image ? "p-7 sm:p-10" : ""
      } ${className} rounded-4xl flex flex-col border border-additional/10 overflow-hidden`}
    >
      <div className="w-full h-fit">
        <div className="w-full title-status__wrp flex items-center justify-between gap-4">
          <span className="title-icon__wrp flex items-center gap-2 basis-3/4 min-w-0">
            <h1 
              className={`${titleColor} text-2xl md:text-3xl font-Archivo max-w-full md:max-w-none overflow-hidden text-ellipsis whitespace-nowrap min-w-0`}
              style={{ flexShrink: 1 }}
            >
              {project.name}
            </h1>{" "}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                icon={!project.is_published ? "mdi:github" : "mi:arrow-up"}
                width="24"
                height="24"
                className={`${titleColor} ${
                  project.is_published ? "rotate-45" : ""
                } scale-95 md:scale-100 md:ml-0 p-1.5 ${btnColor} hover:bg-secondary/15 active:bg-secondary/25 active:scale-90 hover:ring hover:ring-secondary transition-all duration-100 rounded-full ms-1 translate-y-1 cursor-pointer`}
              />
            </a>
          </span>
          <span
            id="status-project"
            className={`status basis-1/4 max-w-fit ${titleColor} py-1.5 px-3 rounded-full ${btnColor} text-xs ring-[0.8px] ring-secondary/30 select-none font-bold`}
          >
            {projectStatus}
          </span>
        </div>
        <p className="text-secondary text-base mt-1.5 lg:mt-01.5 lg:w-96 line-clamp-1">
          {projectDesc}
        </p>
      </div>

      <div className="web-preview__wrp relative w-full h-fit mt-8 select-none">
        <img
          src={project.preview}
          className="rounded-3xl md:rounded-2xl"
          alt={`${project.name} preview`}
		      loading="lazy"
        />
      </div>
      <div
        className={`overlay__layer w-full h-32 absolute bottom-0 left-1/2 -translate-x-1/2 bg-linear-0 ${overlayColor} from-20%`}
      ></div>

      {/* Technology Icons Component - Passing techs directly */}
      <TechIcons projectTechs={project.techs} bg={bgColor} />
    </div>
  );
};

// Simple module-level cache to persist data during the session
export let projectsCache = null;

// Main component that renders a list of Project Cards
const ProjectCard = ({ is_image, className, projects = [], isLoading = false }) => {
  return (
    <>
      {isLoading && projects.length === 0 ? (
        <>
            <ProjectSkeleton />
            <ProjectSkeleton />
        </>
      ) : (
        <>
            {isLoading && (
                <div className="lg:col-span-2 flex items-center justify-center py-2 gap-2 opacity-50">
                    <div className="w-3 h-3 border-2 border-additional/30 border-t-additional rounded-full animate-spin"></div>
                    <span className="text-secondary text-[10px] font-Archivo uppercase tracking-widest">Updating...</span>
                </div>
            )}
            
            {projects.length > 0 ? (
                projects.map((project) => (
                    <div key={project.id || project.name} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <SingleProjectCard
                            project={project}
                            is_image={is_image}
                            className={className}
                        />
                    </div>
                ))
            ) : (
                <div className="lg:col-span-2 py-20 flex flex-col items-center opacity-40">
                    <Icon icon="solar:folder-error-broken" width="60" />
                    <p className="mt-4 font-Archivo">No projects found for this selection.</p>
                </div>
            )}
        </>
      )}
    </>
  );
};

export default ProjectCard;