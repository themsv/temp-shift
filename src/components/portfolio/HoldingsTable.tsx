import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef } from 'ag-grid-community';
import holdings from '../../mocks/holdings-upload.json';

interface ValidRow {
  effectiveDate: string;
  sedol: string;
  bbTicker: string;
  isin: string;
  ticker: string;
  weight: string;
}
function ValidHoldings() {
  const [colDefs, setColDefs] = useState<ColDef<ValidRow>[]>([
    { field: 'effectiveDate' },
    { field: 'sedol' },
    { field: 'bbTicker' },
    { field: 'isin' },
    { field: 'ticker' },
    { field: 'weight' },
  ]);

  return (
    //TODO: Create a re-usable Table and render
    <AgGridReact
      rowData={holdings}
      columnDefs={colDefs}
      pagination={true}
      paginationPageSize={5}
      paginationPageSizeSelector={[5, 10, 25, 50]}
      domLayout="autoHeight"
    />
  );
}

interface InvalidRow extends ValidRow {
  isDelete: boolean;
}

function InvalidHoldings() {
  const [rowData, setRowData] = useState<InvalidRow[]>(
    holdings.map((_) => ({ ..._, isDelete: false })),
  );
  const [colDefs, setColDefs] = useState<ColDef<InvalidRow>[]>([
    { field: 'effectiveDate', headerName: 'Effective Date', editable: true, width: 175 },
    { field: 'sedol', headerName: 'Sedol', editable: true },
    { field: 'bbTicker', headerName: 'Bloomberg Ticker', editable: true },
    { field: 'isin', headerName: 'ISIN', editable: true },
    { field: 'ticker', headerName: 'Ticker', editable: true },
    { field: 'weight', width: 125, headerName: 'Weight', editable: true },
    { field: 'isDelete', headerName: 'Delete All', width: 100 },
  ]);
  return (
    //TODO: Create a re-usable Table and render
    <AgGridReact
      rowData={rowData}
      columnDefs={colDefs}
      pagination={true}
      paginationPageSize={5}
      paginationPageSizeSelector={[5, 10, 25, 50]}
      domLayout="autoHeight"
      defaultColDef={{ flex: 1, resizable: true }}
      singleClickEdit={true}
    />
  );
}
export { ValidHoldings, InvalidHoldings };
