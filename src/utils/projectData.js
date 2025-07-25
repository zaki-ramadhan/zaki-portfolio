// Project data configuration
import zappifyPreview from "@assets/images/ss_pricing_page.webp";
import katIbuPreview from "@assets/images/ss_dashboard_admin_katering_ibu.webp";
import ortuPintarPreview from "@assets/images/ss_ortupintar (2).webp";
import webBlogPreview from "@assets/images/ss-web-blog.webp";
import peerNotePreview from "@assets/images/ss_landing_peerNote.webp";
import rancanginPreview from "@assets/images/ss_landing_rancangin.webp";

export const projectData = [
	// Zappify
	{
		name: "Zappify",
		desc: "projectCard.zappify.desc",
		link: "https://github.com/zaki-ramadhan/zappify?tab=readme-ov-file#zappify",
		status: "projectCard.zappify.status",
		preview: zappifyPreview,
		colors: {
			titleColor: "text-white/80",
			bgColor: "from-emerald-800 to-zappify-darker",
			btnColor: "bg-secondary/20",
			iconsBgColor: "bg-white/5",
			overlayColor: "from-zappify-darker to-zappify-darker/0",
		},
		is_published: false,
		techs: [
			{
				icon: "simple-icons:javascript",
				color: "text-yellow-300",
			},
			{
				icon: "simple-icons:tailwindcss",
				color: "text-cyan-500",
			},
			{
				icon: "simple-icons:react",
				color: "text-blue-400",
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
				icon: "simple-icons:javascript",
				color: "text-yellow-300",
			},
			{
				icon: "simple-icons:tailwindcss",
				color: "text-cyan-500",
			},
			{
				icon: "simple-icons:jquery",
				color: "text-blue-600",
			},
			{
				icon: "simple-icons:laravel",
				color: "text-red-500",
			},
			{
				icon: "simple-icons:mysql",
				color: "text-orange-300",
			},
		],
	},
	
	// OrtuPintar
	{
		name: "OrtuPintar",
		desc: "projectCard.ortuPintar.desc",
		link: "https://github.com/zaki-ramadhan/OrtuPintar-app",
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
				icon: "simple-icons:javascript",
				color: "text-yellow-300",
			},
			{
				icon: "simple-icons:tailwindcss",
				color: "text-cyan-500",
			},
			{
				icon: "simple-icons:react",
				color: "text-blue-400",
			},
		],
	},

	// webBlog
	{
		name: "WebBlog",
		desc: "projectCard.webBlog.desc",
		link: "https://github.com/zaki-ramadhan/web-blog",
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
				icon: "simple-icons:tailwindcss",
				color: "text-cyan-500",
			},
			{
				icon: "simple-icons:alpinedotjs",
				color: "text-teal-500",
			},
			{
				icon: "simple-icons:laravel",
				color: "text-red-500",
			},
			{
				icon: "simple-icons:sqlite",
				color: "text-blue-600",
			},
		],
	},

	// peerNote
	{
		name: "PeerNote",
		desc: "projectCard.peerNote.desc",
		link: "https://github.com/zaki-ramadhan/peer-note-sharing-platform",
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
				icon: "simple-icons:javascript",
				color: "text-yellow-300",
			},
			{
				icon: "simple-icons:tailwindcss",
				color: "text-cyan-500",
			},
			{
				icon: "simple-icons:react",
				color: "text-blue-400",
			},
		],
	},

	// rancangin
	{
		name: "Rancangin",
		desc: "projectCard.peerNote.desc",
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
				icon: "simple-icons:javascript",
				color: "text-yellow-300",
			},
			{
				icon: "simple-icons:tailwindcss",
				color: "text-cyan-500",
			},
			{
				icon: "simple-icons:react",
				color: "text-blue-400",
			},
		],
	},

	// // Katering Ibu Mobile App
	// {
	// 	name: "Katering Ibu Mobile App",
	// 	desc: "projectCard.kateringIbu.desc",
	// 	link: "https://github.com/zaki-ramadhan/katering-ibu",
	// 	status: "projectCard.kateringIbu.status",
	// 	preview: katIbuPreview,
	// 	colors: {
	// 		titleColor: "text-primary",
	// 		bgColor: "from-white to-slate-200",
	// 		btnColor: "bg-secondary/10",
	// 		iconsBgColor: "bg-white/20",
	// 		overlayColor: "from-slate-200 to-slate-200/0",
	// 	},
	// 	is_published: false,
	// 	techs: [
	// 		{
	// 			icon: "simple-icons:javascript",
	// 			color: "text-yellow-300",
	// 		},
	// 		{
	// 			icon: "simple-icons:tailwindcss",
	// 			color: "text-cyan-500",
	// 		},
	// 		{
	// 			icon: "simple-icons:react",
	// 			color: "text-blue-400",
	// 		},
	// 	],
	// },
];
