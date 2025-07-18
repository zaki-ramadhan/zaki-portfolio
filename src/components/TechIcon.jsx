/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react";
import { useState, useEffect } from "react";
import { projectData } from "@utils/projectData";

const TechIcon = ({ projectName, bg }) => {
	// state untuk mengatur ketika di klik
	const [isActive, setIsActive] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	const [autoCloseTimeout, setAutoCloseTimeout] = useState(null);

	const handleClick = () => {
		setIsActive(true);
		// Set auto close jika tidak sedang hover
		if (!isHovering) {
			const timeout = setTimeout(() => {
				setIsActive(false);
			}, 2000);
			setAutoCloseTimeout(timeout);
		}
	};

	const handleMouseEnter = () => {
		setIsHovering(true);
		// Clear timeout jika ada
		if (autoCloseTimeout) {
			clearTimeout(autoCloseTimeout);
			setAutoCloseTimeout(null);
		}
	};
	const handleMouseLeave = () => {
		setIsHovering(false);
		// Set timeout untuk menutup setelah mouse leave
		if (isActive) {
			const timeout = setTimeout(() => {
				setIsActive(false);
			}, 500); // Delay 500ms setelah mouse leave
			setAutoCloseTimeout(timeout);
		}
	};

	// Cleanup timeout saat component unmount
	useEffect(() => {
		return () => {
			if (autoCloseTimeout) {
				clearTimeout(autoCloseTimeout);
			}
		};
	}, [autoCloseTimeout]);

	// Cari project yang sesuai
	const project = projectData.find(
		(item) =>
			item.name ===
			projectName
	);

	// Jika project tidak ditemukan, tampilkan pesan atau kosongkan
	if (!project) return null;

	return (<span
		id="technologies"
		onClick={handleClick}
		onMouseEnter={handleMouseEnter}
		onMouseLeave={handleMouseLeave}
		className={`group overflow-visible max-w-fit p-2 md:p-2.5 pb-0.5 md:pb-1 flex items-center rounded-xl ${bg} border border-secondary/10 hover:border-secondary/20 backdrop-blur-xs hover:shadow-lg hover:shadow-black/2 active:shadow-lg active:shadow-black/2 absolute bottom-7 left-1/2 -translate-x-1/2 transition-all duration-300 overflow-hidden z-20 scale-120 sm:scale-100`}
	>
		{/* Ikon HTML5 (selalu terlihat) */}
		<span
			className={`logo__wrp not-odd:inline-block transation-all duration-300 delay-75 ${!isActive
					? "text-zinc-400"
					: "text-orange-500"
				} `}
		>
			<Icon
				icon="simple-icons:html5"
				width="26"
				height="26"
			/>
			{project.techs.map(
				(
					item,
					index
				) => (
					<span
						key={
							index
						}
						className={`count-badge absolute top-[-.5rem] right-[-.5rem] hidden last:grid place-content-center z-20 text-white text-xs scale-80 p-2 rounded-full bg-blue-500 max-w-fit max-h-fit aspect-square animate-bounce font-medium delay-200 md:delay-0 ${isActive
								? "opacity-0"
								: ""
							} transition-all`}
					>
						{index +
							2}
					</span>
				)
			)}
		</span>

		{/* Ikon lainnya (muncul saat hover) */}
		{project.techs.map(
			(
				item,
				index
			) => (
				<span
					key={
						index
					}
					className={`logo__wrp opacity-0 whitespace-nowrap overflow-hidden max-w-0 transition-all duration-300 delay-250 md:delay-0  ${isActive
							? "opacity-100 max-w-[28px] ms-3"
							: ""
						}`}
				>
					<Icon
						icon={
							item.icon
						}
						width="28"
						height="28"
						className={`inline-block ${item.color}`}
					/>
				</span>
			)
		)}
	</span>
	);
};

export default TechIcon;
