import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
	// english
	en: {
		translation: {
			header: {
				present: "Profile",
				projects: "Projects",
				certificates: "Certificates",
				contact: "Contact",
				dashboard: "Dashboard",
				specialty: "Web & Mobile Dev",
			},
			projectSection: {
				title: "My Projects",
				searchPlaceholder: "Search project name...",
				showMore: "Show More",
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
					desc: "A full-stack web service offering specialized website and mobile development solutions.",
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
			certificateSection: {
				title: "My Certificates",
				verify: "Verify",
				viewPdf: "View PDF Certificate",
				viewImage: "View Photo Certificate",
				empty: "No certificates in this category.",
			},
			mediaViewer: {
				loading: "Loading PDF...",
				errorTitle: "Failed to load PDF in the integrated viewer",
				errorDesc: "This might be due to security (CORS) restrictions on the certificate provider.",
				fallbackButton: "Open in New Tab Instead",
			},
			contactSection: {
				title: "Get In Touch",
				subtitle: "Have a project in mind or just want to say hi? Feel free to reach out!",
				nameLabel: "Your Name",
				namePlaceholder: "Enter your full name",
				emailLabel: "Email Address",
				emailPlaceholder: "example@email.com",
				messageLabel: "Message",
				messagePlaceholder: "What's on your mind?",
				sendButton: "Send Message",
				sending: "Sending...",
				success: "Message sent successfully!",
				error: "Failed to send message. Please try again.",
			},
		},
	},

	// bahasa indonesia
	id: {
		translation: {
			header: {
				present: "Profil",
				projects: "Proyek",
				certificates: "Sertifikat",
				contact: "Kontak",
				dashboard: "Dashboard",
				specialty: "Web & Mobile Dev",
			},
			projectSection: {
				title: "Proyek Saya",
				searchPlaceholder: "Cari nama proyek...",
				showMore: "Tampilkan Lebih Banyak",
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
					desc: "Layanan web full-stack untuk pembuatan website dan solusi pengembangan mobile.",
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
			certificateSection: {
				title: "Sertifikat Saya",
				verify: "Verifikasi",
				viewPdf: "Lihat PDF Sertifikat",
				viewImage: "Lihat Foto Sertifikat",
				empty: "Tidak ada sertifikat dalam kategori ini.",
			},
			mediaViewer: {
				loading: "Sedang memuat PDF...",
				errorTitle: "Gagal memuat PDF di penampil terintegrasi",
				errorDesc: "Ini mungkin karena batasan keamanan (CORS) dari penyedia sertifikat.",
				fallbackButton: "Buka di Tab Baru Saja",
			},
			contactSection: {
				title: "Kontak",
				subtitle: "Punya proyek menarik atau sekadar ingin menyapa? Silakan hubungi saya!",
				nameLabel: "Nama Anda",
				namePlaceholder: "Masukkan nama lengkap Anda",
				emailLabel: "Alamat Email",
				emailPlaceholder: "contoh@email.com",
				messageLabel: "Pesan",
				messagePlaceholder: "Apa yang ingin Anda sampaikan?",
				sendButton: "Kirim Pesan",
				sending: "Mengirim...",
				success: "Pesan berhasil terkirim!",
				error: "Gagal mengirim pesan. Silakan coba lagi.",
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
