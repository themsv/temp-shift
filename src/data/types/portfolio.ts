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
