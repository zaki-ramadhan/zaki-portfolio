import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
	// english
	en: {
		translation: {
			header: {
				present: "Profile",
				projects: "Projects",
				contact: "Contact",
				specialty: "Web & Mobile Developer",
			},
			projectSection: {
				title: "My Projects",
				searchPlaceholder: "Search project name...",
			},
			helloCard: {
				greeting: "Hi, I'm Zaki.",
				title: "Coding up user experiences that don't suck.",
				subtitle: "I craft full-stack experiences across web & mobile platforms that feel natural and click.",
			},
			wa: {
				message: "Hello, I just saw your portfolio website, and I'm very interested in your skills!",
				contactText: "Contact me via WhatsApp",
			},
			projectCard: {
				zappify: {
					desc: "A Practice Project: Sharpening UI & React Skills",
					status: "Individual",
				},
				kateringIbu: {
					desc: "Digital Solution for Home Catering Business to Boost Competitiveness",
					status: "Collaboration",
				},
				ortuPintar: {
					desc: "Child Development Platform for Parents with 0-6 Years Old Children",
					status: "Collaboration",
				},
				webBlog: {
					desc: "Full-Stack Blog Management System with CRUD Operations",
					status: "Individual",
				},
				peerNote: {
					desc: "A digital platform for sharing study materials and online group discussions.",
					status: "Collaboration",
				},
				rancangin: {
					desc: "A web service offering website development and UI/UX design solutions.",
					status: "Collaboration",
				},
				paperloom: {
					desc: "A simple daily note management platform with a minimalist and responsive design.",
					status: "Individual",
				},
				belajarLinkedIn: {
					desc: "Landing page project for an online course 'Mastering LinkedIn for Career Growth'. Built with React + Vite, featuring clean UI, responsive design, and simple interactivity.",
					status: "Individual",
				},
				dashLive: {
					desc: "Minimalist web-based real-time user data management platform with Livewire in a Laravel ecosystem, featuring CRUD operations.",
					status: "Individual",
				},
			},
			error: {
				not_found: "Page Not Found",
				unauthorized: "Access Denied",
				go_home: "Back to Home",
				desc_404: "The page you are looking for doesn't exist or has been moved.",
				desc_401: "You don't have permission to access this area.",
			},
		},
	},

	// espanol
	es: {
		translation: {
			header: {
				present: "Perfil",
				projects: "Proyectos",
				contact: "Contacto",
				specialty: "Desarrollador Web y Mobile",
			},
			projectSection: {
				title: "Mis Proyectos",
				searchPlaceholder: "Buscar nombre del proyecto...",
			},
			helloCard: {
				greeting: "Hola, soy Zaki.",
				title: "Programando experiencias de usuario que no apestan.",
				subtitle: "Creo experiencias full-stack en plataformas web dan móvil que se sienten naturales.",
			},
			wa: {
				message: "¡Hola! Acabo de ver tu sitio web de portafolio y estoy muy interesado en tus habilidades.",
				contactText: "Contáctame por WhatsApp",
			},
			projectCard: {
				zappify: {
					desc: "Proyecto de Práctica: Perfeccionando Habilidades de UI y React",
					status: "Individual",
				},
				kateringIbu: {
					desc: "Solución Digital para Negocio de Catering Casero y Mejorar Competitividad",
					status: "Colaboración",
				},
				ortuPintar: {
					desc: "Plataforma de Desarrollo Infantil para Padres con Niños de 0-6 Años",
					status: "Colaboración",
				},
				webBlog: {
					desc: "Sistema de Gestión de Blogs Full-Stack con Operaciones CRUD",
					status: "Individual",
				},
				peerNote: {
					desc: "Plataforma digital para compartir materiales de estudio y discusiones grupales en línea.",
					status: "Colaboración",
				},
				rancangin: {
					desc: "Servicio web que ofrece desarrollo de sitios y soluciones de diseño UI/UX.",
					status: "Colaboración",
				},
				paperloom: {
					desc: "Una plataforma sencilla de gestión de notas diarias con un diseño minimalista y adaptable.",
					status: "Individual",
				},
				belajarLinkedIn: {
					desc: "Proyecto de página de aterrizaje para el curso en línea 'Dominando LinkedIn para el Crecimiento Profesional'. Construido con React + Vite, con UI limpia, diseño responsivo e interactividad simple.",
					status: "Individual",
				},
				dashLive: {
					desc: "Plataforma web minimalista para gestión de datos de usuarios en tiempo real con Livewire en un ecosistema Laravel, incluyendo operaciones CRUD.",
					status: "Individual",
				},
			},
			error: {
				not_found: "Page Not Found",
				unauthorized: "Access Denied",
				go_home: "Back to Home",
				desc_404: "The page you are looking for doesn't exist or has been moved.",
				desc_401: "You don't have permission to access this area.",
			},
		},
	},

	// chinese
	zh: {
		translation: {
			header: {
				present: "个人资料",
				projects: "项目",
				contact: "联系方式",
				specialty: "Web 和移动开发工程师",
			},
			projectSection: {
				title: "我的项目",
				searchPlaceholder: "搜索项目名称...",
			},
			helloCard: {
				greeting: "你好，我是 Zaki。",
				title: "编写不糟糕的用户体验。",
				subtitle: "我在 Web 和移动平台上打造自然流畅的全栈交互体验。",
			},
			wa: {
				message: "你好，我刚刚看到了你的作品集网站，我对你的技能很感兴趣！",
				contactText: "通过WhatsApp联系我",
			},
			projectCard: {
				zappify: {
					desc: "练习项目：提升UI和React技能",
					status: "个人",
				},
				kateringIbu: {
					desc: "家庭餐饮业务数字化解决方案，提升市场竞争力",
					status: "合作项目",
				},
				ortuPintar: {
					desc: "0-6岁儿童发展平台，帮助父母监测孩子成长",
					status: "合作项目",
				},
				webBlog: {
					desc: "全栈博客管理系统，具备完整CRUD功能",
					status: "个人",
				},
				peerNote: {
					desc: "用于分享学习资料和在线小组讨论的数字平台。",
					status: "合作项目",
				},
				rancangin: {
					desc: "提供网站开发和UI/UX设计解决方案的网络服务。",
					status: "合作项目",
				},
				paperloom: {
					desc: "一个简约响应式设计的日常笔记管理平台。",
					status: "个人",
				},
				belajarLinkedIn: {
					desc: "为在线课程“掌握LinkedIn助力职业发展”而设计的登录页面项目。采用React + Vite构建，具有简洁的用户界面、响应式设计和简单的交互性。",
					status: "个人",
				},
				dashLive: {
					desc: "采用Livewire构建的Laravel生态系统内，极简实时用户数据管理Web平台，支持CRUD操作。",
					status: "个人",
				},
			},
			error: {
				not_found: "Page Not Found",
				unauthorized: "Access Denied",
				go_home: "Back to Home",
				desc_404: "The page you are looking for doesn't exist or has been moved.",
				desc_401: "You don't have permission to access this area.",
			},
		},
	},

	// japanese
	ja: {
		translation: {
			header: {
				present: "プロフィール",
				projects: "プロジェクト",
				contact: "連絡先",
				specialty: "Web &  モバイルデベロッパー",
			},
			projectSection: {
				title: "私のプロジェクト",
				searchPlaceholder: "プロジェクト名を検索...",
			},
			helloCard: {
				greeting: "こんにちは、私は Zaki です。",
				title: "クソじゃないユーザーエクスペリエンスをコーディングしています。",
				subtitle: "ウェブとモバイルの両方で、自然で直感的なフルスタック体験を提供しています。",
			},
			wa: {
				message: "こんにちは、あなたのポートフォリオサイトを拝見しました。あなたのスキルにとても興味があります！",
				contactText: "WhatsAppでお気軽にご連絡ください",
			},
			projectCard: {
				zappify: {
					desc: "練習プロジェクト：UIとReactスキルの向上",
					status: "個人",
				},
				kateringIbu: {
					desc: "家庭向けケータリング事業のデジタル化ソリューション",
					status: "コラボレーション",
				},
				ortuPintar: {
					desc: "0-6歳児の発達をサポートする親向けプラットフォーム",
					status: "コラボレーション",
				},
				webBlog: {
					desc: "CRUD機能を備えたフルスタックブログ管理システム",
					status: "個人",
				},
				peerNote: {
					desc: "グループで学習資料を共有し、オンラインでディスカッションできるデジタルプラットフォーム。",
					status: "コラボレーション",
				},
				rancangin: {
					desc: "Webサイト制作とUI/UXデザインサービスを提供するウェブサービス。",
					status: "コラボレーション",
				},
				paperloom: {
					desc: "ミニマリストでレスポンシブなデザインのシンプルな日常メモ管理プラットフォーム。",
					status: "個人",
				},
				belajarLinkedIn: {
					desc: "オンラインコース「キャリア成長のためのLinkedInマスター」のランディングページプロジェクト。クリーンなUI、レスポンシブデザイン、シンプルなインタラクティビティを特徴とするReact + Viteで構築。",
					status: "個人",
				},
				dashLive: {
					desc: "Laravelエコシステム内でLivewireを利用した、CRUD操作を備えたミニマリストなWebベースの リアルタイムユーザーデータ管理プラットフォーム。",
					status: "個人",
				},
			},
			error: {
				not_found: "Page Not Found",
				unauthorized: "Access Denied",
				go_home: "Back to Home",
				desc_404: "The page you are looking for doesn't exist or has been moved.",
				desc_401: "You don't have permission to access this area.",
			},
		},
	},

	// bahasa indonesia
	id: {
		translation: {
			header: {
				present: "Profil",
				projects: "Proyek",
				contact: "Kontak",
				specialty: "Web & Mobile Developer",
			},
			projectSection: {
				title: "Proyek Saya",
				searchPlaceholder: "Cari nama proyek...",
			},
			helloCard: {
				greeting: "Halo, saya Zaki.",
				title: "Mengembangkan pengalaman pengguna yang berkualitas.",
				subtitle: "Saya membangun pengalaman full-stack di platform web dan mobile yang terasa natural dan smooth.",
			},
			wa: {
				message: "Halo, saya baru saja melihat website portofolio Anda dan saya tertarik dengan kemampuan Anda!",
				contactText: "Hubungi saya melalui WhatsApp",
			},
			projectCard: {
				zappify: {
					desc: "Proyek Latihan: Mengasah Keterampilan UI & React",
					status: "Individual",
				},
				kateringIbu: {
					desc: "Solusi Digital untuk Usaha Katering Rumahan Meningkatkan Daya Saing",
					status: "Kolaborasi",
				},
				ortuPintar: {
					desc: "Platform Tumbuh Kembang Anak untuk Orang Tua dengan Anak 0-6 Tahun",
					status: "Kolaborasi",
				},
				webBlog: {
					desc: "Sistem Manajemen Blog Full-Stack dengan Operasi CRUD Lengkap",
					status: "Individual",
				},
				peerNote: {
					desc: "Platform digital untuk berbagi materi belajar dan diskusi kelompok secara online.",
					status: "Kolaborasi",
				},
				rancangin: {
					desc: "Layanan web untuk pembuatan website dan solusi desain UI/UX.",
					status: "Kolaborasi",
				},
				paperloom: {
					desc: "Platform kelola catatan sehari-hari sederhana dengan tampilan minimalis dan responsif",
					status: "Individual",
				},
				belajarLinkedIn: {
					desc: "Proyek landing page untuk kelas online 'Menguasai LinkedIn untuk Pertumbuhan Karir'. Dibangun dengan React + Vite, menampilkan UI yang bersih, desain responsif, dan interaktivitas sederhana.",
					status: "Individual",
				},
				dashLive: {
					desc: "Platform manajemen data pengguna real-time berbasis web minimalis dengan Livewire dalam ekosistem Laravel, dilengkapi operasi CRUD.",
					status: "Individual",
				},
			},
			error: {
				not_found: "Page Not Found",
				unauthorized: "Access Denied",
				go_home: "Back to Home",
				desc_404: "The page you are looking for doesn't exist or has been moved.",
				desc_401: "You don't have permission to access this area.",
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
