import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Select, Checkbox, MenuItem, FormControl, FormControlLabel } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export function TourFilters({ open, onOpen, onClose, filters, options, canReset }) {
  const handleFilterDestination = useCallback(
    (newValue) => {
      filters.setState({ destination: newValue });
    },
    [filters]
  );

  const handleFilterCategories = useCallback(
    (newValue) => {
      const checked = filters.state.categories.includes(newValue)
        ? filters.state.categories.filter((value) => value !== newValue)
        : [...filters.state.categories, newValue];

      filters.setState({ categories: checked });
    },
    [filters]
  );

  const renderHead = (
    <>
      <Box display="flex" alignItems="center" sx={{ py: 2, pr: 1, pl: 2.5 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Filters
        </Typography>

        <Tooltip title="Reset">
          <IconButton onClick={filters.onResetState}>
            <Badge color="error" variant="dot" invisible={!canReset}>
              <Iconify icon="solar:restart-bold" />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="Close">
          <IconButton onClick={onClose}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />
    </>
  );

  const renderDestinations = (
    <Box display="flex" flexDirection="column">
      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        Destination
      </Typography>

      <FormControl fullWidth sx={{ pr: 1 }}>
        <Select
          defaultValue=""
          value={filters.state.destination}
          onChange={(e) => handleFilterDestination(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          {options.destinations.map((destination, index) => (
            <MenuItem key={index} value={destination.id}>
              {destination.name.charAt(0).toUpperCase()}
              {destination.name.slice(1).toLowerCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );

  const renderCategories = (
    <Box display="flex" flexDirection="column">
      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        Categories
      </Typography>

      {options.categories.map((category, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={filters.state.categories.includes(category.id)}
              onClick={() => handleFilterCategories(category.id)}
            />
          }
          label={`${category.name.charAt(0).toUpperCase()}${category.name.slice(1).toLowerCase()}`}
        />
      ))}
    </Box>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="ic:round-filter-list" />
          </Badge>
        }
        onClick={onOpen}
      >
        Filters
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: 320 } }}
      >
        {renderHead}

        <Scrollbar sx={{ px: 2.5, py: 3 }}>
          <Stack spacing={3}>
            {renderDestinations}
            {renderCategories}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
