import { useState } from 'react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Button,
  Center,
  Group,
  Table as MTable,
  NativeSelect,
  ScrollArea,
  Stack,
  type TableProps,
  Text,
} from '@mantine/core';
import { TableLoadingSkeleton } from './cell-loader';

interface CustomTableProps extends TableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<any, any>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableData: any[];
  isLoading: boolean;
  count: number;
  withPagination: boolean;
}

function CustomTable(props: Readonly<CustomTableProps>) {
  const { tableData, columns, isLoading, count, withPagination, ...rest } = props;

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const tableInstance = useReactTable({
    data: tableData,
    columns,
    state: {
      columnFilters,
      pagination,
    },

    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <ScrollArea>
      <Stack>
        <MTable striped stickyHeader {...rest}>
          <MTable.Thead>
            {tableInstance.getHeaderGroups().map((headerGroup) => (
              <MTable.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <MTable.Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ cursor: 'pointer', backgroundColor: '#E0F1FF' }}
                  >
                    <Text fw="500" size="sm" ta="center">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </Text>
                  </MTable.Th>
                ))}
              </MTable.Tr>
            ))}
          </MTable.Thead>

          <MTable.Tbody>
            {isLoading ? (
              <TableLoadingSkeleton rows={7} columns={columns.length} />
            ) : (
              tableInstance.getRowModel().rows.map((row) => (
                <MTable.Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const align = cell.column.columnDef.meta?.align;
                    return (
                      <MTable.Td
                        key={cell.id}
                        style={{
                          textAlign: align,
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </MTable.Td>
                    );
                  })}
                </MTable.Tr>
              ))
            )}
          </MTable.Tbody>
        </MTable>
        {count === 0 && (
          <Center my="md">
            <Text>No Data Available</Text>
          </Center>
        )}

        {withPagination && (
          <Group justify="end">
            <Button
              onClick={() => {
                tableInstance.firstPage();
              }}
              disabled={!tableInstance.getCanPreviousPage()}
            >
              {'<<'}
            </Button>
            <Button
              onClick={() => {
                tableInstance.previousPage();
              }}
              disabled={!tableInstance.getCanPreviousPage()}
            >
              {'<'}
            </Button>
            <Button
              onClick={() => {
                tableInstance.nextPage();
              }}
              disabled={!tableInstance.getCanNextPage()}
            >
              {'>'}
            </Button>
            <Button
              onClick={() => {
                tableInstance.lastPage();
              }}
              disabled={!tableInstance.getCanNextPage()}
            >
              {'>>'}
            </Button>
            <NativeSelect
              value={tableInstance.getState().pagination.pageSize}
              onChange={(e) => {
                tableInstance.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </NativeSelect>
          </Group>
        )}
      </Stack>
    </ScrollArea>
  );
}

export default CustomTable;
