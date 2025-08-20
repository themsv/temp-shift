import { useState, type CSSProperties, type SetStateAction } from 'react';
import { Box, Tabs } from '@mantine/core';
import { useAnalyze } from 'src/context/useAnalyze';
import EcoExposure from './EcoExposurePanel';
import Insights from './InsightsPanel';
import SearchSecurity from '../stockProfile/SeachSecurity';
import StockOverviewPanel from '../stockProfile/StockOverviewPanel';

const tabsList: string[] = ['Insights', 'Eco Exp.', 'Stock Profile'];

type PortfolioAnalyzePanelProps = {
  panelWidthHandler: (closed: boolean) => void;
};

function PortfolioAnalyzePanel({ panelWidthHandler }: Readonly<PortfolioAnalyzePanelProps>) {
  const [isPanelExpand, setIsPanelExpand] = useState(false);
  const { data, setData, activeTab, setActiveTab, setChangeFlex } = useAnalyze();

  function closePanelHandler() {
    setActiveTab(null);
    panelWidthHandler(true);
  }

  function changePanelHandler(e: SetStateAction<string | null>) {
    setActiveTab(e);
    setData(null);
    setChangeFlex(false);
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
              fw={350}
              fz="15px"
              lts="0%"
              lh="150%"
              p="8px 5px"
              w="25px"
              h="110px"
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
      <Tabs.Panel value="Stock Profile" bg="#ffffff">
        {data ? (
          <StockOverviewPanel value={data} closePanelHandler={closePanelHandler} />
        ) : (
          <Box
            style={{
              display: 'flex',
              height: '100%',
            }}
          >
            <SearchSecurity value={data} setValue={setData} />
          </Box>
        )}
      </Tabs.Panel>
    </Tabs>
  );
}

export default PortfolioAnalyzePanel;
