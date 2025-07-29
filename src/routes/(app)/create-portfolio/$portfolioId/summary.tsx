import { useMemo, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { AgGridReact } from 'ag-grid-react';
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  RowApiModule,
  ValidationModule,
  themeQuartz,
  type ColDef,
  type ColGroupDef,
} from 'ag-grid-community';
import {
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  MasterDetailModule,
} from 'ag-grid-enterprise';

ModuleRegistry.registerModules([
  RowApiModule,
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  MasterDetailModule,
  ColumnMenuModule,
  ContextMenuModule,
  ...(process.env.NODE_ENV !== 'production' ? [ValidationModule] : []),
]);

import data from 'src/mocks/summaryData.json';

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

export const Route = createFileRoute('/(app)/create-portfolio/$portfolioId/summary')({
  component: SummaryComponent,
});

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

export default function SummaryComponent() {
  const containerStyle = useMemo<React.CSSProperties>(
    () => ({ width: '100%', height: '100vh' }),
    [],
  );

  // ag-grid theme typing
  const myTheme = themeQuartz.withParams({
    headerBackgroundColor: 'rgb(224, 241, 255)',
    oddRowBackgroundColor: 'rgb(0, 0, 0, 0.03)',
    columnBorder: { style: 'none' },
    rowBorder: { style: 'none', width: 3 },
    headerRowBorder: { width: '0px' },
    headerColumnBorder: { width: '0px' },
    borderColor: 'rgb(224, 241, 255)',
  });

  // ag-grid ColumnDefs
  const [columnDefs] = useState<(ColDef<SummaryRow> | ColGroupDef<SummaryRow>)[]>([
    { field: 'date', cellRenderer: 'agGroupCellRenderer' },
    { field: 'count', headerName: 'No. of Holdings' },
    { field: 'weight' },
    {
      headerName: ' ',
      field: 'reweight',
      width: 100,
      menuTabs: [], // hides menu
      sortable: false, // disables sorting
      cellRenderer: reWeightFunc,
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      suppressHeaderMenuButton: true,
    };
  }, []);

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

  const icons = useMemo(() => {
    return {
      groupExpanded: '<span class="ag-icon ag-icon-minus" style="font-size: 14px;"></span>',
      groupContracted: '<span class="ag-icon ag-icon-plus" style="font-size: 14px;"></span>',
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
        <AgGridReact<SummaryRow>
          theme={myTheme}
          rowData={data as unknown as SummaryRow[]}
          loading={false}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          masterDetail={true}
          detailCellRendererParams={detailCellRendererParams}
          icons={icons}
        />
      </div>
    </div>
  );
}
