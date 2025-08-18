import { ScrollArea, Stack } from '@mantine/core';
import { ArticleCard } from '../dashboard/ArticleCard';
import insights from '../../mocks/insights.json';
import PanelHeader from './PanelHeader';

type InsightsProps = {
  closePanelHandler: () => void;
};

function Insights({ closePanelHandler }: Readonly<InsightsProps>) {
  return (
    <Stack bg="#f8f8f7" h="80vh">
      <PanelHeader label="Insights" closePanelHandler={closePanelHandler} />
      <ScrollArea offsetScrollbars type="hover">
        <Stack gap="sm">
          {insights.map((item) => (
            <ArticleCard key={item.id} {...item} />
          ))}
        </Stack>
      </ScrollArea>
    </Stack>
  );
}

export default Insights;
