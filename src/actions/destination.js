import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useObtenerDestinos() {
  const url = `${endpoints.destinations.list}`;

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      destinations: data?.data || [],
      destinationsLoading: isLoading,
      destinationsError: error,
      destinationsIsValidating: isValidating,
    }),
    [data, isLoading, error, isValidating]
  );

  return memoizedValue;
}
