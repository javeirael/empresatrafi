import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { MenuItem, MenuList, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fCurrency } from 'src/utils/format-number';
import { fDurationHours } from 'src/utils/format-time';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
// ----------------------------------------------------------------------

export function TourItem({ tour, onView }) {
  const popover = usePopover();

  const renderRating = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        top: 8,
        right: 8,
        zIndex: 9,
        borderRadius: 1,
        position: 'absolute',
        p: '2px 6px 2px 4px',
        typography: 'subtitle2',
        bgcolor: 'warning.lighter',
      }}
    >
      <Iconify icon="eva:star-fill" sx={{ color: 'warning.main', mr: 0.25 }} /> {tour.score}
    </Stack>
  );

  const renderPrice = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        top: 8,
        left: 8,
        zIndex: 9,
        borderRadius: 1,
        bgcolor: 'grey.800',
        position: 'absolute',
        p: '2px 6px 2px 4px',
        color: 'common.white',
        typography: 'subtitle2',
      }}
    >
      {!!tour.adultPrice && (
        <Typography
          variant="subtitle2"
          sx={{ color: 'grey.500', mr: 0.75, textDecoration: 'line-through' }}
        >
          {fCurrency(tour.adultPrice)}
        </Typography>
      )}

      <Typography variant="subtitle2">{fCurrency(tour.adultPriceDiscount)}</Typography>
      <Typography variant="caption" sx={{ ml: 0.5 }}>
        USD
      </Typography>
    </Stack>
  );

  const renderImage = (
    <Box gap={0.5} display="flex" sx={{ p: 1 }}>
      <Box flexGrow={1} sx={{ position: 'relative' }}>
        {renderPrice}
        {renderRating}
        <Image
          alt={tour.excursionImage}
          src={tour.excursionImage}
          sx={{ width: 1, height: 164, borderRadius: 1 }}
        />
      </Box>
    </Box>
  );

  const renderTexts = (
    <ListItemText
      sx={{ p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5) }}
      secondary={
        <Link component={RouterLink} href={paths.dashboard.tours.details(tour.id)} color="inherit">
          {tour.excursionName}
        </Link>
      }
      primaryTypographyProps={{ typography: 'caption', color: 'text.disabled' }}
      secondaryTypographyProps={{
        mt: 1,
        noWrap: true,
        component: 'span',
        color: 'text.primary',
        typography: 'subtitle1',
      }}
    />
  );

  const renderInfo = (
    <Stack
      spacing={1.5}
      sx={{ position: 'relative', p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5) }}
    >
      <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', bottom: 20, right: 8 }}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>

      {[
        {
          icon: <Iconify icon="solar:clock-circle-bold" sx={{ color: 'info.main' }} />,
          label: `${fDurationHours(tour.durationHours)}h ${tour.durationMinutes === 0 ? '' : `${tour.durationMinutes}m`}`,
        },
      ].map((item) => (
        <Stack
          key={item.label}
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2' }}
        >
          {item.icon}
          {item.label}
        </Stack>
      ))}
    </Stack>
  );

  return (
    <>
      <Card>
        {renderImage}
        {renderTexts}
        {renderInfo}
      </Card>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              popover.onClose();
              onView();
            }}
          >
            <Iconify icon="solar:eye-bold" />
            View
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}

TourItem.propTypes = {
  tour: PropTypes.shape({
    id: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    excursionName: PropTypes.string.isRequired,
    excursionImage: PropTypes.string.isRequired,
    durationHours: PropTypes.number.isRequired,
    durationMinutes: PropTypes.number.isRequired,
    adultPrice: PropTypes.number.isRequired,
    adultPriceDiscount: PropTypes.number,
  }),
};
