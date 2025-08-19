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
import { economicData, marketData, riskData } from './data';
import PanelHeader from './PanelHeader';

type AccordionProps = {
  label: string;
  children: ReactNode;
};

function AccordionWrapper({ label, children }: Readonly<AccordionProps>) {
  return (
    <Accordion variant="separated" multiple defaultValue={[label]} my="xs">
      <Accordion.Item value={label} bg="#fff">
        <Accordion.Control p="0px 8px" className={styles.accordionHeader}>
          {label}
        </Accordion.Control>
        <Accordion.Panel className={styles.accordionContent}>{children}</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

type EcoExposureProps = {
  closePanelHandler: () => void;
  isPanelExpand: boolean;
  setIsPanelExpand: React.Dispatch<React.SetStateAction<boolean>>;
};

function EcoExposure({
  closePanelHandler,
  isPanelExpand,
  setIsPanelExpand,
}: Readonly<EcoExposureProps>) {
  function expandHandler() {
    setIsPanelExpand((prev) => !prev);
  }

  const chevron = isPanelExpand ? <IconChevronRight /> : <IconChevronLeft />;

  return (
    <Stack justify="flex-start" align="stretch" fz={14} h="80vh">
      <PanelHeader
        label="Economic Exposure"
        icon={chevron}
        closePanelHandler={closePanelHandler}
        expandHandler={expandHandler}
      />
      <ScrollArea scrollbarSize={4} scrollHideDelay={0}>
        <Group
          p="8px"
          bg="white"
          className={styles.collapseTableWidth}
          grow={!isPanelExpand}
          align="stretch"
          gap={10}
        >
          <PortfolioRegimeForecastTable isPanelExpand={isPanelExpand} />
          {isPanelExpand && <RegimeInLast12MonthsTable />}
        </Group>
        <AccordionWrapper label="Market">
          <Group
            className={styles.collapseTableWidth}
            grow={!isPanelExpand}
            align="stretch"
            gap={10}
          >
            <EcoTable data={marketData} isPanelExpand={isPanelExpand} />
            {isPanelExpand && <EcoExtendedTable data={marketData} />}
          </Group>
        </AccordionWrapper>
        <AccordionWrapper label="Risk">
          <Group
            className={styles.collapseTableWidth}
            grow={!isPanelExpand}
            align="stretch"
            gap={10}
          >
            <EcoTable data={riskData} isPanelExpand={isPanelExpand} />
            {isPanelExpand && <EcoExtendedTable data={riskData} />}
          </Group>
        </AccordionWrapper>
        <AccordionWrapper label="Economic">
          <Group
            className={styles.collapseTableWidth}
            grow={!isPanelExpand}
            align="stretch"
            gap={10}
          >
            <EcoTable data={economicData} isPanelExpand={isPanelExpand} />
            {isPanelExpand && <EcoExtendedTable data={economicData} />}
          </Group>
        </AccordionWrapper>
      </ScrollArea>
    </Stack>
  );
}

export default EcoExposure;
