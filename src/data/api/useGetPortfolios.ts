import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import URLS from '@app/consts/urls';
import queryKeys from '@app/consts/query-keys';
import { type PortfoliosLite } from '../types/portfolio';

type PortfolioParams = {
  page: number;
  size: number;
  sort: string;
};
async function getPortfolios({ page, size, sort }: PortfolioParams) {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
    sort,
  });

  const response = await axios.get<PortfoliosLite>(`${URLS.portfolios}?${params.toString()}`);
  return response.data;
}

function useGetPortfolios(params: PortfolioParams) {
  return useQuery({
    queryKey: [queryKeys.portfolio.list(), params],
    queryFn: () => getPortfolios(params),
  });
}

export default useGetPortfolios;
