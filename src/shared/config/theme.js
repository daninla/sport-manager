import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#081627',
      contrastText: '#fffbfb',
    },
    secondary: {
      main: '#133958',
      contrastText: '#35ad55',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  // Bracket-specific tokens used by Playoff widget
  bracket: {
    // a soft bluish gradient for headers/backdrop
    backgroundGradient: 'linear-gradient(180deg, #0f172a 0%, #071226 100%)',
    // card background (slightly translucent)
    cardBg: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
    // primary accent used for connectors and highlights
    accentPrimary: '#ff7a59',
    // secondary accent
    accentSecondary: '#7c5cff',
    // muted text
    textMuted: 'rgba(226,232,240,0.9)',
    // light variant tokens (for reference image)
    light: {
      pageBg: '#f6f7fb',
      pagePanel: '#ffffff',
      cardBg: '#ffffff',
      cardBorder: 'rgba(15,23,42,0.06)',
      accentPrimary: '#ff7a59',
      accentSecondary: '#ffb084',
      headerBg: '#fff5ef',
      headerText: '#0f172a',
      cardText: '#0f172a',
      cardShadow: 'rgba(16,24,40,0.06)',
    },
  },
});
