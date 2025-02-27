import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      header : {
        "present": "Present",
        "projects": "Projects",
        "contact": "Contact",
      },
      helloCard : {
        "title": "Passionate to pursue the technology.",
        "subtitle" : "I enjoy learning new things and try to overcome new challenges while analyzing how I improve through them.",
      }
    }
  },
  id: {
    translation: {
      header : {
        "present": "Profil",
        "projects": "Proyek",
        "contact": "Kontak",
      },
      helloCard : {
        "title": "Bergairah untuk mengejar teknologi.",
        "subtitle" : "Saya senang mempelajari hal baru dan mencoba mengatasi tantangan baru sambil menganalisis bagaimana saya dapat meningkatkan diri melalui tantangan tersebut.",
      },
      }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default bahasa
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
