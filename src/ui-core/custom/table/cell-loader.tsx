import { Skeleton, Table as MTable } from '@mantine/core';

function CellLoader() {
  return <Skeleton height={24} />;
}

type TableLoadingSkeletonProps = {
  rows: number;
  columns: number;
};

export function TableLoadingSkeleton({ rows, columns }: TableLoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <MTable.Tr key={`loading-${rowIndex.toString()}`}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <MTable.Td key={`loading-${rowIndex.toString()}-${colIndex.toString()}`}>
              <CellLoader />
            </MTable.Td>
          ))}
        </MTable.Tr>
      ))}
    </>
  );
}
