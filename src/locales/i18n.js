import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import cn_common from "./cn/common.json";
import en_common from "./en/common.json";

i18next
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    lng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      cn: {
        common: cn_common
      },
      en: {
        common: en_common
      }
    },
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged'
    }
  })

export default i18next;