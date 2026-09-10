import { initReactI18next } from 'react-i18next';
import enDashboard from '../public/locales/en/dashboard.json';
import enHeader from '../public/locales/en/header.json';
import enPlayers from '../public/locales/en/players.json';
import enTournamentForm from '../public/locales/en/tournamentForm.json';
import enTournamentPage from '../public/locales/en/tournamentPage.json';
import enTournaments from '../public/locales/en/tournaments.json';
import uaDashboard from '../public/locales/ua/dashboard.json';
import uaHeader from '../public/locales/ua/header.json';
import uaPlayers from '../public/locales/ua/players.json';
import uaTournamentForm from '../public/locales/ua/tournamentForm.json';
import uaTournamentPage from '../public/locales/ua/tournamentPage.json';
import uaTournaments from '../public/locales/ua/tournaments.json';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        dashboard: enDashboard,
        header: enHeader,
        players: enPlayers,
        tournaments: enTournaments,
        tournamentForm: enTournamentForm,
        tournamentPage: enTournamentPage,
      },
      ua: {
        dashboard: uaDashboard,
        header: uaHeader,
        players: uaPlayers,
        tournaments: uaTournaments,
        tournamentForm: uaTournamentForm,
        tournamentPage: uaTournamentPage,
      },
    },
    ns: [
      'dashboard',
      'header',
      'players',
      'tournaments',
      'tournamentForm',
      'tournamentPage',
    ],
    defaultNS: 'dashboard',
    fallbackLng: 'ua',
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
