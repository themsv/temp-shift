import { Flex, Box } from '@mantine/core';
import { IconTriangleFilled } from '@tabler/icons-react';
import StockOverviewPanel from './StockOverviewPanel';

interface StockOverview {
  readonly openDetailView: boolean;
  readonly setOpenDetailView: (b: boolean) => void;
  readonly setChangeFlex: (b: boolean) => void;
}

export default function StockOverview({ openDetailView, setOpenDetailView }: StockOverview) {
  return (
    <Flex
      align="center"
      style={{ width: openDetailView ? '28%' : '25%', backgroundColor: '#f7f7f7' }}
    >
      <StockOverviewPanel openDetailView={openDetailView} setOpenDetailView={setOpenDetailView} />
      {!openDetailView && (
        <Box
          style={{
            backgroundColor: 'black',
            height: '66px',
            width: '16px',
            marginRight: '3%',
            cursor: 'pointer',
            padding: '0',
            clipPath: 'polygon(0 0, 100% 15%, 100% 85%, 0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => {
            setOpenDetailView(true);
          }}
        >
          <IconTriangleFilled
            size={10}
            style={{
              transform: 'rotate(90deg)',
              fill: 'white',
              stroke: 'none',
            }}
          />
        </Box>
      )}
    </Flex>
  );
}
