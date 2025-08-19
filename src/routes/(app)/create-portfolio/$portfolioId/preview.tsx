import { useMemo, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { AgGridReact } from 'ag-grid-react';
import {
  themeQuartz,
  type ColDef,
  type ColGroupDef,
  type ICellRendererParams,
} from 'ag-grid-community';
import { Group, NumberInput, Stack, Text, Title } from '@mantine/core';

import data from 'src/mocks/summaryData.json';
import { CustomButtonLink } from '@app/ui-core/custom';

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
  reWeight: string;
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

  const [columnDefs] = useState<(ColDef<SummaryRow> | ColGroupDef<SummaryRow>)[]>([
    {
      field: 'date',
      cellRenderer: 'agGroupCellRenderer',
    },
    { field: 'count', headerName: 'No. of Holdings' },
    { field: 'weight', headerName: 'Weight' },
    {
      headerName: '',
      field: 'reWeight',
      menuTabs: [], // hides menu
      sortable: false, // disables sorting
      cellRenderer: (params: ICellRendererParams) => {
        return (
          <Text
            td="underline"
            c="green.9"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              params.node.setExpanded(!params.node.expanded);
            }}
          >
            Re-weight
          </Text>
        );
      },
    },
  ]);

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        columnDefs: [
          { field: 'sedol', headerName: 'Sedol' },
          { field: 'bbTicker', headerName: 'Bbg Ticker' },
          { field: 'isin', headerName: 'ISIN' },
          { field: 'ticker', headerName: 'Ticker' },
          {
            field: 'weight',
            headerName: 'Weight',
            cellRenderer: (params: ICellRendererParams) => (
              <NumberInput
                onChange={(val) => {
                  params.setValue(val);
                }}
                hideControls
                w={64}
                size="xs"
                value={params.value}
              />
            ),
          },
        ],
        defaultColDef: defaultColDef,
        suppressCellFocus: true,
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
        suppressCellFocus={true}
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
