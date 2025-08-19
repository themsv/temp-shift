/* eslint-disable @typescript-eslint/no-unused-vars */
import '@tanstack/react-table';

export type MetaColAlignType = 'center' | 'left' | 'right';
declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: MetaColAlignType;
  }
}
