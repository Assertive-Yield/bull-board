import React, { useMemo } from 'react';
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
      cell: (info) => (
        <span 
          className={`${s.statusIndicator} ${info.getValue() ? s.paused : s.active}`}
        >
          {info.getValue() ? 'Paused' : 'Running'}
        </span>
      ),
    }),
  ];
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "counts_failed",
      desc: true
    },
    {
      id: "counts_waiting",
      desc: true
    }
  ]);

  const queueStats = useMemo(() => {
    if (!queues || queues.length === 0) {
      return {
        totalQueues: 0,
        activeQueues: 0,
        pausedQueues: 0,
        failedJobs: 0,
        waitingJobs: 0,
        activeJobs: 0,
        delayedJobs: 0,
        pausedJobs: 0,
        queuesWithFailed: 0,
        queuesWithWaiting: 0,
        queuesWithActive: 0,
        queuesWithDelayed: 0,
        healthStatus: 'success'
      };
    }

    const stats = {
      totalQueues: queues.length,
      activeQueues: queues.filter(q => !q.isPaused).length,
      pausedQueues: queues.filter(q => q.isPaused).length,
      failedJobs: 0,
      waitingJobs: 0,
      activeJobs: 0,
      delayedJobs: 0,
      pausedJobs: 0,
      queuesWithFailed: 0,
      queuesWithWaiting: 0,
      queuesWithActive: 0,
      queuesWithDelayed: 0
    };

    queues.forEach(queue => {
      stats.failedJobs += queue.counts.failed || 0;
      stats.waitingJobs += queue.counts.waiting || 0;
      stats.activeJobs += queue.counts.active || 0;
      stats.delayedJobs += queue.counts.delayed || 0;
      stats.pausedJobs += queue.counts.paused || 0;
      
      if ((queue.counts.failed || 0) > 0) stats.queuesWithFailed++;
      if ((queue.counts.waiting || 0) > 0) stats.queuesWithWaiting++;
      if ((queue.counts.active || 0) > 0) stats.queuesWithActive++;
      if ((queue.counts.delayed || 0) > 0) stats.queuesWithDelayed++;
    });

    const totalJobs = stats.failedJobs + stats.waitingJobs + stats.activeJobs + stats.delayedJobs + stats.pausedJobs;
    
    // Determine health status based on failed jobs percentage
    let healthStatus = 'success';
    const failedPercentage = totalJobs > 0 ? (stats.failedJobs / totalJobs) * 100 : 0;
    
    if (failedPercentage >= 10) {
      healthStatus = 'danger';
    } else if (failedPercentage >= 5) {
      healthStatus = 'warning';
    }

    return {
      ...stats,
      totalJobs,
      healthStatus
    };
  }, [queues]);

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
      <div className={s.summaryContainer}>
        <div className={s.summaryCard}>
          <div className={s.summaryHeading}>Total Queues</div>
          <div className={s.summaryFlex}>
            <div className={s.summaryValue}>{queueStats.totalQueues}</div>
            <div className={`${s.summaryBadge} ${queueStats.pausedQueues > 0 ? s.badgeQueues : s.badgeZero}`}>
              {queueStats.pausedQueues} Paused
            </div>
          </div>
        </div>

        <div className={s.summaryCard}>
          <div className={s.summaryHeading}>Failed Jobs</div>
          <div className={s.summaryFlex}>
            <div className={s.summaryValue}>{queueStats.failedJobs.toLocaleString()}</div>
            <div className={`${s.summaryBadge} ${queueStats.queuesWithFailed > 0 ? s.badgeFailed : s.badgeZero}`}>
              {queueStats.queuesWithFailed} Queues
            </div>
          </div>
        </div>

        <div className={s.summaryCard}>
          <div className={s.summaryHeading}>Waiting Jobs</div>
          <div className={s.summaryFlex}>
            <div className={s.summaryValue}>{queueStats.waitingJobs.toLocaleString()}</div>
            <div className={`${s.summaryBadge} ${queueStats.queuesWithWaiting > 0 ? s.badgeWaiting : s.badgeZero}`}>
              {queueStats.queuesWithWaiting} Queues
            </div>
          </div>
        </div>
        
        <div className={s.summaryCard}>
          <div className={s.summaryHeading}>Delayed Jobs</div>
          <div className={s.summaryFlex}>
            <div className={s.summaryValue}>{queueStats.delayedJobs.toLocaleString()}</div>
            <div className={`${s.summaryBadge} ${queueStats.queuesWithDelayed > 0 ? s.badgeDelayed : s.badgeZero}`}>
              {queueStats.queuesWithDelayed} Queues
            </div>
          </div>
        </div>

        <div className={s.summaryCard}>
          <div className={s.summaryHeading}>Active Jobs</div>
          <div className={s.summaryFlex}>
            <div className={s.summaryValue}>{queueStats.activeJobs.toLocaleString()}</div>
            <div className={`${s.summaryBadge} ${queueStats.queuesWithActive > 0 ? s.badgeActive : s.badgeZero}`}>
              {queueStats.queuesWithActive} Queues
            </div>
          </div>
        </div>
      </div>

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
