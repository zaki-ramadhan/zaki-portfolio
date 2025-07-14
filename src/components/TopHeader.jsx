import { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify-icon/react";
import { useTranslation } from "react-i18next";
import { contactData } from "@utils/contactData";

const TopHeader = () => {
	const { t } = useTranslation();
	const [visible, setVisible] = useState(false);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [closed, setClosed] = useState(false); // State untuk manual close

	useEffect(() => {
		if (closed) return; // Jika user sudah menutup, jangan munculkan lagi

		const handleScroll = () => {
			const currentScrollY =
				window.scrollY;

			if (
				currentScrollY >
				lastScrollY +
					10
			) {
				setVisible(
					true
				); // Scroll ke bawah, tampilkan header
			} else if (
				currentScrollY <
				lastScrollY -
					10
			) {
				setVisible(
					false
				); // Scroll ke atas, sembunyikan header
			}

			setLastScrollY(
				currentScrollY
			);
		};

		window.addEventListener(
			"scroll",
			handleScroll
		);
		return () =>
			window.removeEventListener(
				"scroll",
				handleScroll
			);
	}, [lastScrollY, closed]);

	const phoneNumber = contactData.phoneNumber; // Menggunakan data dari file terpisah
	const message = t(contactData.whatsappMessageKey); // Template pesan
	//!Gunakan useMemo agar whatsappURL tidak dihitung ulang setiap render
	// URL hanya berubah jika 'message' berubah (misalnya karena perubahan bahasa)
	const whatsappURL = useMemo(() => {
		return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
			message
		)}`;
	}, [message, phoneNumber]);

	return (
		<div
			className={`w-full bg-green-600 text-white text-sm py-2 text-center flex justify-center items-center fixed top-0 left-0 z-50 transition-transform duration-300 ${
				visible &&
				!closed
					? "translate-y-0"
					: "-translate-y-full"
			}`}
		>
			{/* Tombol Close */}
			<button
				onClick={() =>
					setClosed(
						true
					)
				}
				className="absolute right-4 top-2.5 text-white hover:text-gray-300"
			>
				<Icon
					icon="mdi:close"
					className="text-xl"
				/>
			</button>{" "}
			{/* Link WhatsApp */}{" "}
			<a
				href={
					whatsappURL
				}
				target="_blank"
				rel="noopener noreferrer"
				className="flex text-lg md:text-sm items-center gap-2 hover:underline"
			>
				{t(
					contactData.contactTextKey
				)}
				<Icon
					icon="mdi:open-in-new"
					className="text-base"
				/>
			</a>
		</div>
	);
};

export default TopHeader;
