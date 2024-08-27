import { Box, Stack, Divider, Checkbox, Skeleton, Typography } from '@mui/material';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { Markdown } from 'src/components/markdown';

export function TourDetailsContent({ tour, tourLoading }) {
  let slides = [];

  if (!tourLoading) {
    slides = tour.gallery.map((image) => ({
      src: image,
    }));
  }

  const renderHead = (
    <>
      <Stack direction="row" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {tour?.excursionName}
        </Typography>

        <Checkbox
          defaultChecked
          color="error"
          icon={<Iconify icon="solar:heart-outline" />}
          checkedIcon={<Iconify icon="solar:heart-bold" />}
          inputProps={{ id: 'favorite-checkbox', 'aria-label': 'Favorite checkbox' }}
        />
      </Stack>

      <Stack spacing={3} direction="row" flexWrap="wrap" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ typography: 'body2' }}>
          <Iconify icon="eva:star-fill" sx={{ color: 'warning.main' }} />
          <Box component="span" sx={{ typography: 'subtitle2' }}>
            {tour?.score}
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ typography: 'body2' }}>
          <Iconify icon="mingcute:location-fill" sx={{ color: 'error.main' }} />
          {tour?.locationName}
        </Stack>

        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ typography: 'subtitle2' }}>
          <Iconify icon="solar:flag-bold" sx={{ color: 'info.main' }} />
          <Box component="span" sx={{ typography: 'body2', color: 'text.secondary' }}>
            Guide by
          </Box>
          <Box component="span" sx={{ typography: 'body2', color: 'text.secondary' }}>
            Trafictours
          </Box>
        </Stack>
      </Stack>
    </>
  );

  const renderContent = (
    <>
      <Stack spacing={2}>
        <Typography variant="h6">Description</Typography>
        <Markdown children={tour?.description} />
      </Stack>

      <Stack spacing={2}>
        <Typography variant="h6">Recommendations</Typography>
        <Markdown children={tour?.recommendation} />
      </Stack>

      <Stack spacing={2}>
        <Typography variant="h6">Whats Included</Typography>
        <Markdown children={tour?.included} />
      </Stack>

      <Stack spacing={2}>
        <Typography variant="h6">Rules and Politics</Typography>
        <Markdown children={tour?.rulePolitic} />
      </Stack>

      <Stack spacing={2}>
        <Typography variant="h6">Features</Typography>
        <Stack direction="row" flexWrap="wrap" spacing={1}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Minimum age to participate:
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {tour?.minAge} years old
          </Typography>
        </Stack>

        <Stack direction="row" flexWrap="wrap" spacing={1}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Maximum age to participate:
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {tour?.maxAge} years old
          </Typography>
        </Stack>
      </Stack>
    </>
  );

  return (
    <>
      {tourLoading ? (
        <Box
          gap={1}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          sx={{ mb: { xs: 3, md: 5 } }}
        >
          <Skeleton variant="rectangular" sx={{ borderRadius: 2, height: 480 }} />

          <Box gap={1} display="grid" gridTemplateColumns="repeat(2, 1fr)">
            <Skeleton variant="rectangular" sx={{ borderRadius: 2, height: 240 }} />
            <Skeleton variant="rectangular" sx={{ borderRadius: 2, height: 240 }} />
            <Skeleton variant="rectangular" sx={{ borderRadius: 2, height: 240 }} />
            <Skeleton variant="rectangular" sx={{ borderRadius: 2, height: 240 }} />
          </Box>
        </Box>
      ) : (
        <>
          <Box
            gap={1}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            sx={{ mb: { xs: 3, md: 5 } }}
          >
            <Image
              alt={slides[0].src}
              src={slides[0].src}
              ratio="1/1"
              sx={{
                borderRadius: 2,
                cursor: 'pointer',
                transition: (theme) => theme.transitions.create('opacity'),
                '&:hover': { opacity: 0.8 },
              }}
            />

            <Box gap={1} display="grid" gridTemplateColumns="repeat(2, 1fr)">
              {slides.slice(1, 5).map((slide) => (
                <Image
                  key={slide.src}
                  alt={slide.src}
                  src={slide.src}
                  ratio="1/1"
                  sx={{
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: (theme) => theme.transitions.create('opacity'),
                    '&:hover': { opacity: 0.8 },
                  }}
                />
              ))}
            </Box>
          </Box>

          <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
            {renderHead}

            <Divider sx={{ borderStyle: 'dashed', mt: 5, mb: 2 }} />

            {renderContent}
          </Stack>
        </>
      )}
    </>
  );
}
