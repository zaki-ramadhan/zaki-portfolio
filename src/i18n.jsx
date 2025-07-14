import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
	en: {
		translation: {
			header: {
				present: "Profile",
				projects: "Projects",
				contact: "Contact",
			},
			helloCard: {
				greeting: "Hi, I'm Zaki.",
				title: "Coding up user experiences that don't suck.",
				subtitle: "I craft interfaces that feel natural and interactions that just click.",
			},
			wa: {
				message: "Hello, I just saw your portfolio website, and I'm very interested in your skills!",
				contactText: "Contact me via WhatsApp",
			},
			projectCard: {
				zappify: {
					desc: "A Practice Project: Sharpening UI & React Skills",
					status: "In Progress",
				},
				kateringIbu: {
					desc: "Admin Dashboard for Katering Ibu",
					status: "Maintenance",
				},
			},
		},
	},

	es: {
		translation: {
			header: {
				present: "Perfil",
				projects: "Proyectos",
				contact: "Contacto",
			},
			helloCard: {
				greeting: "Hola, soy Zaki.",
				title: "Programando experiencias de usuario que no apestan.",
				subtitle: "Creo interfaces que se sienten naturales e interacciones que simplemente funcionan.",
			},
			wa: {
				message: "¡Hola! Acabo de ver tu sitio web de portafolio y estoy muy interesado en tus habilidades.",
				contactText: "Contáctame por WhatsApp",
			},
			projectCard: {
				zappify: {
					desc: "Proyecto de Práctica: Perfeccionando Habilidades de UI y React",
					status: "En Desarrollo",
				},
				kateringIbu: {
					desc: "Panel de Administración para Katering Ibu",
					status: "En Mantenimiento",
				},
			},
		},
	},

	zh: {
		translation: {
			header: {
				present: "个人资料",
				projects: "项目",
				contact: "联系方式",
			},
			helloCard: {
				greeting: "你好，我是 Zaki。",
				title: "编写不糟糕的用户体验。",
				subtitle: "我设计自然流畅的界面和令人愉悦的交互体验。",
			},
			wa: {
				message: "你好，我刚刚看到了你的作品集网站，我对你的技能很感兴趣！",
				contactText: "通过WhatsApp联系我",
			},
			projectCard: {
				zappify: {
					desc: "练习项目：提升UI和React技能",
					status: "开发中",
				},
				kateringIbu: {
					desc: "Katering Ibu 管理仪表板",
					status: "维护中",
				},
			},
		},
	},

	ja: {
		translation: {
			header: {
				present: "プロフィール",
				projects: "プロジェクト",
				contact: "連絡先",
			},
			helloCard: {
				greeting: "こんにちは、私は Zaki です。",
				title: "クソじゃないユーザーエクスペリエンスをコーディングしています。",
				subtitle: "自然に感じるインターフェースと直感的なインタラクションを作っています。",
			},
			wa: {
				message: "こんにちは、あなたのポートフォリオサイトを拝見しました。あなたのスキルにとても興味があります！",
				contactText: "WhatsAppでお気軽にご連絡ください",
			},
			projectCard: {
				zappify: {
					desc: "練習プロジェクト：UIとReactスキルの向上",
					status: "開発中",
				},
				kateringIbu: {
					desc: "Katering Ibu 管理ダッシュボード",
					status: "メンテナンス中",
				},
			},
		},
	},

	id: {
		translation: {
			header: {
				present: "Profil",
				projects: "Proyek",
				contact: "Kontak",
			},
			helloCard: {
				greeting: "Halo, saya Zaki.",
				title: "Mengembangkan pengalaman pengguna yang berkualitas.",
				subtitle: "Saya merancang interface yang natural dan interaksi yang terasa smooth.",
			},
			wa: {
				message: "Halo, saya baru saja melihat website portofolio Anda dan saya tertarik dengan kemampuan Anda!",
				contactText: "Hubungi saya melalui WhatsApp",
			},
			projectCard: {
				zappify: {
					desc: "Proyek Latihan: Mengasah Keterampilan UI & React",
					status: "Sedang Dikembangkan",
				},
				kateringIbu: {
					desc: "Dashboard Admin untuk Katering Ibu",
					status: "Dalam Pemeliharaan",
				},
			},
		},
	},
};

const savedLanguage = localStorage.getItem("language") || "en";

i18n.use(initReactI18next).init({
	resources,
	lng: savedLanguage,
	fallbackLng: "en",
	interpolation: { escapeValue: false },
});

export default i18n;
