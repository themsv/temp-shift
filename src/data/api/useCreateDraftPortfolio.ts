import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import URLS from '@app/consts/urls';
import { mutationKeys } from '@app/consts/query-keys';
import type { BasicPortfolio, BasicPortfolioPayload } from '../types/portfolio';

interface MutationResponse {
  data: BasicPortfolio;
  message: string;
  status: string;
  statusCode: number;
}

async function createDraftPortfolio(payload: BasicPortfolioPayload) {
  const response = await axios.post<MutationResponse>(URLS.portfolioDraft, payload);
  return response.data.data;
}

function useCreateDraftPortfolio() {
  return useMutation({
    mutationKey: mutationKeys.portfolio.create(),
    mutationFn: (payload: BasicPortfolioPayload) => createDraftPortfolio(payload),
  });
}

export default useCreateDraftPortfolio;
