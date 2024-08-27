import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useObtenerCategorias() {
  const url = `${endpoints.categories.list}`;

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      categories: data?.data || [],
      categoriesLoading: isLoading,
      categoriesError: error,
      categoriesIsValidating: isValidating,
    }),
    [data, isLoading, error, isValidating]
  );

  return memoizedValue;
}
