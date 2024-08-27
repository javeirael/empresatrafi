import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

import { shadows, components, typography, colorSchemes, customShadows } from './core';

// ----------------------------------------------------------------------
export function createTheme() {
  const initialTheme = {
    colorSchemes,
    shadows: shadows('light'),
    customShadows: customShadows('light'),
    shape: { borderRadius: 8 },
    components,
    typography,
    cssVarPrefix: '',
  };

  const theme = extendTheme(initialTheme);

  return theme;
}
