import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import URLS from '@app/consts/urls';
import queryKeys from '@app/consts/query-keys';

import { type PortfolioLite } from '../types/portfolio';

async function getPortfolios() {
  const response = await axios.get<PortfolioLite[]>(URLS.portfolios);
  return response.data;
}

function useGetPortfolios() {
  return useQuery({
    queryKey: queryKeys.portfolio.list(),
    queryFn: getPortfolios,
  });
}
export default useGetPortfolios;
