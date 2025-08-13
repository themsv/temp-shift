import { useState } from 'react';
import { Flex } from '@mantine/core';

import StockOverview from '@app/components/stockProfile/StockOverview.tsx';
import StockDetail from '@app/components/stockProfile/StockDetail.tsx';
import SearchSecurity from '@app/components/stockProfile/SeachSecurity';
import { innerLayout } from '@app/consts/app-layout';

interface SelectValue {
  value: string;
  label: string;
}

export default function SelectPortfolio() {
  const [changeFlex, setChangeFlex] = useState(false);
  const [openDetailView, setOpenDetailView] = useState(false);

  // Allow null because you initialize with null (no selection)
  const [value, setValue] = useState<SelectValue | null>(null);

  return (
    <Flex h={`calc(100vh - 4 * ${innerLayout.buttonSetHeight} )`} style={{ marginTop: '0.5%' }}>
      {changeFlex && (
        <StockOverview
          openDetailView={openDetailView}
          setOpenDetailView={setOpenDetailView}
          setChangeFlex={setChangeFlex}
          setValue={setValue}
          value={value}
        />
      )}
      {openDetailView && <StockDetail setOpenDetailView={setOpenDetailView} />}
      <SearchSecurity
        changeFlex={changeFlex}
        openDetailView={openDetailView}
        value={value}
        setValue={setValue}
        setChangeFlex={setChangeFlex}
      />
    </Flex>
  );
}
