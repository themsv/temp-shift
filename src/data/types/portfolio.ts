export interface PortfolioLite {
  id: number;
  name: string;
  description: string;
  isMultifund: boolean;
  currency: string;
  totalHoldingsCount: number;
  trackingError: number;
  activeShare: number;
  beta: number;
}

export interface PortfoliosLite {
  content: PortfolioLite[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

export interface BasicPortfolioPayload {
  isMultifund: boolean;
  name: string;
  currency: string;
  strategy: string;
  investmentStyle: string;
  description: string;
}

export interface BasicPortfolio extends BasicPortfolioPayload {
  id: number;
  benchmarkType: string;
  universeType: string;
  mappedPortfolios: string[];
}
