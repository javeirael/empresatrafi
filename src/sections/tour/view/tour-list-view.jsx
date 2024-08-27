import { useCallback } from 'react';

import Stack from '@mui/material/Stack';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { TourList } from '../tour-list';
import { TourSearch } from '../tour-search';
import { TourFilters } from '../tour-filters';

export function TourListView({ tours, destinations, categories, destinyId }) {
  const openFilters = useBoolean();

  const search = useSetState({ query: '', results: [] });

  const handleSearch = useCallback(
    (inputValue) => {
      search.setState({ query: inputValue });

      if (inputValue) {
        const results = tours.filter(
          (tour) =>
            tour.excursionName.toLowerCase().indexOf(search.state.query.toLowerCase()) !== -1
        );

        search.setState({ results });
      }
    },
    [tours, search]
  );

  const filters = useSetState({
    destination: destinyId,
    categories: [],
  });

  const dataFiltered = applyFilter({
    inputData: tours,
    filters: filters.state,
  });

  const canReset = filters.state.destination !== '' || filters.state.category !== '';

  const notFound = !dataFiltered.length && canReset;

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <TourSearch search={search} onSearch={handleSearch} />

      <TourFilters
        filters={filters}
        canReset={canReset}
        open={openFilters.value}
        onOpen={openFilters.onTrue}
        onClose={openFilters.onFalse}
        options={{
          categories,
          destinations,
        }}
      />
    </Stack>
  );

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Tours"
        links={[
          { name: 'Home', href: paths.dashboard.root },
          { name: 'Tours', href: paths.dashboard.tours.root },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Stack spacing={2.5} sx={{ mb: { xs: 3, md: 5 } }}>
        {renderFilters}
      </Stack>

      <TourList tours={dataFiltered} />
    </DashboardContent>
  );
}

const applyFilter = ({ inputData, filters }) => {
  const { destination, categories } = filters;

  // Filters
  if (destination !== '') {
    if (destination === 'All') return inputData;
    inputData = inputData.filter((tour) => destination.includes(tour.destinyId));
  }

  return inputData;
};
