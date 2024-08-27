import { Link } from 'react-router-dom';

import { Box, Card, Stack, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { Image } from 'src/components/image';

import { useTranslate } from 'src/locales';

export function HomeDestinations({ destinations }) {
  const { t } = useTranslate('home');

  const renderDestinations = (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
    >
      {destinations.map((destination, index) => (
        <Link key={index} to={paths.dashboard.tours.root(destination.id)}>
          <Card>
            <Box flexGrow={1} sx={{ position: 'relative' }}>
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  bottom: 8,
                  left: 8,
                  zIndex: 9,
                  borderRadius: 1,
                  bgcolor: 'grey.800',
                  position: 'absolute',
                  p: '2px 6px 2px 4px',
                  color: 'common.white',
                  typography: 'subtitle2w',
                }}
              >
                <Typography>{destination.name}</Typography>
              </Stack>
              <Image
                alt={destination.image}
                src={destination.image}
                ratio="16/9"
                sx={{
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: (theme) => theme.transitions.create('opacity'),
                  '&:hover': { opacity: 0.8 },
                }}
              />
            </Box>
          </Card>
        </Link>
      ))}
    </Box>
  );

  return (
    <>
      <Typography variant="body1" fontSize={20}>
        {t('destinations.title')}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {t('destinations.subtitle')}
      </Typography>

      {renderDestinations}
    </>
  );
}
