/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react";
import TechIcons from "./TechIcon";
import { useTranslation } from "react-i18next";
import { projectData } from "@utils/projectData";

const ProjectCard = ({ is_image, className }) => {
	const { t } = useTranslation();
	return (
		<>
			{projectData.map(
				(
					project,
					index
				) => {
					const {
						titleColor,
						bgColor,
						btnColor,
						overlayColor,
					} =
						project.colors;

					return (
						<div
							key={index}
							className={`project-card relative h-80 lg:h-100 bg-radial-[at_100%_-40%] ${bgColor} to-60% ${
								!is_image ? "p-7 sm:p-10" : ""
							} ${className} rounded-4xl flex flex-col border border-additional/10 overflow-hidden`}
						>
							<div className="w-full h-fit">
								<div className="container w-full title-status__wrp flex items-center justify-between gap-4">
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
												icon={
													!project.is_published
														? "mdi:github"
														: "stash:arrow-up-light"
												}
												width="24"
												height="24"
												className={`${titleColor} ${
													project.is_published
														? "rotate-45"
														: ""
												} scale-95 md:scale-100 md:ml-0 p-1.5 ${btnColor} hover:bg-secondary/15 active:bg-secondary/25 active:scale-90 hover:ring hover:ring-secondary transition-all duration-100 rounded-full ms-1 translate-y-1 cursor-pointer`}
											/>
										</a>
									</span>
									<span
										id="status-project"
										className={`status basis-1/4 max-w-fit ${titleColor} py-1.5 px-3 rounded-full ${btnColor} text-xs ring-[0.8px] ring-secondary/30`}
									>
										{t(project.status)}
									</span>
								</div>
								<p className="text-secondary text-base mt-1.5 lg:mt-01.5 lg:w-96 line-clamp-1">
									{t(project.desc)}
								</p>
							</div>

							<div className="web-preview__wrp relative w-full h-fit mt-8">
								<img
									src={project.preview}
									className="rounded-3xl md:rounded-2xl"
									alt={`${project.name} preview`}
								/>
							</div>
							<div
								className={`overlay__layer w-full h-32 absolute bottom-0 left-1/2 -translate-x-1/2 bg-linear-0 ${overlayColor} from-20%`}
							></div>

							{/* Icons Teknologi */}
							<TechIcons
								projectName={project.name}
								bg={bgColor}
							/>
						</div>
					);
				}
			)}
		</>
	);
};

export default ProjectCard;
