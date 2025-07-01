import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type {
  ColDef,
  ColGroupDef,
  ColumnGroupOpenedEvent,
  CellClassParams,
} from 'ag-grid-community';
import rowData from '../../mocks/grid-data.json';
import styles from './ContributorsTable.module.css';

const ContributorsTable = () => {
  const [data, setData] = useState<object[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const getRankStyleClass = (value: unknown): string | undefined => {
    const num =
      typeof value === 'string' || typeof value === 'number' ? parseFloat(value.toString()) : 0;
    if (isNaN(num)) return;

    if (num <= 20) return styles.rankRed;
    if (num <= 40) return styles.rankCoral;
    if (num <= 49) return styles.rankPink;
    if (num <= 60) return styles.rankGreen;
    if (num <= 74) return styles.rankEmrald;
    if (num > 74) return styles.rankForest;

    return;
  };

  const columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: '',
      field: 'empty',
      suppressSizeToFit: true,
      suppressHeaderMenuButton: true,
      sortable: false,
      resizable: false,
      children: [
        {
          field: 'rank',
          headerName: 'Rank',
          width: 55,
          maxWidth: 70,
          headerClass: 'group-boundary',
          cellClass: 'group-boundary',
        },
      ],
    },
    {
      headerName: 'Stock Details',
      groupId: 'stockDetails',
      marryChildren: true,
      children: [
        {
          field: 'bbgTicker',
          headerName: 'BBG Ticker',
          cellClass: styles.leftAlignCell,
          headerClass: () =>
            !expandedGroups.stockDetails
              ? `${styles.leftAlignHeader} group-boundary`
              : styles.leftAlignHeaderExpanded,
          cellClassRules: {
            'group-boundary': () => !expandedGroups.stockDetails,
          },
        },
        { field: 'mktCap', columnGroupShow: 'open' },
        { field: 'sedol', columnGroupShow: 'open' },
        { field: 'name', columnGroupShow: 'open', width: 162 },
        { field: 'sector', columnGroupShow: 'open', width: 110 },
        {
          field: 'industry',
          columnGroupShow: 'open',
          width: 110,
          headerClass: expandedGroups.stockDetails ? 'group-boundary' : undefined,
          cellClass: expandedGroups.stockDetails ? 'group-boundary' : undefined,
        },
      ],
    },
    {
      headerName: 'Portfolio Position',
      groupId: 'portfolioPos',
      marryChildren: true,
      children: [
        { field: 'activeWeight', headerName: 'A = Active Weight' },
        { field: 'flavourExp', headerName: 'B = Flavour Exp.' },
        {
          field: 'expContrib',
          headerName: 'Exp. Contrib. (A × B)',
          width: 135,
          headerClass: !expandedGroups.portfolioPos ? 'group-boundary' : undefined,
          cellClass: !expandedGroups.portfolioPos ? 'group-boundary' : undefined,
        },
        {
          field: 'percentExpContrib',
          headerName: '% Exp. Contrib.',
          columnGroupShow: 'open',
          headerClass: expandedGroups.portfolioPos ? 'group-boundary' : undefined,
          cellClass: expandedGroups.portfolioPos ? 'group-boundary' : undefined,
        },
      ],
    },
    {
      headerName: 'Flavour Components',
      groupId: 'flavourComponents',
      marryChildren: true,
      children: [
        {
          field: 'compValueModel1',
          headerName: 'Comp. Value Model',
          width: 165,
          headerClass: !expandedGroups.flavourComponents ? 'group-boundary' : undefined,
          cellClass: !expandedGroups.flavourComponents ? 'group-boundary' : undefined,
        },
        {
          field: 'rank1',
          headerName: '%Rank',
          columnGroupShow: 'open',
          width: 65,
          cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
        },
        {
          field: 'compValueModel2',
          headerName: 'Comp. Value Model',
          columnGroupShow: 'open',
          width: 130,
        },
        {
          field: 'rank2',
          headerName: '%Rank',
          columnGroupShow: 'open',
          width: 65,
          headerClass: expandedGroups.flavourComponents ? 'group-boundary' : undefined,
          cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
        },
      ],
    },
  ];

  useEffect(() => {
    setData(rowData as []);
  }, []);

  const onColumnGroupOpened = (event: ColumnGroupOpenedEvent) => {
    const group = event.columnGroup;
    if (!group) return;

    const groupId = group.getGroupId();
    const expanded = group.isExpanded();

    if (typeof groupId === 'string') {
      setExpandedGroups((prev) => ({
        ...prev,
        [groupId]: expanded,
      }));
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ width: 'auto' }}>
      <AgGridReact
        onColumnGroupOpened={onColumnGroupOpened}
        rowData={data}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        defaultColDef={{
          suppressHeaderMenuButton: true,
          sortable: false,
          resizable: true,
          cellClass: 'custom-cell',
          width: 122,
          suppressSizeToFit: true,
        }}
      />
    </div>
  );
};

export default ContributorsTable;
