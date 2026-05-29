/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { navigationData } from "@utils/navigationData";
import { useAuth } from "../utils/useAuth";
import { Link } from "react-router-dom";

const MainHeader = ({ children }) => {
	const { t } = useTranslation();
	const { user } = useAuth();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.pageYOffset > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		return () => { document.body.style.overflow = 'unset'; };
	}, [isMobileMenuOpen]);

	const navLinks = (isMobile = false) => (
		<ul className={`${isMobile ? 'space-y-3' : 'hidden md:flex md:gap-7 lg:gap-12 text-secondary text-lg *:hover:text-white *:active:text-white *:duration-100 lg:text-base'}`}>
			{navigationData.map((navItem, index) => (
				<li key={index}>
					<a href={navItem.href} onClick={isMobile ? closeMobileMenu : undefined}>
						{t(navItem.labelKey)}
					</a>
				</li>
			))}
			{user && (
				<li>
					<Link to="/admin" onClick={isMobile ? closeMobileMenu : undefined} className="text-additional hover:text-white transition-colors flex items-center gap-2">
						<Icon icon="solar:shield-user-linear" width={isMobile ? "20" : "18"} />
						{t("header.dashboard")}
					</Link>
				</li>
			)}
		</ul>
	);

	return (
		<>
			<header
				id="main-header"
				style={{ top: 'var(--top-header-offset, 0px)' }}
				className={`sticky z-[60] w-full border-b transition-all duration-500 ease-in-out ${
					isScrolled 
					? "bg-primary/90 backdrop-blur-xl py-4 shadow-2xl border-white/10" 
					: "bg-transparent py-7 border-transparent"
				}`}
			>
				<div className="container mx-auto px-6 md:px-12 lg:px-14 flex justify-between items-center">
					<div className="dev-name">
						<h1 className="inline text-lg md:text-xl lg:text-base font-bold text-white">
							Zaki R
						</h1>
						<span className="text-secondary text-base md:text-xl lg:text-base">, {t("header.specialty")}</span>
					</div>
					<nav className="flex items-center gap-4">
						{navLinks()}
						{children}
						<button 
							onClick={toggleMobileMenu} 
							className="md:hidden p-2 text-secondary hover:text-white transition-colors"
						>
							<Icon icon="hugeicons:menu-01" width="24" />
						</button>
					</nav>
				</div>
			</header>

			{/* MOBILE MENU */}
			<nav className={`fixed inset-0 bg-primary/98 backdrop-blur-2xl z-[100] transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
				<div className="flex flex-col h-full p-6">
					<div className="flex justify-between items-center mb-12">
						<div className="flex flex-col">
							<h2 className="text-xl font-bold text-white">Zaki R</h2>
							<p className="text-sm text-secondary">{t("header.specialty")}</p>
						</div>
						<button onClick={closeMobileMenu} className="p-3 bg-white/5 rounded-full text-white hover:bg-white/10 transition-all"><Icon icon="line-md:close" width="24" /></button>
					</div>
					<div className="flex-1 overflow-y-auto">
						{navLinks(true)}
					</div>
				</div>
			</nav>
		</>
	);
};

export default MainHeader;
