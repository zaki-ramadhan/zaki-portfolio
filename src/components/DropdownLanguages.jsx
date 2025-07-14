import { useState, useRef, useEffect, useMemo } from "react";
import i18n from "../i18n";
import { Icon } from "@iconify-icon/react";
import { languagesData } from "@utils/languagesData";

const DropdownLanguages = () => {
	// Mengambil bahasa yang tersimpan dari localStorage atau default "en"
	const [language, setLanguage] = useState(() => {
		return (
			localStorage.getItem(
				"language"
			) ||
			"en"
		);
	});
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	const switchLanguage = (lang) => {
		setLanguage(lang);
		i18n.changeLanguage(lang);
		// Menyimpan pilihan bahasa ke localStorage
		localStorage.setItem(
			"language",
			lang
		);
		setIsOpen(false);
	};

	// Memastikan i18n menggunakan bahasa yang tersimpan saat komponen dimount
	useEffect(() => {
		const savedLanguage =
			localStorage.getItem(
				"language"
			);
		if (
			savedLanguage &&
			savedLanguage !==
				i18n.language
		) {
			i18n.changeLanguage(
				savedLanguage
			);
			setLanguage(
				savedLanguage
			);
		}
	}, []);

	useEffect(() => {
		const handleClickOutside = (
			event
		) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(
					event.target
				)
			) {
				setIsOpen(
					false
				);
			}
		};
		document.addEventListener(
			"mousedown",
			handleClickOutside
		);
		return () =>
			document.removeEventListener(
				"mousedown",
				handleClickOutside
			);
	}, []);
	const selectedLanguage = useMemo(() => {
		return (
			languagesData.find(
				(
					l
				) =>
					l.code ===
					language
			)
				?.flag ||
			"twemoji:flag-united-kingdom"
		);
	}, [language]);

	const languageButtons = useMemo(() => {
		return languagesData.map(
			({
				code,
				name,
				flag,
			}) => (
				<button
					key={
						code
					}
					onClick={() =>
						switchLanguage(
							code
						)
					}
					className="flex items-center gap-3 ps-4 pe-2 py-2 hover:bg-gray-200 w-full text-left text-sm"
				>
					<Icon
						icon={
							flag
						}
						width="24"
						height="24"
						className="text-secondary active:text-white rounded-full"
					/>
					{
						name
					}
				</button>
			)
		);
	}, []);

	return (
		<div
			className="relative switch-language-btn ms-6 -translate-y-0.5"
			ref={
				dropdownRef
			}
		>
			<button
				onClick={() =>
					setIsOpen(
						!isOpen
					)
				}
				className="flex cursor-pointer items-center gap-2 focus:outline-none hover:text-secondary active:text-secondary"
			>
				<Icon
					icon={
						selectedLanguage
					}
					width="28"
					height="28"
					className="text-secondary active:text-white rounded-full"
				/>
				<Icon
					icon="dashicons:arrow-down"
					width="22"
					height="22"
					className={`transition-all duration-300 ${
						isOpen
							? "rotate-180 text-secondary"
							: ""
					}`}
				/>
			</button>

			{/* Jika isOpen true, tampilkan dropdown dengan animasi */}
			{isOpen && (
				<div className="absolute right-0 top-10 bg-white shadow-md rounded-md py-2 w-46 text-black origin-top-right">
					{
						languageButtons
					}
				</div>
			)}
		</div>
	);
};

export default DropdownLanguages;
