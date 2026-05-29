// Project data configuration
import zappifyPreview from "@images/ss_pricing_page.webp";
import katIbuPreview from "@images/ss_dashboard_admin_katering_ibu.webp";
import ortuPintarPreview from "@images/ss_ortupintar (2).webp";
import webBlogPreview from "@images/ss-web-blog.webp";
import peerNotePreview from "@images/ss_landing_peerNote.webp";
import rancanginPreview from "@images/ss_landing_rancangin.webp";
import dashLivePreview from "@images/ss_dashLive.webp";
import paperloomPreview from "@images/ss_paperloom.webp";
import belajarLinkedInPreview from "@images/ss_belajar_linkedin.webp";

export const projectData = [
	// Zappify
	{
		name: "Zappify",
		desc: "projectCard.zappify.desc",
        category: "Frontend",
		link: "https://zappify.vercel.app",
		status: "Individual",
		preview: zappifyPreview,
		colors: {
			titleColor: "text-white/80",
			bgColor: "from-emerald-800 to-zappify-darker",
			btnColor: "bg-secondary/20",
			iconsBgColor: "bg-white/5",
			overlayColor: "from-zappify-darker to-zappify-darker/0",
		},
		is_published: true,
		techs: [
			{
				icon: "devicon:tailwindcss",
			},
			{
				icon: "logos:react",
			},
		],
	},

	// katering ibu
	{
		name: "Katering Ibu",
		desc: "projectCard.kateringIbu.desc",
        category: "Full-Stack",
		link: "https://github.com/zaki-ramadhan/katering-ibu?tab=readme-ov-file#katering-ibu-a-laravel-based-catering-website",
		status: "Individual",
		preview: katIbuPreview,
		colors: {
			titleColor: "text-primary",
			bgColor: "from-white to-slate-200",
			btnColor: "bg-secondary/10",
			iconsBgColor: "bg-white/20",
			overlayColor: "from-slate-200 to-slate-200/0",
		},
		is_published: false,
		techs: [
			{
				icon: "devicon:tailwindcss",
			},
			{
				icon: "devicon:laravel",
			},
			{
				icon: "devicon:mysql",
			},
		],
	},

	// OrtuPintar
	{
		name: "Ortu Pintar",
		desc: "projectCard.ortuPintar.desc",
        category: "Full-Stack",
		link: "https://github.com/zaki-ramadhan/OrtuPintar-app?tab=readme-ov-file#readme",
		status: "Collaboration",
		preview: ortuPintarPreview,
		colors: {
			titleColor: "text-primary",
			bgColor: "from-white to-slate-200",
			btnColor: "bg-secondary/10",
			iconsBgColor: "bg-white/20",
			overlayColor: "from-slate-200 to-slate-200/0",
		},
		is_published: false,
		techs: [
			{
				icon: "devicon:tailwindcss",
			},
			{
				icon: "logos:react",
			},
			{
				icon: "devicon:mysql",
			},
		],
	},

	// webBlog
	{
		name: "WebBlog",
		desc: "projectCard.webBlog.desc",
        category: "Full-Stack",
		link: "https://github.com/zaki-ramadhan/web-blog?tab=readme-ov-file#readme",
		status: "Individual",
		preview: webBlogPreview,
		colors: {
			titleColor: "text-primary",
			bgColor: "from-white to-slate-200",
			btnColor: "bg-secondary/10",
			iconsBgColor: "bg-white/20",
			overlayColor: "from-slate-200 to-slate-200/0",
		},
		is_published: false,
		techs: [
			{
				icon: "devicon:tailwindcss",
			},
			{
				icon: "devicon:alpinejs",
			},
			{
				icon: "devicon:laravel",
			},
			{
				icon: "logos:sqlite",
			},
		],
	},

	// peerNote
	{
		name: "PeerNote",
		desc: "projectCard.peerNote.desc",
        category: "Full-Stack",
		link: "https://github.com/zaki-ramadhan/peer-note-sharing-platform?tab=readme-ov-file#readme",
		status: "Collaboration",
		preview: peerNotePreview,
		colors: {
			titleColor: "text-primary",
			bgColor: "from-white to-slate-200",
			btnColor: "bg-secondary/10",
			iconsBgColor: "bg-white/20",
			overlayColor: "from-slate-200 to-slate-200/0",
		},
		is_published: false,
		techs: [
			{
				icon: "devicon:tailwindcss",
			},
			{
				icon: "logos:react",
			},
			{
				icon: "devicon:mysql",
			},
		],
	},

	// rancangin
	{
		name: "Rancangin",
		desc: "projectCard.rancangin.desc",
        category: "Web",
		link: "https://github.com/akbarryyan/rancanginid",
		status: "Collaboration",
		preview: rancanginPreview,
		colors: {
			titleColor: "text-white/80",
			bgColor: "from-blue-900/90 to-slate-950",
			btnColor: "bg-secondary/10",
			iconsBgColor: "bg-white/20",
			overlayColor: "from-slate-950 to-slate-950/0",
		},
		is_published: false,
		techs: [
			{
				icon: "devicon:tailwindcss",
			},
			{
				icon: "logos:react",
			},
		],
	},

	// dashlive
	{
		name: "DashLive",
		desc: "projectCard.dashLive.desc",
        category: "Web",
		link: "https://github.com/akbarryyan/dashLive",
		status: "Individual",
		preview: dashLivePreview,
		colors: {
			titleColor: "text-primary",
			bgColor: "from-white to-slate-200",
			btnColor: "bg-secondary/10",
			iconsBgColor: "bg-white/20",
			overlayColor: "from-slate-200 to-slate-200/0",
		},
		is_published: false,
		techs: [
			{
				icon: "logos:laravel", 
			},
			{
				icon: "devicon:livewire",
			},
			{
				icon: "devicon:tailwindcss",
			},
			{
				icon: "logos:sqlite",
			},
		],
	},

	// paperloom
	{
		name: "Paperloom",
		desc: "projectCard.paperloom.desc",
        category: "Full-Stack",
		link: "https://github.com/zaki-ramadhan/paperloom?tab=readme-ov-file#readme",
		status: "Individual",
		preview: paperloomPreview,
		colors: {
			titleColor: "text-white/80",
			bgColor: "from-stone-700/80 to-stone-950/50",
			btnColor: "bg-secondary/10",
			iconsBgColor: "bg-white/20",
			overlayColor: "from-stone-950 to-stone-950/0",
		},
		is_published: false,
		techs: [
			{
				icon: "devicon:tailwindcss",
			},
			{
				icon: "logos:react",
			},
			{
				icon: "devicon:nodejs",
			},
			{
				icon: "simple-icons:express",
				color: "text-gray-100",
			},
			{
				icon: "logos:mongodb-icon",
			},
			{
				icon: "logos:redis",
			},
		],
	},

	// belajar linked_in
	{
		name: "Belajar Linked In",
		desc: "projectCard.belajarLinkedIn.desc",
        category: "Frontend",
		link: "https://belajar-linked-in-zaki.vercel.app",
		status: "Individual",
		preview: belajarLinkedInPreview,
		colors: {
			titleColor: "text-primary",
			bgColor: "from-white to-slate-200",
			btnColor: "bg-secondary/10",
			iconsBgColor: "bg-white/20",
			overlayColor: "from-slate-200 to-slate-200/0",
		},
		is_published: true,
		techs: [
			{
				icon: "devicon:tailwindcss",
			},
			{
				icon: "logos:react",
			},
		],
	},
];