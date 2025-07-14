import ProjectCard from '@components/ProjectCard';

export default function ProjectSection() {
	return (
		<section
			id="projects"
			className="card__wrp container grid lg:grid-cols-2 py-4 mt-16 lg:mt-12 gap-4"
		>
			<div className="w-full flex items-center md:hidden mb-1">
				<h1 className="heading text-nowrap flex-1 text-2xl ml-1">
					My
					Projects
				</h1>
				<span className="inline w-full grow h-[0.05rem] bg-gradient-to-r from-stone-400 from-20% to-stone-200/0 ml-4"></span>
			</div>
			<ProjectCard />
		</section>
	);
}
