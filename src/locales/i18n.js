import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import cn_common from "./cn/common.json";
import cn_userAuth from "./cn/userAuth.json";

import en_common from "./en/common.json";
import en_userAuth from "./en/userAuth.json";

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
        common: cn_common,
        userAuth: cn_userAuth
      },
      en: {
        common: en_common,
        userAuth: en_userAuth
      }
    },
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged'
    }
  })

export default i18next;