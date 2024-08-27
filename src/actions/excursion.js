import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useObtenerTours() {
  const accountId = 'd58faada-c5e7-4893-8960-9b1b1cbe2266';

  const url = `${endpoints.tours.list}?accountId=${accountId}&pageNumber=1`;

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      tours: data?.data || [],
      toursLoading: isLoading,
      toursError: error,
      toursIsValidating: isValidating,
    }),
    [data, isLoading, error, isValidating]
  );

  return memoizedValue;
}

export function useObtenerTour(id) {
  const url = `${endpoints.tours.details}/${id}`;

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      tour: data?.data || [],
      tourLoading: isLoading,
      tourError: error,
      tourIsValidating: isValidating,
    }),
    [data, isLoading, error, isValidating]
  );

  return memoizedValue;
}
