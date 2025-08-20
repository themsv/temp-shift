import { useCallback, useEffect, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { CellClassParams, ColumnGroupOpenedEvent } from 'ag-grid-community';
import commonStyles from '@app/components/ag-grid/common.module.css';
import styles from './flavours.module.css';
import stocks from '../../mocks/top-stocks.json';

export default function TopStocks() {
  const [data, setData] = useState<object[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const getRankStyleClass = (value: unknown): string | undefined => {
    const num =
      typeof value === 'string' || typeof value === 'number' ? parseFloat(value.toString()) : 0;
    if (isNaN(num)) return;

    if (num <= 20) return commonStyles.rankRed;
    if (num <= 40) return commonStyles.rankCoral;
    if (num <= 49) return commonStyles.rankPink;
    if (num <= 60) return commonStyles.rankGreen;
    if (num <= 74) return commonStyles.rankEmrald;
    if (num > 74) return commonStyles.rankForest;
    return;
  };

  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Stock Details',
        openByDefault: true,
        groupId: 'stockDetails',
        marryChildren: true,

        children: [
          {
            field: 'bbgTicker',
            headerName: 'Bbg Ticker',
            width: 105,
            sortable: true,
            sort: 'desc',
            headerClass: `${commonStyles.leftAlignHeader} customSorticon`,
            cellClass: commonStyles.leftAlignHeader,
          },
          {
            field: 'sedol',
            headerName: 'Sedol',
            columnGroupShow: 'open',
            sortable: true,
            sort: 'desc',
            width: 85,
            headerClass: 'customSorticon',
          },
          {
            field: 'name',
            headerName: 'Name',
            columnGroupShow: 'open',
            sortable: true,
            sort: 'desc',
            width: 200,
            headerClass: `${commonStyles.leftAlignHeader} customSorticon`,
            cellClass: commonStyles.leftAlignHeader,
          },
          {
            field: 'market',
            headerName: 'Market',
            columnGroupShow: 'open',
            sortable: true,
            sort: 'desc',
            width: 125,
            headerClass: `${commonStyles.leftAlignHeader} customSorticon`,
            cellClass: commonStyles.leftAlignHeader,
          },
          {
            field: 'sector',
            headerName: 'Sector',
            columnGroupShow: 'open',
            sortable: true,
            sort: 'desc',
            width: 95,
            headerClass: `${commonStyles.leftAlignHeader} customSorticon`,
            cellClass: commonStyles.leftAlignHeader,
          },
          {
            field: 'industry',
            headerName: 'Industry',
            columnGroupShow: 'open',
            sortable: true,
            sort: 'desc',
            width: 95,
            headerClass: `${commonStyles.leftAlignHeader} customSorticon`,
            cellClass: commonStyles.leftAlignHeader,
          },
          {
            field: 'mktCap',
            width: 105,
            headerName: 'Mkt. Cap',
            sortable: true,
            sort: 'desc',
            cellClass: 'group-boundary',
            headerClass: () => `group-boundary customSorticon`,
          },
        ],
      },
      {
        headerName: '',
        children: [
          {
            field: 'flavourExp',
            width: 40,
            suppressSizeToFit: true,
            headerName: 'A = Flav. Exp.',
            headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
            cellClass: (params: CellClassParams) => {
              const dynamicClass = getRankStyleClass(params.value);
              return ['group-boundary', dynamicClass].filter(Boolean).join(' ');
            },
          },
        ],
      },
      {
        headerName: 'Position',
        groupId: 'position',
        marryChildren: true,
        children: [
          {
            field: 'activeWeight',
            headerName: 'B = Active Weight',

            width: 42,
            cellClass: 'centered-content',
            headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
            cellClassRules: {
              'group-boundary': () => !expandedGroups.position,
            },
          },
          {
            field: 'benchmarkWeight',
            width: 42,
            headerName: 'Benchmark Weight',
            columnGroupShow: 'open',
            headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
            cellClass: 'centered-content',
          },
          {
            field: 'contribution',
            headerName: 'Contribution = (A×B)',
            width: 47,
            columnGroupShow: 'open',
            headerClass: () =>
              expandedGroups.position
                ? `${commonStyles.verticalHeader} group-boundary`
                : expandedGroups.position,
            cellClass: expandedGroups.position ? 'group-boundary' : undefined,
          },
        ],
      },
      {
        headerName: 'Flavour Components',
        groupId: 'flavour',
        width: 390,
        marryChildren: true,
        children: [
          {
            field: 'prof',
            headerName: 'Prof Persistence',
            width: 35,
            headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
            cellClass: 'centered-content',
          },
          {
            field: 'prof',
            headerName: 'ROE_TTM',
            columnGroupShow: 'open',
            width: 35,
            headerClass: () => `${commonStyles.verticalHeader} `,
            cellClass: 'centered-content',
          },
          {
            field: 'compLowRiskRank',
            headerName: '% Rank',
            columnGroupShow: 'open',
            width: 35,
            headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
            cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
          },
          {
            field: 'compLowRisk',
            headerName: 'Comp Low Risk',
            columnGroupShow: 'open',
            headerClass: () => commonStyles.verticalHeader,
            cellClass: 'centered-content',
            width: 35,
          },
          {
            field: 'compLowRiskRank',
            headerName: '% Rank',
            columnGroupShow: 'open',
            width: 35,
            headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
            cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
          },
          {
            field: 'compEarnStability',
            headerName: 'Comp Earn. Stability',
            columnGroupShow: 'open',
            width: 35,
            cellClass: 'centered-content',
            headerClass: () => commonStyles.verticalHeader,
          },
          {
            field: 'compEarnStabilityRank',
            headerName: '% Rank',
            columnGroupShow: 'open',
            width: 35,
            headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
            cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
          },
          {
            field: 'epsGrowthInt',
            headerName: 'EPS Growth INT',
            columnGroupShow: 'open',
            cellClass: 'centered-content',
            width: 35,
            headerClass: () => commonStyles.verticalHeader,
          },
          {
            field: 'epsGrowthIntRank',
            headerName: '% Rank',
            columnGroupShow: 'open',
            width: 35,
            headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
            cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
          },
          {
            field: 'epsGrowthLt',
            headerName: 'EPS Growth LT',
            columnGroupShow: 'open',
            cellClass: 'centered-content',
            width: 35,
            headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
          },
          {
            field: 'epsGrowthLtRank',
            headerName: '% Rank',
            columnGroupShow: 'open',
            width: 35,
            headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
            cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
          },
          {
            field: 'roeTtm',
            headerName: 'ROE_TTM',
            columnGroupShow: 'open',
            width: 35,
            cellClass: 'centered-content',
            headerClass: () => commonStyles.verticalHeader,
          },
          {
            field: 'roeTtmRank',
            headerName: '% Rank',
            columnGroupShow: 'open',
            width: 35,
            headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
            cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
          },
        ],
      },
    ],
    [expandedGroups],
  );
  const onColumnGroupOpened = useCallback((event: ColumnGroupOpenedEvent) => {
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
  }, []);

  useEffect(() => {
    setData(stocks as []);
  }, []);

  return (
    <div className={`${styles.flavourWrapper} ${commonStyles.gridWrapper}`}>
      <div className="ag-theme-alpine" style={{ width: '80vw' }}>
        <AgGridReact
          onColumnGroupOpened={onColumnGroupOpened}
          columnHoverHighlight={false}
          suppressRowHoverHighlight={true}
          rowData={data}
          rowHeight={32}
          headerHeight={90}
          groupHeaderHeight={34}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          defaultColDef={{
            suppressHeaderMenuButton: true,
            suppressSizeToFit: true,
            sortable: false,
            cellClass: 'custom-cell',
            resizable: false,
          }}
        />
      </div>
    </div>
  );
}
