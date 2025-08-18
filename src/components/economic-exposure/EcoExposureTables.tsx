import styles from './eco-exposure.module.css';

function PortfolioRegimeForecastTable({ isExpand }: Readonly<{ isExpand: boolean }>) {
  const firstColCls = isExpand ? `${styles.expand} ${styles.firstCol}` : styles.firstCol;
  const secThirdColCls = isExpand ? `${styles.expand} ${styles.secThirdCol}` : styles.secThirdCol;

  return (
    <table className={`${styles.table} ${styles.topTable} ${styles.expand} ${styles.firstTable}`}>
      <tr>
        <th rowSpan={2} className={`${styles.td} ${firstColCls}`}>
          Regime State
        </th>
        <th colSpan={2} className={styles.th} style={{ textAlign: isExpand ? 'left' : 'center' }}>
          Portfolio Regime Forecasts (& conviction)
        </th>
      </tr>
      <tr>
        <td className={`${styles.td} ${secThirdColCls}`}>Portfolio positioned for</td>
        <td className={`${styles.td} ${secThirdColCls}`}>Portfolio positioned Against</td>
      </tr>
    </table>
  );
}

const last12MonthsData = [
  { id: 1, val: 'Jan 25' },
  { id: 2, val: 'Jan 25' },
  { id: 3, val: 'Jan 25' },
  { id: 4, val: 'Jan 25' },
  { id: 5, val: 'Jan 25' },
  { id: 6, val: 'Jan 25' },
  { id: 7, val: 'Jan 25' },
  { id: 8, val: 'Jan 25' },
  { id: 9, val: 'Jan 25' },
  { id: 10, val: 'Jan 25' },
  { id: 11, val: 'Jan 25' },
  { id: 12, val: 'Jan 25' },
];

function RegimeInLast12MonthsTable() {
  return (
    <table className={`${styles.table} ${styles.topTable} ${styles.expand} ${styles.secTable}`}>
      <tr>
        <th className={styles.th} colSpan={12}>
          Regimes in last 12 months
        </th>
      </tr>
      <tr>
        {last12MonthsData.map((data) => (
          <td key={data.id} className={styles.td}>
            {data.val}
          </td>
        ))}
      </tr>
    </table>
  );
}

type rowObj = {
  rowId: number;
  data: (string | null)[];
};

type EcoTableProps = {
  rowData: rowObj[];
  isExpand?: boolean;
};

function EcoTable({ rowData, isExpand }: Readonly<EcoTableProps>) {
  const firstColCls = isExpand ? `${styles.expand} ${styles.firstCol}` : styles.firstCol;
  const secThirdColCls = isExpand ? `${styles.expand} ${styles.secThirdCol}` : styles.secThirdCol;

  return (
    <table className={`${styles.table} ${styles.expand} ${styles.firstTable}`}>
      {rowData.map((row) => (
        <tr key={row.rowId}>
          {row.data.map((val, index) => {
            const cls = index === 0 ? firstColCls : secThirdColCls;
            return (
              <td key={val} className={`${styles.td} ${cls}`}>
                {val}
              </td>
            );
          })}
        </tr>
      ))}
    </table>
  );
}

function EcoExtendedTable({ rowData }: Readonly<EcoTableProps>) {
  return (
    <table className={`${styles.table} ${styles.expand} ${styles.secTable}`}>
      {rowData.map((row) => (
        <tr key={row.rowId}>
          {row.data.map((val) => (
            <td key={val} className={styles.td}>
              {val}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
}

export { PortfolioRegimeForecastTable, RegimeInLast12MonthsTable, EcoTable, EcoExtendedTable };
