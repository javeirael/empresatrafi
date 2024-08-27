import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import {
  Box,
  Avatar,
  TextField,
  Typography,
  Autocomplete,
  InputAdornment,
  autocompleteClasses,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Iconify } from '../iconify';
import { SearchNotFound } from '../search-not-found';
import { useTranslate } from 'src/locales';

export function Search({ search, onSearch }) {
  const router = useRouter();

  const { t } = useTranslate('home');

  const { state } = search;

  const handleClick = (id) => {
    router.push(paths.dashboard.tours.root(id));
  };

  const handleKeyUp = (event) => {
    if (state.query) {
      if (event.key === 'Enter') {
        const item = state.results.filter((e) => e.name === state.query)[0];

        handleClick(item.id);
      }
    }
  };

  return (
    <Autocomplete
      sx={{ width: { xs: 1 } }}
      autoHighlight
      popupIcon={null}
      options={state.results}
      onInputChange={(event, newValue) => onSearch(newValue)}
      getOptionLabel={(option) => option.name}
      noOptionsText={<SearchNotFound query={state.query} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      slotProps={{
        popper: { placement: 'bottom-start', sx: { minWidth: 320 } },
        paper: { sx: { [` .${autocompleteClasses.option}`]: { pl: 0.75 } } },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={t('tabs_content.search_placeholder')}
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, item, { inputValue }) => {
        const matches = match(item.name, inputValue);
        const parts = parse(item.name, matches);

        return (
          <Box component="li" {...props} onClick={() => handleClick(item.id)} key={item.id}>
            <Avatar
              key={item.id}
              alt={item.name}
              src={item.image}
              variant="rounded"
              sx={{
                mr: 1.5,
                width: 48,
                height: 48,
                flexShrink: 0,
                borderRadius: 1,
              }}
            />

            <div key={inputValue}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                  sx={{
                    typography: 'body2',
                    fontWeight: part.highlight ? 'fontWeightSemiBold' : 'fontWeightMedium',
                  }}
                >
                  {part.text}
                </Typography>
              ))}
            </div>
          </Box>
        );
      }}
    />
  );
}
