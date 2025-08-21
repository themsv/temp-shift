import { useState, type CSSProperties, type SetStateAction } from 'react';
import { Tabs } from '@mantine/core';
import { useAnalyze } from 'src/context/useAnalyze';
import TableLayout from './TableLayout';
import Insights from './InsightsPanel';
import SearchSecurity from '../stockProfile/SeachSecurity';
import StockOverviewPanel from '../stockProfile/StockOverviewPanel';

const tabsList: string[] = ['Insights', 'Eco Exp.', 'Stock Profile'];

type TabMenuProps = {
  panelWidthHandler: (closed: boolean) => void;
  tabs: string[];
  activeTabs: string;
};

function TabMenu({ panelWidthHandler, tabs, activeTabs }: Readonly<TabMenuProps>) {
  const [activeTab, setActiveTab] = useState<string | null>(activeTabs);
  const [isVisible, setIsVisible] = useState(true);
  const [isExpand, setIsExpand] = useState(false);
  const { data, setData } = useAnalyze();

  function closeHandler() {
    setIsVisible(false);
    setActiveTab(null);
    panelWidthHandler(true);
  }

  function tabChangeHandler(e: SetStateAction<string | null>) {
    setActiveTab(e);
    setIsVisible(true);
    setIsExpand(false);
    panelWidthHandler(false);
  }

  const zIndex: CSSProperties = isExpand
    ? { position: 'absolute', right: 0, zIndex: 100, width: '100%' }
    : { width: '100%' };

  return (
    <Tabs
      orientation="vertical"
      placement="right"
      value={activeTab}
      onChange={tabChangeHandler}
      style={zIndex}
      h="80vh"
    >
      <Tabs.List>
        {tabs?.map((tabItem) => {
          return (
            <Tabs.Tab
              value={tabItem}
              key={tabItem}
              bg={activeTab === tabItem ? 'black' : '#97EBD4'}
              c={activeTab === tabItem ? 'white' : 'black'}
              style={{
                writingMode: 'vertical-rl',
                padding: '8px 5px',
                fontWeight: 600,
                width: '25px',
                height: '100px',
                textAlign: 'center',
                borderRadius: '0px 25px 25px 0px',
                clipPath: 'polygon(0 0, 100% 10%, 100% 100%, 100% 90%, 0 100%)',
              }}
            >
              <span>{tabItem}</span>
            </Tabs.Tab>
          );
        })}
      </Tabs.List>
      <Tabs.Panel value="Insights" bg="#f8f8f6" p="8px">
        <Insights closeHandler={closeHandler} />
        {/* Insights */}
      </Tabs.Panel>
      <Tabs.Panel value="Eco Exp." bg="#f8f8f6" p="8px">
        {isVisible && (
          <TableLayout closeHandler={closeHandler} isExpand={isExpand} setIsExpand={setIsExpand} />
        )}
        {/* Hello */}
      </Tabs.Panel>
      <Tabs.Panel value="Stock Profile" bg="#ffffff" p="8px">
        {data ? (
          <StockOverviewPanel value={data} />
        ) : (
          <SearchSecurity value={data} setValue={setData} setChangeFlex={() => {}} />
        )}
      </Tabs.Panel>
    </Tabs>
  );
}

export default TabMenu;
