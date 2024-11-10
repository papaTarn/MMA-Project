import i18n from 'i18next';
import { translation as th } from './lang/thai.lang';

const resources = {
  th: {
    translation: th,
  },
};

i18n.init({
  resources,
  lng: 'th',
  supportedLngs: ['th'],
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
