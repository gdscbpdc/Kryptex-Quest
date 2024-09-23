'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9fef00',
    },
    secondary: {
      main: '#00b0ff',
    },
  },
  typography: {
    fontFamily: 'var(--font-open_sans)',
  },
});

export default theme;
