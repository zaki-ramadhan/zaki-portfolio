import Card from "./Card";
import avatarAi from "@assets/images/me.png";
import ProjectSection from '@sections/ProjectSection';
import HelloCard from "./HelloCard";

const Cards = () => {
	return (
		<main
			id="cards"
			className="container mx-auto py-4 px-4 md:px-10 lg:px-14 flex flex-col -space-y-3"
		>
			<div className="card__wrp container mx-auto flex flex-col lg:flex-row gap-4">
				<HelloCard />

				<Card
					is_image
					className={
						"card hidden lg:inline-block group lg:basis-2/4 xl:basis-2/4 max-w-80 rounded-es-lg border border-secondary/15 overflow-hidden"
					}
				>
					<img
						src={
							avatarAi
						}
						alt="avatar ai"
						className="h-full select-none"
					/>
				</Card>
			</div>

			<ProjectSection />
		</main>
	);
};

export default Cards;
