import React from 'react';
import {
  CellContext,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { AppQueue, Status } from '@ay-bull-board/api/typings/app';
import s from './HomePage.module.css';
import { Link } from 'react-router-dom';

const QueueLink = ({ info }: { info: CellContext<AppQueue, string | number> }) => {
  const columnId = info.column.id;
  const status = (
    columnId && columnId.startsWith('counts_') ? columnId.replace('counts_', '') : 'latest'
  ) as Status;
  return (
    <Link
      className={s.fullWidth}
      to={`/queue/${encodeURIComponent(info.row.original?.name)}?status=${status}`}
    >
      {info.getValue()}
    </Link>
  );
};

export const HomePage = ({ queues }: { queues: AppQueue[] | undefined }) => {
  const columnHelper = createColumnHelper<AppQueue>();
  const columns = [
    columnHelper.accessor('name', {
      header: () => <span>Name</span>,
      cell: (info) => <QueueLink info={info} />,
    }),
    columnHelper.accessor('counts.failed', {
      header: () => <span>Failed</span>,
      cell: (info) => <QueueLink info={info} />,
    }),
    columnHelper.accessor('counts.waiting', {
      header: () => <span>Waiting</span>,
      cell: (info) => <QueueLink info={info} />,
    }),
    columnHelper.accessor('counts.delayed', {
      header: () => <span>Delayed</span>,
      cell: (info) => <QueueLink info={info} />,
    }),
    columnHelper.accessor('counts.active', {
      header: () => <span>Active</span>,
      cell: (info) => <QueueLink info={info} />,
    }),
    columnHelper.accessor('counts.paused', {
      header: () => <span>Paused</span>,
      cell: (info) => <QueueLink info={info} />,
    }),
    columnHelper.accessor('isPaused', {
      header: () => <span>Is Paused</span>,
    }),
  ];
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: queues || [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={s.container}>
      <table className={s.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={s.tr}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={s.th}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={s.tr}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={s.td}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id} className={s.tr}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} className={s.th}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};
