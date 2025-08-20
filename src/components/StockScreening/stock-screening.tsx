import { useCallback, useEffect, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { CellClassParams, ColumnGroupOpenedEvent } from 'ag-grid-community';
import commonStyles from '@app/components/ag-grid/common.module.css';
import styles from './stockscreening.module.css';
import screening from './../../mocks/screening.json';

export default function StockScreening() {
  const [data, setData] = useState<object[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const getRankStyleClass = (value: unknown): string | undefined => {
    if (typeof value !== 'string' || !value.includes('%')) return;

    const num = parseFloat(value);
    if (isNaN(num)) return;

    if (num <= 20) return commonStyles.rankRed;
    if (num <= 40) return commonStyles.rankCoral;
    if (num <= 49) return commonStyles.rankPink;
    if (num <= 60) return commonStyles.rankGreen;
    if (num <= 74) return commonStyles.rankEmrald;
    if (num > 74) return commonStyles.rankForest;
  };

  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Stock Details',
        groupId: 'stockDetails',
        marryChildren: true,

        children: [
          {
            field: 'sedol',
            headerName: 'Sedol',
            width: 95,
            columnGroupShow: 'open',
            cellClass: 'centered-content',
          },
          {
            field: 'bbgTicker',
            headerName: 'Bbg Ticker',
            width: 95,
            cellClass: 'centered-content',
          },
          {
            field: 'companyName',
            headerName: 'Company Name',
            columnGroupShow: 'open',
            width: 120,
            cellClass: 'centered-content',
          },
          {
            field: 'sector',
            headerName: 'Sector',
            columnGroupShow: 'open',
            width: 95,
            cellClass: 'centered-content',
          },
          {
            field: 'industry',
            headerName: 'Industry',
            columnGroupShow: 'open',
            width: 105,
            cellClass: 'centered-content',
          },
          {
            field: 'currency',
            headerName: 'Currency',
            columnGroupShow: 'open',
            width: 95,
            cellClass: 'centered-content',
          },
          {
            field: 'price',
            headerName: 'Price (Local)',
            columnGroupShow: 'open',
            width: 95,
            cellClass: 'centered-content',
          },
          {
            field: 'mktCap',
            headerName: 'Mkt Cap',
            headerClass: () => 'group-boundary',
            cellClass: 'group-boundary',
          },
        ],
      },
      {
        headerName: 'Market Details',
        groupId: 'marketDetails',
        marryChildren: true,
        children: [
          {
            field: 'activeWeight',
            headerName: 'Active Weight',
            width: 135,
            headerClass: () => (!expandedGroups.marketDetails ? ` group-boundary` : ''),
            cellClass: !expandedGroups.marketDetails ? 'group-boundary' : 'centered-content',
          },
          {
            field: 'benchmarkWeight',
            headerName: 'Benchmark Weight',
            columnGroupShow: 'open',
            width: 145,
            headerClass: () => (expandedGroups.marketDetails ? ` group-boundary` : ''),
            cellClass: expandedGroups.marketDetails ? 'group-boundary' : 'centered-content',
          },
        ],
      },
      {
        headerName: 'Style Flavours',
        headerClass: 'centered-header',
        marryChildren: true,
        children: [
          {
            headerName: 'Value',
            headerClass: () => 'subHeader',
            marryChildren: true,
            children: [
              {
                field: 'value',
                headerName: 'Value',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'deepValue',
                headerName: 'Deep Value',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'highRiskValue',
                headerName: 'High Risk Value',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'valueTraps',
                headerName: 'Value Traps',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'sentimentValue',
                headerName: 'Sentiment Value',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'lowRiskValue',
                headerName: 'Low Risk Value',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'highYield',
                headerName: 'High Yield',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'lowRiskYield',
                headerName: 'Low Risk Yield',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'shortTermGrowth',
                headerName: 'Short Term Growth',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
            ],
          },

          {
            headerName: 'Growth',
            headerClass: () => 'subHeader',
            children: [
              {
                field: 'lowRiskYields',
                headerName: 'Low Risk Yield',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'garp',
                headerName: 'GARP',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'expensiveGrowth',
                headerName: 'Expensive Growth',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'sentimentGrowth',
                headerName: 'Sentiment Growth',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'highRiskGrowth',
                headerName: 'High Risk Growth',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'growthTraps',
                headerName: 'Growth Traps',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'secularGrowth',
                headerName: 'Secular Growth',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
            ],
          },
          {
            headerName: 'Quality',
            headerClass: () => 'subHeader',
            children: [
              {
                field: 'qualityCompounders',
                headerName: 'Quality Compounders',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'cheapCompounders',
                headerName: 'Cheap Compounders',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'growthCompounders',
                headerName: 'Growth Compounders',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'quasiCompounders',
                headerName: 'Quasi Compounders',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
            ],
          },
          {
            headerName: 'Lossmakers',
            headerClass: () => 'subHeader',
            marryChildren: true,
            children: [
              {
                field: 'lossmakers',
                headerName: 'Lossmakers',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClassRules: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'npatCfoLossmakers',
                headerName: 'NPAT & CFO Lossmakers',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'winnerLossmakers',
                headerName: 'Winner Lossmakers',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'loserLossmakers',
                headerName: 'Loser Lossmakers',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: 'group-boundary',
                cellClassRules: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
            ],
          },
        ],
      },
      {
        headerName: 'Flavour Components',
        headerClass: 'centered-header',
        marryChildren: true,
        children: [
          {
            headerName: 'NTM Consensus EPS Growth',
            headerClass: () => `headers group-boundary`,
            children: [
              {
                field: 'ntmEpsGrowthRaw',
                headerName: 'Raw',
                headerClass: 'sideHeaders group-boundary',
                cellClass: 'centered-content',
                width: 40,
              },
              {
                field: 'ntmEpsGrowthPct',
                headerName: '%',
                headerClass: 'sideHeaders group-boundary',
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
            ],
          },
          {
            headerName: 'LT Consensus EPS Growth',
            headerClass: () => `headers group-boundary`,
            children: [
              {
                field: 'ltEpsGrowthRaw',
                headerName: 'Raw',
                headerClass: 'sideHeaders group-boundary',
                cellClass: 'centered-content',
                width: 40,
              },
              {
                field: 'ltEpsGrowthPct',
                headerName: '%',
                headerClass: 'sideHeaders group-boundary',
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
            ],
          },
          {
            headerName: '“Low Risk” Model',
            headerClass: () => `headers group-boundary`,
            children: [
              {
                field: 'lowRiskRaw',
                headerName: 'Raw',
                headerClass: 'sideHeaders group-boundary',
                cellClass: 'centered-content',
                width: 40,
              },
              {
                field: 'lowRiskPct',
                headerName: '%',
                headerClass: 'sideHeaders group-boundary',
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
            ],
          },
          {
            headerName: 'Composite Stability',
            headerClass: () => `headers group-boundary`,
            children: [
              {
                field: 'stabilityRaw',
                headerName: 'Raw',
                headerClass: 'sideHeaders group-boundary',
                cellClass: 'centered-content',
                width: 40,
              },
              {
                field: 'stabilityPct',
                headerName: '%',
                headerClass: 'sideHeaders group-boundary',
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
            ],
          },
          {
            headerName: '12Mth Momentum',
            headerClass: () => `headers group-boundary`,
            children: [
              {
                field: 'momentumRaw',
                headerName: 'Raw',
                headerClass: 'sideHeaders group-boundary',
                cellClass: 'centered-content',
                width: 40,
              },
              {
                field: 'momentumPct',
                headerName: '%',
                headerClass: 'sideHeaders group-boundary',
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
            ],
          },
          {
            headerName: '3M Earnings Revisions',
            headerClass: () => `headers group-boundary`,
            children: [
              {
                field: 'earningsRevRaw',
                headerName: 'Raw',
                headerClass: 'sideHeaders group-boundary',
                cellClass: 'centered-content',
                width: 40,
              },
              {
                field: 'earningsRevPct',
                headerName: '%',
                headerClass: 'sideHeaders group-boundary',
                cellClass: 'centered-content',
                width: 40,
              },
            ],
          },
          {
            headerName: 'Composite Value Model',
            headerClass: () => `headers group-boundary`,
            children: [
              {
                field: 'valueModelRaw',
                headerName: 'Raw',
                headerClass: 'sideHeaders group-boundary',
                cellClass: 'centered-content',
                width: 40,
              },
              {
                field: 'valueModelPct',
                headerName: '%',
                headerClass: 'sideHeaders group-boundary',
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
            ],
          },
          {
            headerName: 'TTM Return on Equity',
            headerClass: () => `headers group-boundary`,
            children: [
              {
                field: 'roeRaw',
                headerName: 'Raw',
                headerClass: 'sideHeaders group-boundary',
                cellClass: 'centered-content',
                width: 40,
              },
              {
                field: 'roePct',
                headerName: '%',
                headerClass: 'sideHeaders group-boundary',
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
            ],
          },
        ],
      },

      {
        headerName: 'Components of Composite Value Model',
        marryChildren: true,

        children: [
          {
            headerName: 'Earning Yield NTM',
            headerClass: () => `headers group-boundary`,
            children: [
              {
                field: 'earningYieldRaw',
                headerName: 'Raw',
                headerClass: 'sideHeaders group-boundary',
                cellClass: 'centered-content',
                width: 45,
              },
              {
                field: 'earningYieldPct',
                headerName: '%',
                headerClass: 'sideHeaders group-boundary',
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 45,
              },
            ],
          },
          {
            headerName: 'Dividend Yield NTM',
            headerClass: () => `headers`,
            children: [
              {
                field: 'dividendYieldRaw',
                headerName: 'Raw',
                cellClass: 'centered-content',
                headerClass: 'sideHeaders group-boundary',
                width: 45,
              },
              {
                field: 'dividendYieldPct',
                headerName: '%',
                headerClass: 'sideHeaders group-boundary',
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 47,
              },
            ],
          },
          {
            headerName: 'Cyc Adj Earnings NTM',
            headerClass: () => `headers`,
            children: [
              {
                field: 'cycAdjEarningsRaw',
                headerName: 'Raw',
                cellClass: 'centered-content',
                headerClass: 'sideHeaders group-boundary',
                width: 45,
              },
              {
                field: 'cycAdjEarningsPct',
                headerName: '%',
                headerClass: 'sideHeaders group-boundary',
                cellClass: 'group-boundary',
                cellClassRules: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 47,
              },
            ],
          },
        ],
      },
      {
        headerName: '',
        children: [
          {
            headerName: 'Macq Alpha',
            headerClass: () => `horizontalHeaders group-boundary`,
            cellClass: 'group-boundary',
            children: [
              {
                field: 'macqAlphaRaw',
                headerName: 'Raw',
                headerClass: 'sideHeaders group-boundary',
                cellClass: 'centered-content',
                width: 45,
              },
              {
                field: 'macqAlphaPct',
                headerName: '%',
                headerClass: 'sideHeaders group-boundary',
                cellClass: 'group-boundary',
                cellClassRules: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 45,
              },
            ],
          },
        ],
      },
      {
        headerName: 'Macro Betas',
        headerClass: 'centered-header',
        marryChildren: true,
        children: [
          {
            headerName: 'Market Macro',
            headerClass: () => 'subHeader',
            cellClass: 'centered-content',
            marryChildren: true,
            children: [
              {
                field: 'valueGrowth',
                headerName: 'Value Growth',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'upDown',
                headerName: 'Up - Down',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'momentumNonMomentum',
                headerName: 'Momentum - Non Momentum',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'qualityNonQuality',
                headerName: 'Quality - Non Quality',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 45,
              },
            ],
          },
          {
            headerName: 'Risk Macro',
            headerClass: () => 'subHeader',
            marryChildren: true,
            children: [
              {
                field: 'vixLevel',
                headerName: 'VIX Level',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'vixChange',
                headerName: 'VIX Change',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'tenYrChange',
                headerName: '10Yr Change',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
            ],
          },
          {
            headerName: 'Economic Macro',
            headerClass: () => `subHeader`,
            marryChildren: true,
            children: [
              {
                field: 'inflationLevel',
                headerName: 'Inflation Level',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'usInflation',
                headerName: 'US Inflation',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'expectChange',
                headerName: 'Expect Change',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'economicCycle',
                headerName: 'Economic Cycle',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
              {
                field: 'ecoSurprise',
                headerName: 'Eco Surprise',
                headerClass: () => `${commonStyles.verticalHeader} group-boundary`,
                cellClass: (params: CellClassParams) => getRankStyleClass(params.value),
                width: 40,
              },
            ],
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
    setData(screening as []);
  }, []);

  return (
    <div className={`${styles.flavourWrapper} ${commonStyles.gridWrapper}`}>
      <div className="ag-theme-alpine" style={{ width: '90vw' }}>
        <AgGridReact
          onColumnGroupOpened={onColumnGroupOpened}
          autoSizeStrategy={{ type: 'fitGridWidth' }}
          rowData={data}
          columnHoverHighlight={false}
          suppressRowHoverHighlight={true}
          headerHeight={95}
          rowHeight={30}
          groupHeaderHeight={35}
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
