import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

import { createTheme } from './create-theme';
import { schemeConfig } from './color-scheme-script';

// ----------------------------------------------------------------------

export function ThemeProvider({ children }) {
  const theme = createTheme();

  return (
    <CssVarsProvider
      theme={theme}
      defaultMode={schemeConfig.defaultMode}
      modeStorageKey={schemeConfig.modeStorageKey}
    >
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}
