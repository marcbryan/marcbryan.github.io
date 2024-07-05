import i18n from "i18next";
import i18nBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(i18nBackend)  
  .use(initReactI18next)
  .init({
    lng: "ES",
    fallbackLng: "ES",
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/i18n/{{lng}}.json"
    }
  });

export default i18n;