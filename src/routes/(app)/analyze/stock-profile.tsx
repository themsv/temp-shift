import { createFileRoute } from '@tanstack/react-router';
import SelectPortfolio from '@app/components/stockProfile';
export const Route = createFileRoute('/(app)/analyze/stock-profile')({
  component: SelectPortfolioComponent,
});

function SelectPortfolioComponent() {
  return <SelectPortfolio />;
}
