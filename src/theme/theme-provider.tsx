import type { ThemeProviderProps as MuiThemeProviderProps } from '@mui/material/styles';

import { useEffect, useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as ThemeVarsProvider } from '@mui/material/styles';

import { createTheme } from './create-theme';

import type {} from './extend-theme-types';
import type { ThemeOptions } from './types';

// ----------------------------------------------------------------------

export type ThemeProviderProps = Partial<MuiThemeProviderProps> & {
  themeOverrides?: ThemeOptions;
};

export function ThemeProvider({ themeOverrides, children, ...other }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  const theme = createTheme({
    themeOverrides,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent flash of unstyled content
  if (!mounted) {
    return null;
  }

  return (
    <ThemeVarsProvider 
      disableTransitionOnChange 
      theme={theme}
      modeStorageKey="portfolio-theme-mode"
      {...other}
    >
      <CssBaseline />
      {children}
    </ThemeVarsProvider>
  );
}