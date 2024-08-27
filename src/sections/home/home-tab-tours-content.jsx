import { useCallback } from 'react';

import { Card, Stack, CardHeader, InputLabel } from '@mui/material';

import { useSetState } from 'src/hooks/use-set-state';

import { Search } from 'src/components/search/search';

import { useTranslate } from 'src/locales';

export function HomeTabToursContent({ destinations }) {
  const search = useSetState({ query: '', results: [] });

  const { t } = useTranslate('home');

  const handleSearch = useCallback(
    (inputValue) => {
      search.setState({ query: inputValue });

      if (inputValue) {
        const results = destinations.filter(
          (destination) =>
            destination.name.toLowerCase().indexOf(search.state.query.toLowerCase()) !== -1
        );

        search.setState({ results });
      }
    },
    [destinations, search]
  );
  const renderSearch = (
    <>
      <InputLabel>{t('tabs_content.subtitle')}</InputLabel>
      <Search search={search} onSearch={handleSearch} />
    </>
  );

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardHeader title={t('tabs_content.title')} titleTypographyProps={{ variant: 'body1' }} />
      <Stack spacing={2} padding={3}>
        {renderSearch}
      </Stack>
    </Card>
  );
}
