import { useState, type CSSProperties, type SetStateAction } from 'react';
import { Tabs } from '@mantine/core';
import EcoExposure from './EcoExposurePanel';
import Insights from './InsightsPanel';

const tabsList: string[] = ['Insights', 'Eco Exp.', 'Stock Profile'];

type PortfolioAnalyzePanelProps = {
  panelWidthHandler: (closed: boolean) => void;
};

function PortfolioAnalyzePanel({ panelWidthHandler }: Readonly<PortfolioAnalyzePanelProps>) {
  const [activeTab, setActiveTab] = useState<string | null>('Insights');
  const [isPanelExpand, setIsPanelExpand] = useState(false);

  function closePanelHandler() {
    setActiveTab(null);
    panelWidthHandler(true);
  }

  function changePanelHandler(e: SetStateAction<string | null>) {
    setActiveTab(e);
    setIsPanelExpand(false);
    panelWidthHandler(false);
  }

  const zIndex: CSSProperties = isPanelExpand
    ? { position: 'absolute', right: 0, zIndex: 100, width: '100%' }
    : { width: '100%' };

  return (
    <Tabs
      defaultValue="Insights"
      orientation="vertical"
      placement="right"
      value={activeTab}
      onChange={changePanelHandler}
      style={zIndex}
      h="80vh"
      color="black"
    >
      <Tabs.List>
        {tabsList.map((tabItem) => {
          return (
            <Tabs.Tab
              value={tabItem}
              fw={400}
              fz="15.69px"
              lts="0%"
              lh="150%"
              p="8px 5px"
              w="30px"
              h="120px"
              ta="center"
              bdrs="0px 25px 25px 0px"
              key={tabItem}
              bg={activeTab === tabItem ? 'black' : '#97EBD4'}
              c={activeTab === tabItem ? 'white' : 'black'}
              style={{
                writingMode: 'vertical-rl',
                clipPath: 'polygon(0 0, 100% 10%, 100% 100%, 100% 90%, 0 100%)',
              }}
            >
              {tabItem}
            </Tabs.Tab>
          );
        })}
      </Tabs.List>
      <Tabs.Panel value="Insights" bg="#f8f8f6" p="8px">
        <Insights closePanelHandler={closePanelHandler} />
        {/* Insights */}
      </Tabs.Panel>
      <Tabs.Panel value="Eco Exp." bg="#f8f8f6" p="8px">
        <EcoExposure
          closePanelHandler={closePanelHandler}
          isPanelExpand={isPanelExpand}
          setIsPanelExpand={setIsPanelExpand}
        />
        {/* Hello */}
      </Tabs.Panel>
      <Tabs.Panel value="Stock Profile" bg="#ffffff" p="8px">
        Stock profile
      </Tabs.Panel>
    </Tabs>
  );
}

export default PortfolioAnalyzePanel;
