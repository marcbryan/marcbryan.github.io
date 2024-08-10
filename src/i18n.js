import i18n from "i18next";
import i18nBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

function getLang() {
  let lang = localStorage.getItem("i18nextLng");
  if (lang != null) {
    lang = JSON.parse(lang);
    if (lang == "ES" || lang == "CAT" || lang == "EN") {
      if (lang != "ES")
        document.documentElement.lang = lang.toLowerCase();

      return lang;
    }
  }
  else {
    const userLang = navigator.language || navigator.userLanguage;
    let lang = "";
    if (userLang.startsWith('ca') && userLang.includes("ES")) 
      lang = "CAT";
    else if (userLang.startsWith('es') || userLang.includes("ES"))
      lang = "ES";
    else
      lang = "EN";

    if (lang != "ES")
      document.documentElement.lang = lang.toLowerCase();

    return lang;
  }
}

i18n
  .use(i18nBackend)  
  .use(initReactI18next)
  .init({
    lng: getLang(),
    fallbackLng: "ES",
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/i18n/{{lng}}.json"
    }
  });

export default i18n;