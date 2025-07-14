/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Icon } from "@iconify-icon/react";
import { socialMediaData } from "@utils/socialMediaData";

const ListSocialMedia = ({ size }) => {
	const [open, setOpen] = useState({}); // ✅ State sebagai objek

	const handleOpen = (index) => {
		setOpen((prev) => ({
			...prev,
			[index]: true, // Hanya item ini yang terbuka
		}));
		setTimeout(() => {
			setOpen(
				(
					prev
				) => ({
					...prev,
					[index]: false, // Tutup lagi setelah 1.5 detik
				})
			);
		}, 2000);
	};

	return (
		<span className="hidden md:flex gap-3 items-start">
			{socialMediaData.map(
				(
					item,
					index
				) => (
					<span
						key={
							index
						}
						onClick={() =>
							handleOpen(
								index
							)
						}
						className={`socmed group w-fit flex items-center p-2 pr-0 rounded-lg transition-all duration-300 bg-secondary/5 ${
							open[
								index
							]
								? "bg-secondary/10 pr-5 gap-0"
								: " gap-2"
						} overflow-hidden *:transition-all`}
					>
						<Icon
							icon={
								item.icon
							}
							width={
								size
							}
							height={
								size
							}
							className="duration-300"
						/>

						{/* Animasi width & opacity */}
						<a
							href={
								item.href
							}
							target="_blank"
							className={`max-w-0 opacity-0 overflow-hidden whitespace-nowrap transition-all duration-500 text-sm translate-x-2 hover:text-secondary active:text-secondary ${
								open[
									index
								]
									? "max-w-[100px] opacity-100 translate-x-0"
									: ""
							}`}
						>
							{
								item.label
							}
						</a>
					</span>
				)
			)}
		</span>
	);
};

export default ListSocialMedia;
