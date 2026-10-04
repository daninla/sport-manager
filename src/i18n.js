import { initReactI18next } from 'react-i18next';
import enAccount from '../public/locales/en/account.json';
import enAuth from '../public/locales/en/auth.json';
import enDashboard from '../public/locales/en/dashboard.json';
import enHeader from '../public/locales/en/header.json';
import enPlayers from '../public/locales/en/players.json';
import enSidebar from '../public/locales/en/sidebar.json';
import enTournamentFilters from '../public/locales/en/tournamentFilters.json';
import enTournamentForm from '../public/locales/en/tournamentForm.json';
import enTournamentPage from '../public/locales/en/tournamentPage.json';
import enTournaments from '../public/locales/en/tournaments.json';
import enClubs from "../public/locales/en/clubs.json";
import uaAccount from '../public/locales/ua/account.json';
import uaAuth from '../public/locales/ua/auth.json';
import uaDashboard from '../public/locales/ua/dashboard.json';
import uaHeader from '../public/locales/ua/header.json';
import uaPlayers from '../public/locales/ua/players.json';
import uaSidebar from '../public/locales/ua/sidebar.json';
import uaTournamentFilters from '../public/locales/ua/tournamentFilters.json';
import uaTournamentForm from '../public/locales/ua/tournamentForm.json';
import uaTournamentPage from '../public/locales/ua/tournamentPage.json';
import uaTournaments from '../public/locales/ua/tournaments.json';
import uaClubs from "../public/locales/ua/clubs.json";
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
        clubs: enClubs,
        players: enPlayers,
        tournaments: enTournaments,
        tournamentForm: enTournamentForm,
        tournamentPage: enTournamentPage,
        sidebar: enSidebar,
        tournamentFilters: enTournamentFilters,
        auth: enAuth,
        account: enAccount,
      },
      ua: {
        dashboard: uaDashboard,
        header: uaHeader,
        clubs: uaClubs,
        players: uaPlayers,
        tournaments: uaTournaments,
        tournamentForm: uaTournamentForm,
        tournamentPage: uaTournamentPage,
        sidebar: uaSidebar,
        tournamentFilters: uaTournamentFilters,
        auth: uaAuth,
        account: uaAccount,
      },
    },
    ns: [
      'dashboard',
      'header',
      'clubs',
      'players',
      'tournaments',
      'tournamentForm',
      'tournamentPage',
      'sidebar',
      'tournamentFilters',
      'auth',
      'account',
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
