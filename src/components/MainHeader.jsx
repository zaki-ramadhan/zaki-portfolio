/* eslint-disable react/prop-types */
import { Icon } from "@iconify-icon/react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { navigationData } from "@utils/navigationData";

const MainHeader = ({ children }) => {
	const { t } = useTranslation();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	// Prevent body scroll when mobile menu is open
	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		// Cleanup function to reset overflow when component unmounts
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isMobileMenuOpen]);

	// Close mobile menu when clicking outside or pressing escape
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape') {
				closeMobileMenu();
			}
		};

		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, []);

	return (
		<header
			id="main-header"
			className="container mx-auto -mb-1 sm:mb-0 px-6 pb-2 md:px-12 lg:px-14 pt-7 md:pb-2 flex justify-between z-50"
		>
			<div className="dev-name">
				<h1 className="inline text-lg md:text-xl lg:text-base">
					Zaki
					R
					<span className="hidden sm:inline-block">
						amadhan
					</span>
				</h1>
				<span className="text-secondary text-base md:text-xl lg:text-base">
					,
					Front-End
				</span>
			</div>{" "}			<nav className="flex items-center gap-4 relative">
				{/* Desktop Navigation */}
				<ul className="hidden md:flex md:gap-7 lg:gap-12 text-secondary text-lg *:hover:text-white *:active:text-white *:duration-100 lg:text-base">
					{navigationData.map((navItem, index) => (
						<li key={index}>
							<a href={navItem.href}>
								{t(navItem.labelKey)}
							</a>
						</li>
					))}
				</ul>

				{children}

				{/* Mobile Menu Button */}
				<button
					onClick={toggleMobileMenu}
					className="md:hidden p-2 -mr-2 rounded-lg text-secondary hover:text-white hover:bg-white/5 active:bg-white/10 transition-all duration-200 z-50 relative"
					aria-label="Toggle mobile menu"
				>
					<Icon
						icon={isMobileMenuOpen ? "hugeicons:cancel-01" : "hugeicons:menu-01"}
						width="24"
						height="24"
						className="transition-transform duration-300"
					/>
				</button>
			</nav>			{/* Mobile Menu Overlay */}
			{isMobileMenuOpen && (
				<div
					className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300"
					onClick={closeMobileMenu}
				/>
			)}{/* Mobile Menu */}
			<nav
				className={`fixed top-0 left-0 w-full h-screen bg-primary/95 backdrop-blur-xl z-50 transform transition-transform duration-300 ease-out md:hidden ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
					}`}
			>
				<div className="flex flex-col h-full">
					<div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-white/5 to-transparent">
						<div className="flex flex-col">
							<h2 className="text-lg font-semibold text-white">
								Zaki R
							</h2>
							<p className="text-sm text-secondary/80 mt-0.5">
								Front-End Developer
							</p>
						</div>
						<button
							onClick={closeMobileMenu}
							className="p-2.5 pb-1 rounded-full bg-white/5 text-white hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
							aria-label="Close menu"
						>
							<Icon icon="line-md:close" width="20" height="20" />
						</button>
					</div>

					{/* Mobile Menu Items */}
					<div className="flex-1 px-6 py-6">
						<ul className="space-y-3">
							{navigationData.map((navItem, index) => (
								<li key={index}>
									<a
										href={navItem.href}
										onClick={closeMobileMenu}
										className="block text-base text-secondary hover:text-white active:text-white py-3 px-4 rounded-lg hover:bg-white/10 active:bg-white/10 transition-all duration-200 border-l-2 border-transparent hover:border-white/40 active:border-white/60 hover:translate-x-1 active:scale-95"
									>
										{t(navItem.labelKey)}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Mobile Menu Footer */}
					<div className="px-6 py-4 border-t border-white/10">
						<div className="text-left">
							<p className="text-xs text-secondary/70">
								Front-End Developer
							</p>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default MainHeader;
