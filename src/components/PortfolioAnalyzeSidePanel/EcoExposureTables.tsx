import styles from './eco-exposure.module.css';

function PortfolioRegimeForecastTable({ isPanelExpand }: Readonly<{ isPanelExpand: boolean }>) {
  const firstColCls = isPanelExpand ? `${styles.expand} ${styles.firstCol}` : styles.firstCol;
  const secThirdColCls = isPanelExpand
    ? `${styles.expand} ${styles.secThirdCol}`
    : styles.secThirdCol;

  return (
    <table className={`${styles.table} ${styles.topTable} ${styles.expand} ${styles.firstTable}`}>
      <tr>
        <th rowSpan={2} className={`${styles.td} ${firstColCls}`}>
          Regime State
        </th>
        <th
          colSpan={2}
          className={styles.th}
          style={{ textAlign: isPanelExpand ? 'left' : 'center' }}
        >
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

type dataObj = {
  id: number;
  regimeState: string;
  portfolioPosition: { for: (string | null)[]; against: (string | null)[] };
  regimeInLast12Months: string[];
};

type EcoTableProps = {
  data: dataObj[];
  isPanelExpand?: boolean;
};

function EcoTable({ data, isPanelExpand }: Readonly<EcoTableProps>) {
  const firstColCls = isPanelExpand ? `${styles.expand} ${styles.firstCol}` : styles.firstCol;
  const secThirdColCls = isPanelExpand
    ? `${styles.expand} ${styles.secThirdCol}`
    : styles.secThirdCol;

  return (
    <table className={`${styles.table} ${styles.expand} ${styles.firstTable}`}>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td className={`${styles.td} ${firstColCls}`}>{row.regimeState}</td>
            <td
              className={`${styles.td} ${secThirdColCls}`}
              style={{ backgroundColor: row.portfolioPosition.for[1] as string }}
            >
              {row.portfolioPosition.for[0]}
            </td>
            <td
              className={`${styles.td} ${secThirdColCls}`}
              style={{ backgroundColor: row.portfolioPosition.against[1] as string }}
            >
              {row.portfolioPosition.against[0]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function EcoExtendedTable({ data }: Readonly<EcoTableProps>) {
  return (
    <table className={`${styles.table} ${styles.expand} ${styles.secTable}`}>
      {data.map((row) => (
        <tr key={row.id}>
          {row.regimeInLast12Months.map((val, index) => (
            <td key={index} className={styles.td}>
              {val}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
}

export { PortfolioRegimeForecastTable, RegimeInLast12MonthsTable, EcoTable, EcoExtendedTable };
