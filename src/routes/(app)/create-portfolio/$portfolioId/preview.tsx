import { useMemo, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz, type ColDef, type ColGroupDef } from 'ag-grid-community';

import data from 'src/mocks/summaryData.json';
import { Group, Stack, Title } from '@mantine/core';
import { CustomButtonLink } from '@app/ui-core/custom';

// Types
type DetailRow = {
  sedol: string;
  bbTicker: string;
  isin: string;
  ticker: string;
  weight: number;
};

type SummaryRow = {
  date: string;
  count: number;
  weight: number;
  reweight?: string;
  tickerList: DetailRow[];
};

export const Route = createFileRoute('/(app)/create-portfolio/$portfolioId/preview')({
  component: PortfolioPreview,
});

const defaultColDef = {
  flex: 1,
  suppressHeaderMenuButton: true,
};

const icons = {
  groupExpanded: '<span class="ag-icon ag-icon-minus" style="font-size: 14px;"></span>',
  groupContracted: '<span class="ag-icon ag-icon-plus" style="font-size: 14px;"></span>',
};

const reWeightFunc = () => {
  return (
    <button
      type="button"
      style={{
        textDecoration: 'underline',
        color: '#007BFF',
        border: '0',
        backgroundColor: 'transparent',
      }}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('Re-weight clicked');
      }}
    >
      Re-weight
    </button>
  );
};

function PortfolioPreview() {
  const { portfolioId } = Route.useParams();

  // ag-grid theme typing
  const myTheme = themeQuartz.withParams({
    headerBackgroundColor: '#E0F1FF',
    oddRowBackgroundColor: '#00000008',
    columnBorder: { style: 'none' },
    rowBorder: { style: 'none', width: 3 },
    headerRowBorder: { width: '0px' },
    headerColumnBorder: { width: '0px' },
    borderColor: '#E0F1FF',
  });

  // ag-grid ColumnDefs
  const [columnDefs] = useState<(ColDef<SummaryRow> | ColGroupDef<SummaryRow>)[]>([
    {
      field: 'date',
      cellRenderer: 'agGroupCellRenderer',
    },
    { field: 'count', headerName: 'No. of Holdings' },
    { field: 'weight' },
    {
      headerName: '',
      field: 'reweight',
      width: 100,
      menuTabs: [], // hides menu
      sortable: false, // disables sorting
      cellRenderer: reWeightFunc,
    },
  ]);

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        columnDefs: [
          { field: 'sedol' },
          { field: 'bbTicker' },
          { field: 'isin' },
          { field: 'ticker' },
          { field: 'weight' },
        ],
        defaultColDef: {
          flex: 1,
          suppressHeaderMenuButton: true,
        },
      },
      getDetailRowData: (params: {
        data: SummaryRow;
        successCallback: (data: DetailRow[]) => void;
      }) => {
        params.successCallback(params.data.tickerList);
      },
    };
  }, []);

  return (
    <Stack h="80vh" justify="space-between">
      <Title order={4}>Portfolio Preview</Title>
      <AgGridReact<SummaryRow>
        theme={myTheme}
        rowData={data as unknown as SummaryRow[]}
        loading={false}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        masterDetail={true}
        detailCellRendererParams={detailCellRendererParams}
        icons={icons}
        domLayout="autoHeight"
      />

      <Group style={{ alignSelf: 'flex-end' }}>
        <CustomButtonLink
          to="/create-portfolio/$portfolioId/corrections"
          params={{ portfolioId }}
          variant="outline"
        >
          Previous
        </CustomButtonLink>
        <CustomButtonLink to="/create-portfolio/$portfolioId/submit" params={{ portfolioId }}>
          Next
        </CustomButtonLink>
      </Group>
    </Stack>
  );
}
