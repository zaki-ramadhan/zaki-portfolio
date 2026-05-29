import { useState, useEffect, useMemo, useRef } from "react";
import { Icon } from "@iconify-icon/react";
import { useTranslation } from "react-i18next";
import { contactData } from "@utils/contactData";

const TopHeader = () => {
	const { t } = useTranslation();
	const [visible, setVisible] = useState(false);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [closed, setClosed] = useState(false); // State untuk manual close
	const headerRef = useRef(null);

	useEffect(() => {
		if (closed) {
			document.documentElement.style.setProperty("--top-header-offset", "0px");
			return;
		}

		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const height = headerRef.current ? `${headerRef.current.offsetHeight}px` : "36px";

			if (currentScrollY > lastScrollY + 10) {
				setVisible(true); // Scroll down, show
				document.documentElement.style.setProperty("--top-header-offset", height);
			} else if (currentScrollY < lastScrollY - 10) {
				setVisible(false); // Scroll up, hide
				document.documentElement.style.setProperty("--top-header-offset", "0px");
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [lastScrollY, closed]);

	const phoneNumber = contactData.phoneNumber; // Menggunakan data dari file terpisah
	const message = t(contactData.whatsappMessageKey); // Template pesan
	const whatsappURL = useMemo(() => {
		return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
			message
		)}`;
	}, [message, phoneNumber]);

	return (
		<div
			ref={headerRef}
			className={`w-full bg-green-500 text-white outline-[1.3px] outline-green-700 font-medium text-sm py-1.5 text-center flex justify-center items-center fixed top-0 left-0 z-[100] transition-transform duration-300 ${
				visible &&
				!closed
					? "translate-y-0"
					: "-translate-y-[110%]"
			}`}
		>
			{/* Tombol Close */}
			<button
				onClick={() => setClosed(true)}
				className="absolute right-4 top-2.5 text-white hover:text-gray-600 active:text-gray-600 transition-all font-Archivo"
			>
				<Icon
					icon="mdi:close"
					className="text-xl -translate-y-1"
				/>
			</button>
			{/* Link WhatsApp */}
			<a
				href={whatsappURL}
				target="_blank"
				rel="noopener noreferrer"
				className="flex text-lg md:text-sm items-center gap-2 hover:underline font-Archivo"
			>
				{t(contactData.contactTextKey)}
				<Icon
					icon="mdi:open-in-new"
					className="text-base"
				/>
			</a>
		</div>
	);
};

export default TopHeader;
