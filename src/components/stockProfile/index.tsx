import { useState } from 'react';
import { Flex } from '@mantine/core';

import { useAnalyze } from 'src/context/useAnalyze';
import StockOverview from '@app/components/stockProfile/StockOverview.tsx';
import StockDetail from '@app/components/stockProfile/StockDetail.tsx';
import SearchSecurity from '@app/components/stockProfile/SeachSecurity';
import { innerLayout } from '@app/consts/app-layout';

export default function SelectPortfolio() {
  const [openDetailView, setOpenDetailView] = useState(false);
  const { changeFlex, setChangeFlex } = useAnalyze();

  return (
    <Flex h={`calc(100vh - 4 * ${innerLayout.buttonSetHeight} )`} style={{ marginTop: '0.5%' }}>
      {changeFlex && (
        <StockOverview
          openDetailView={openDetailView}
          setOpenDetailView={setOpenDetailView}
          setChangeFlex={setChangeFlex}
        />
      )}
      {openDetailView && <StockDetail setOpenDetailView={setOpenDetailView} />}
      <SearchSecurity
        changeFlex={changeFlex}
        openDetailView={openDetailView}
        setChangeFlex={setChangeFlex}
      />
    </Flex>
  );
}
