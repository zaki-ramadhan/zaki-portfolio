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
        title: "Where technology meets creativity, that's where I thrive.",
        subtitle:
          "I love learning new things, adapting to change, and continuously improving my skills.",
      },
      wa: {
        message:
          "Hello, I just saw your portfolio website, and I'm very interested in your skills!",
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
        title:
          "Donde la tecnología se encuentra con la creatividad, ahí es donde prospero.",
        subtitle:
          "Me encanta aprender cosas nuevas, adaptarme a los cambios y mejorar constantemente mis habilidades.",
      },
      wa: {
        message:
          "¡Hola! Acabo de ver tu sitio web de portafolio y estoy muy interesado en tus habilidades.",
      },
      projectCard: {
        zappify: {
          desc: "Un proyecto de práctica: Mejorando habilidades de UI y React",
          status: "En Progreso",
        },
        kateringIbu: {
          desc: "Panel de administración para Katering Ibu",
          status: "Mantenimiento",
        },
      },
    },
  },

  fr: {
    translation: {
      header: {
        present: "Profil",
        projects: "Projets",
        contact: "Contact",
      },
      helloCard: {
        greeting: "Salut, je suis Zaki.",
        title:
          "Là où la technologie rencontre la créativité, c'est là que je m'épanouis.",
        subtitle:
          "J'aime apprendre de nouvelles choses, m'adapter au changement et améliorer continuellement mes compétences.",
      },
      wa: {
        message:
          "Bonjour, je viens de voir votre site de portfolio et je suis très intéressé par vos compétences!",
      },
      projectCard: {
        zappify: {
          desc: "Un projet d'entraînement : Améliorer les compétences en UI et React",
          status: "En Cours",
        },
        kateringIbu: {
          desc: "Tableau de bord d'administration pour Katering Ibu",
          status: "Maintenance",
        },
      },
    },
  },

  de: {
    translation: {
      header: {
        present: "Profil",
        projects: "Projekte",
        contact: "Kontakt",
      },
      helloCard: {
        greeting: "Hallo, ich bin Zaki.",
        title: "Wo Technologie auf Kreativität trifft, dort gedeihe ich.",
        subtitle:
          "Ich liebe es, neue Dinge zu lernen, mich an Veränderungen anzupassen und meine Fähigkeiten kontinuierlich zu verbessern.",
      },
      wa: {
        message:
          "Hallo, ich habe gerade deine Portfolio-Website gesehen und bin sehr an deinen Fähigkeiten interessiert!",
      },
      projectCard: {
        zappify: {
          desc: "Ein Übungsprojekt: Verbesserung der UI- und React-Fähigkeiten",
          status: "In Bearbeitung",
        },
        kateringIbu: {
          desc: "Admin-Dashboard für Katering Ibu",
          status: "Wartung",
        },
      },
    },
  },

  pt: {
    translation: {
      header: {
        present: "Perfil",
        projects: "Projetos",
        contact: "Contato",
      },
      helloCard: {
        greeting: "Oi, eu sou Zaki.",
        title: "Onde a tecnologia encontra a criatividade, é onde eu prospero.",
        subtitle:
          "Adoro aprender coisas novas, me adaptar a mudanças e melhorar continuamente minhas habilidades.",
      },
      wa: {
        message:
          "Olá, acabei de ver seu site de portfólio e estou muito interessado em suas habilidades!",
      },
      projectCard: {
        zappify: {
          desc: "Um projeto de prática: Aprimorando habilidades de UI e React",
          status: "Em Progresso",
        },
        kateringIbu: {
          desc: "Painel de administração para Katering Ibu",
          status: "Manutenção",
        },
      },
    },
  },

  ru: {
    translation: {
      header: {
        present: "Профиль",
        projects: "Проекты",
        contact: "Контакт",
      },
      helloCard: {
        greeting: "Привет, я Заки.",
        title: "Там, где технологии встречаются с креативностью, я процветаю.",
        subtitle:
          "Я люблю изучать новое, адаптироваться к изменениям и постоянно совершенствовать свои навыки.",
      },
      wa: {
        message:
          "Привет, я только что посмотрел ваш сайт-портфолио и очень заинтересован в ваших навыках!",
      },
      projectCard: {
        zappify: {
          desc: "Учебный проект: Совершенствование навыков UI и React",
          status: "В процессе",
        },
        kateringIbu: {
          desc: "Административная панель для Katering Ibu",
          status: "Обслуживание",
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
        title: "技术与创意的结合，是我茁壮成长的源泉。",
        subtitle: "我喜欢学习新事物，适应变化，不断完善自己的技能。",
      },
      wa: {
        message: "你好，我刚刚看到了你的作品集网站，我对你的技能很感兴趣！",
      },
      projectCard: {
        zappify: {
          desc: "一个练习项目：提升UI和React技能",
          status: "进行中",
        },
        kateringIbu: {
          desc: "Katering Ibu的管理仪表板",
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
        title: "技術と創造性が融合する場所、それが私の成長の源です。",
        subtitle: "新しいことを学び、変化に適応し、スキルを磨き続けることが好きです。",
      },
      wa: {
        message:
          "こんにちは、あなたのポートフォリオサイトを拝見しました。あなたのスキルにとても興味があります！",
      },
      projectCard: {
        zappify: {
          desc: "練習プロジェクト：UIとReactスキルの向上",
          status: "進行中",
        },
        kateringIbu: {
          desc: "Katering Ibuの管理ダッシュボード",
          status: "メンテナンス中",
        },
      },
    },
  },

  it: {
    translation: {
      header: {
        present: "Profilo",
        projects: "Progetti",
        contact: "Contatto",
      },
      helloCard: {
        greeting: "Ciao, sono Zaki.",
        title:
          "Dove la tecnologia incontra la creatività, è lì che prospero.",
        subtitle:
          "Mi piace imparare cose nuove, adattarmi ai cambiamenti e migliorare continuamente le mie competenze.",
      },
      wa: {
        message:
          "Ciao, ho appena visto il tuo sito portfolio e sono molto interessato alle tue competenze!",
      },
      projectCard: {
        zappify: {
          desc: "Un progetto di pratica: Migliorare le competenze di UI e React",
          status: "In Corso",
        },
        kateringIbu: {
          desc: "Pannello di amministrazione per Katering Ibu",
          status: "Manutenzione",
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
        greeting: "Hai, saya Zaki.",
        title: "Di mana teknologi bertemu kreativitas, di situlah saya berkembang.",
        subtitle:
          "Saya senang mempelajari hal baru, beradaptasi dengan perubahan, dan terus mengasah keterampilan saya.",
      },
      wa: {
        message:
          "Halo, saya baru saja melihat website portofolio Anda dan saya tertarik dengan kemampuan Anda!",
      },
      projectCard: {
        zappify: {
          desc: "Proyek Latihan: Mengasah Keterampilan UI & React",
          status: "Dalam Proses",
        },
        kateringIbu: {
          desc: "Dashboard Admin untuk Katering Ibu",
          status: "Pemeliharaan",
        },
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default bahasa
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;