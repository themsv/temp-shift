import { queryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import URLS from '@app/consts/urls';
import queryKeys from '@app/consts/query-keys';
import type { BasicPortfolio } from '../types/portfolio';

async function getPortfolioById(id: string) {
  const response = await axios.get<BasicPortfolio>(URLS.portfolioById(id));
  return response.data;
}

function useGetPortfolioById(id: string) {
  return useQuery({
    queryKey: queryKeys.portfolio.details(id),
    queryFn: () => getPortfolioById(id),
  });
}

export const portfolioByIdQueryOptions = (id: string) =>
  queryOptions({
    queryKey: queryKeys.portfolio.details(id),
    queryFn: () => getPortfolioById(id),
  });

export default useGetPortfolioById;
