// Project data configuration
import zappifyPreview from "@assets/images/ss_pricing_page.webp";
import katIbuPreview from "@assets/images/ss_dashboard_admin_katering_ibu.webp";

export const projectData = [
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
];
