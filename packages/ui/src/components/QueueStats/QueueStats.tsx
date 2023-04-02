import React, { useEffect, useState } from 'react';
import s from './QueueStats.module.css';
import { AppQueue, QueueStats } from '@ay-bull-board/api/typings/app';
import { formatDistance } from 'date-fns/esm';
import { Store } from '../../hooks/useStore';

const milliSecToTime = (milliSec: number) => {
  const sec = milliSec / 1000;
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec - hours * 3600) / 60);
  const seconds = Math.floor(sec - hours * 3600 - minutes * 60);
  return `${hours}h ${minutes}m ${seconds}s`;
};
export const QueueStatsCard = ({
  queue,
  actions,
}: {
  queue: AppQueue;
  actions: Store['actions'];
}) => {
  const [stats, setStats] = useState<QueueStats>();

  useEffect(() => {
    let mounted = true;
    actions.getQueueStats(queue?.name).then((stats) => {
      mounted && setStats(stats);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const { waitTime, processingTime } = stats || {};
  const activeCount = queue.counts.active || 1;
  if (waitTime && processingTime) {
    return (
      <section className={s.container}>
        <div className={s.card}>
          <h3>Wait Time</h3>
          <table>
            <thead>
              <tr>
                <td>P95</td>
                <td>P50</td>
                <td>P05</td>
                <td>AVG</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{milliSecToTime(waitTime.p95)}</td>
                <td>{milliSecToTime(waitTime.p50)}</td>
                <td>{milliSecToTime(waitTime.p05)}</td>
                <td>{milliSecToTime(waitTime.avg)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={s.card}>
          <h3>Backlog</h3>
          <table style={{ width: '110px' }}>
            <thead>
              <tr>
                <td>@{activeCount} Active</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {queue.counts.waiting
                    ? formatDistance((queue.counts.waiting * processingTime.avg) / activeCount, 0)
                    : '-'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={s.card}>
          <h3>Processing Time</h3>
          <table>
            <thead>
              <tr>
                <td>P95</td>
                <td>P50</td>
                <td>P05</td>
                <td>AVG</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{milliSecToTime(processingTime.p95)}</td>
                <td>{milliSecToTime(processingTime.p50)}</td>
                <td>{milliSecToTime(processingTime.p05)}</td>
                <td>{milliSecToTime(processingTime.avg)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  }
  return null;
};
