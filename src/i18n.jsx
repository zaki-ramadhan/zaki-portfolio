import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const projectCardData = [
  {
    name: "Zappify",
    description: "A Practice Project: Sharpening UI & React Skills",
  },
  {
    name: "Katering Ibu",
    description: "Admin Dashboard for Katering Ibu",
  },
];

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
      projectCard: projectCardData,
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
      projectCard: projectCardData,
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
      projectCard: projectCardData,
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
      projectCard: projectCardData,
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
      projectCard: projectCardData,
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
      projectCard: projectCardData,
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
      projectCard: projectCardData,
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
      projectCard: projectCardData,
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
      projectCard: projectCardData,
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
      projectCard: projectCardData,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default bahasa
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
