import { useTranslation } from 'react-i18next';
// '@mui
import { enUS, deDE, frFR } from '@mui/material/locale';

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '',
  },
  {
    label: 'German',
    value: 'de',
    systemValue: deDE,

    icon: '',
  },
  {
    label: 'French',
    value: 'fr',
    systemValue: frFR,
    icon: '',
  },
];

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();
  const langStorage = localStorage.getItem('i18nextLng');
  const currentLang = LANGS.find((_lang) => _lang.value === langStorage) || LANGS[1];

  const handleChangeLanguage = (newlang) => {
    i18n.changeLanguage(newlang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGS,
  };
}
