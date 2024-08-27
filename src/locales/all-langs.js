// core (MUI)
import { frFR as frFRCore } from '@mui/material/locale';
import { esES as esMXCore } from '@mui/material/locale';
// date pickers (MUI)
import { enUS as enUSDate, frFR as frFRDate } from '@mui/x-date-pickers/locales';
import { esES as esMXDate } from '@mui/x-date-pickers/locales';
// data grid (MUI)
import { enUS as enUSDataGrid, frFR as frFRDataGrid } from '@mui/x-data-grid/locales';
import { esES as esMXDataGrid } from '@mui/x-data-grid/locales';

// ----------------------------------------------------------------------

export const allLangs = [
  {
    value: 'en',
    label: 'English',
    countryCode: 'GB',
    adapterLocale: 'en',
    numberFormat: { code: 'en-US', currency: 'USD' },
    systemValue: {
      components: { ...enUSDate.components, ...enUSDataGrid.components },
    },
  },
  {
    value: 'fr',
    label: 'French',
    countryCode: 'FR',
    adapterLocale: 'fr',
    numberFormat: { code: 'fr-Fr', currency: 'EUR' },
    systemValue: {
      components: { ...frFRCore.components, ...frFRDate.components, ...frFRDataGrid.components },
    },
  },
  {
    value: 'es',
    label: 'Español',
    countryCode: 'MX',
    adapterLocale: 'es-MX',
    numberFormat: { code: 'es-MX', currency: 'MXN' },
    systemValue: {
      components: { ...esMXCore.components, ...esMXDate.components, ...esMXDataGrid.components },
    },
  }
  
];

/**
 * Country code:
 * https://flagcdn.com/en/codes.json
 *
 * Number format code:
 * https://gist.github.com/raushankrjha/d1c7e35cf87e69aa8b4208a8171a8416
 */
