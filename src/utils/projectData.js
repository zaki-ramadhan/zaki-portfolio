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
		link: "https://zappify.vercel.app",
		status: "projectCard.zappify.status",
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
			{
				icon: "logos:vitejs",
			},
		],
	},

	// katering ibu
	{
		name: "Katering Ibu",
		desc: "projectCard.kateringIbu.desc",
		link: "https://github.com/zaki-ramadhan/katering-ibu?tab=readme-ov-file#katering-ibu-a-laravel-based-catering-website",
		status: "projectCard.kateringIbu.status",
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
				icon: "devicon:javascript",
			},
			{
				icon: "devicon:tailwindcss",
			},
			{
				icon: "devicon:jquery",
			},
			{
				icon: "devicon:laravel",
			},
			{
				icon: "logos:vitejs",
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
		link: "https://github.com/zaki-ramadhan/OrtuPintar-app?tab=readme-ov-file#readme",
		status: "projectCard.ortuPintar.status",
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
				icon: "logos:vitejs",
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
		link: "https://github.com/zaki-ramadhan/web-blog?tab=readme-ov-file#readme",
		status: "projectCard.webBlog.status",
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
				icon: "logos:vitejs",
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
		link: "https://github.com/zaki-ramadhan/peer-note-sharing-platform?tab=readme-ov-file#readme",
		status: "projectCard.peerNote.status",
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
				icon: "logos:vitejs",
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
		link: "https://github.com/akbarryyan/rancanginid",
		status: "projectCard.rancangin.status",
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
			{
				icon: "logos:vitejs",
			},
		],
	},

	// dashlive
	{
		name: "DashLive",
		desc: "projectCard.dashLive.desc",
		link: "https://github.com/akbarryyan/dashLive",
		status: "projectCard.dashLive.status",
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
				icon: "logos:vitejs",
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
		link: "https://github.com/zaki-ramadhan/paperloom?tab=readme-ov-file#readme",
		status: "projectCard.paperloom.status",
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
				icon: "logos:vitejs",
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
		link: "https://belajar-linked-in-zaki.vercel.app",
		status: "projectCard.belajarLinkedIn.status",
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
			{
				icon: "logos:vitejs",
			},
		],
	},
];