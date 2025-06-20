import { Handbook } from '@/app/types/Handbook';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Extradition } from './types/extradition';

interface ExtraditionsFilterSearchParams {
  name: Handbook | null;
}

export const useExtraditionsFilterQuery = (searchParams?: ExtraditionsFilterSearchParams) => {
  const { data, ...rest } = useQuery({
    queryKey: ['extraditions', searchParams],
    queryFn: async () => {
      const response = await axios.get<unknown, AxiosResponse<Extradition[]>>('/api/extraditions', {
        params: {
          b: searchParams?.name?.value,
        },
      });
      return response.data;
    },
  });

  const extraditionBooksOptions: Handbook[] =
    data
      ?.map(({ book }) => ({ value: book.id, label: book.name }))
      .filter((item, index, arr) => index === arr.findIndex(s => s.label === item.label))
      .sort((a, b) => a.label.localeCompare(b.label)) ?? [];

  const extraditionsFilterOptions = {
    extraditionBooksOptions,
  };

  return { data, filterOptions: extraditionsFilterOptions, ...rest };
};
