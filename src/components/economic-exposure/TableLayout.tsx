import type { ReactNode } from 'react';
import { Accordion, Group, ScrollArea, Stack } from '@mantine/core';

import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import {
  EcoExtendedTable,
  EcoTable,
  PortfolioRegimeForecastTable,
  RegimeInLast12MonthsTable,
} from './EcoExposureTables';
import styles from './eco-exposure.module.css';
import {
  economicData,
  extendedEconomicData,
  extendedMarketData,
  extendedRiskData,
  marketData,
  riskData,
} from './data';
import PanelHeader from './PanelHeader';

type AccordionProps = {
  label: string;
  children: ReactNode;
};

function AccordionWrapper({ label, children }: Readonly<AccordionProps>) {
  return (
    <Accordion variant="separated" multiple defaultValue={[label]}>
      <Accordion.Item value={label}>
        <Accordion.Control p="0px 8px" className={styles.accordionHeader}>
          {label}
        </Accordion.Control>
        <Accordion.Panel className={styles.accordionContent}>{children}</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

type TableLayoutProps = {
  closeHandler: () => void;
  isExpand: boolean;
  setIsExpand: React.Dispatch<React.SetStateAction<boolean>>;
};

function TableLayout({ closeHandler, isExpand, setIsExpand }: Readonly<TableLayoutProps>) {
  function expandHandler() {
    setIsExpand((prev) => !prev);
  }

  const chevron = isExpand ? <IconChevronRight /> : <IconChevronLeft />;
  return (
    <Stack justify="flex-start" align="stretch" fz={14} h="80vh">
      <PanelHeader
        label="Economic Exposure"
        icon={chevron}
        closeHandler={closeHandler}
        expandHandler={expandHandler}
      />
      <ScrollArea scrollbarSize={4} scrollHideDelay={0}>
        <Group
          p="8px"
          bg="white"
          className={styles.collapseTableWidth}
          grow={!isExpand}
          align="stretch"
        >
          <PortfolioRegimeForecastTable isExpand={isExpand} />
          {isExpand && <RegimeInLast12MonthsTable />}
        </Group>
        <AccordionWrapper label="Market">
          <Group className={styles.collapseTableWidth} grow={!isExpand} align="stretch">
            <EcoTable rowData={marketData} isExpand={isExpand} />
            {isExpand && <EcoExtendedTable rowData={extendedMarketData} />}
          </Group>
        </AccordionWrapper>
        <AccordionWrapper label="Risk">
          <Group className={styles.collapseTableWidth} grow={!isExpand} align="stretch">
            <EcoTable rowData={riskData} isExpand={isExpand} />
            {isExpand && <EcoExtendedTable rowData={extendedRiskData} />}
          </Group>
        </AccordionWrapper>
        <AccordionWrapper label="Economic">
          <Group className={styles.collapseTableWidth} grow={!isExpand} align="stretch">
            <EcoTable rowData={economicData} isExpand={isExpand} />
            {isExpand && <EcoExtendedTable rowData={extendedEconomicData} />}
          </Group>
        </AccordionWrapper>
      </ScrollArea>
    </Stack>
  );
}

export default TableLayout;
