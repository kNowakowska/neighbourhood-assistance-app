import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import core_en from "./translations/core_en.json";
import core_pl from "./translations/core_pl.json";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: window.localStorage.lng || "en",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      core: core_en,
    },
    pl: {
      core: core_pl,
    },
  },
});

export default i18n;
