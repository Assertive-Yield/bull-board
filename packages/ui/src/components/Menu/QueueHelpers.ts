import { AppQueue } from '@ay-bull-board/api/typings/app';

/**
 * Type definitions for queue structures and relationships
 */
export type QueueGroup = {
  name: string;
  queues: AppQueue[];
  hasFailed: boolean;
};

export type QueueRelationships = {
  schedulerToWorker: Record<string, string>;
  workerToScheduler: Record<string, string>;
};

export interface ProcessedQueueData {
  queueGroups: QueueGroup[];
  ungroupedQueues: AppQueue[];
  hasUngroupedFailed: boolean;
  queueRelationships: QueueRelationships;
}

/**
 * Type for queue status information
 */
export interface QueueStatusInfo {
  isWorkerQueuePaused: boolean;
  isSchedulerQueuePaused: boolean;
  hasWorkerQueueFailed: boolean;
  hasSchedulerQueueFailed: boolean;
  isPaused: boolean;
}

/**
 * Determine if a queue is a scheduler queue
 */
export const isSchedulerQueue = (name: string): boolean => name.startsWith('Schedule');

/**
 * Format queue name for display
 */
export const formatQueueName = (name: string): string => {
  if (name.includes(':')) {
    return name.split(':')[1];
  }
  
  if (isSchedulerQueue(name)) {
    // Return the base name without the Schedule prefix
    return name.replace(/^Schedule/, '');
  }
  
  return name;
};

/**
 * Get the display name with proper formatting for menu items
 */
export const getDisplayName = (name: string): string => {
  let displayName = formatQueueName(name);
  if (displayName.includes(':')) {
    displayName = displayName.split(':')[1];
  }
  return displayName;
};

/**
 * Get status information for a queue and its related queue
 */
export const getQueueStatusInfo = (
  queue: AppQueue,
  isScheduler: boolean,
  workerQueue: string | null,
  schedulerQueue: string | null,
  queues: AppQueue[] | undefined
): QueueStatusInfo => {
  const isCurrentQueuePaused = queue.isPaused;
  const hasCurrentQueueFailed = queue.counts.failed > 0;
  
  // Check if the worker queue is paused
  let isWorkerQueuePaused = false;
  if (isScheduler && workerQueue) {
    // If this is a scheduler, check its related worker queue
    const workerQueueObj = queues?.find(q => q.name === workerQueue);
    isWorkerQueuePaused = !!workerQueueObj?.isPaused;
  } else if (!isScheduler) {
    // If this is already a worker queue, use its own paused state
    isWorkerQueuePaused = isCurrentQueuePaused;
  }
  
  // Check if the scheduler queue is paused
  let isSchedulerQueuePaused = false;
  if (!isScheduler && schedulerQueue) {
    // If this is a worker, check its related scheduler queue
    const schedulerQueueObj = queues?.find(q => q.name === schedulerQueue);
    isSchedulerQueuePaused = !!schedulerQueueObj?.isPaused;
  } else if (isScheduler) {
    // If this is already a scheduler queue, use its own paused state
    isSchedulerQueuePaused = isCurrentQueuePaused;
  }
  
  // Check if the worker queue has failed jobs
  let hasWorkerQueueFailed = false;
  if (isScheduler && workerQueue) {
    // If this is a scheduler, check its related worker queue
    const workerQueueObj = queues?.find(q => q.name === workerQueue);
    hasWorkerQueueFailed = !!(workerQueueObj && workerQueueObj.counts.failed > 0);
  } else if (!isScheduler) {
    // If this is already a worker queue, use its own failed state
    hasWorkerQueueFailed = hasCurrentQueueFailed;
  }
  
  // Check if the scheduler queue has failed jobs
  let hasSchedulerQueueFailed = false;
  if (!isScheduler && schedulerQueue) {
    // If this is a worker, check its related scheduler queue
    const schedulerQueueObj = queues?.find(q => q.name === schedulerQueue);
    hasSchedulerQueueFailed = !!(schedulerQueueObj && schedulerQueueObj.counts.failed > 0);
  } else if (isScheduler) {
    // If this is already a scheduler queue, use its own failed state
    hasSchedulerQueueFailed = hasCurrentQueueFailed;
  }

  // Show the Paused label if either queue is paused
  const isPaused = isWorkerQueuePaused || isSchedulerQueuePaused;
  
  return {
    isWorkerQueuePaused,
    isSchedulerQueuePaused,
    hasWorkerQueueFailed,
    hasSchedulerQueueFailed,
    isPaused
  };
};

/**
 * Process queue data to generate relationships and group information
 */
export const processQueues = (
  queues: AppQueue[] | undefined, 
  searchTerm: string = ''
): ProcessedQueueData => {
  if (!queues) {
    return { 
      queueGroups: [], 
      ungroupedQueues: [], 
      hasUngroupedFailed: false, 
      queueRelationships: { schedulerToWorker: {}, workerToScheduler: {} } 
    };
  }

  // Build queue relationships
  const relationships: QueueRelationships = {
    schedulerToWorker: {},
    workerToScheduler: {}
  };
  
  const allQueueNames = queues.map(q => q.name);
  
  // Find scheduler and worker pairs
  allQueueNames.forEach(name => {
    if (name.startsWith('Schedule')) {
      const workerName = name.replace(/^Schedule/, '');
      if (allQueueNames.includes(workerName)) {
        relationships.schedulerToWorker[name] = workerName;
        relationships.workerToScheduler[workerName] = name;
      }
    }
  });

  // Track which queues we've already processed to avoid duplicates
  const processedQueues = new Set<string>();

  const filteredQueues = queues.filter(({ name }) => 
    name?.toLowerCase().includes(searchTerm?.toLowerCase())
  );
  
  const groups: Record<string, AppQueue[]> = {};
  const ungrouped: AppQueue[] = [];
  let hasUngroupedFailed = false;

  // Helper to determine if a queue or its pair has failed jobs
  const hasFailedJobs = (queueName: string): boolean => {
    const queueObj = queues.find(q => q.name === queueName);
    if (queueObj && queueObj.counts.failed > 0) return true;
    
    // Check paired queue if exists
    const pairedQueueName = relationships.schedulerToWorker[queueName] || relationships.workerToScheduler[queueName];
    if (pairedQueueName) {
      const pairedQueueObj = queues.find(q => q.name === pairedQueueName);
      return !!(pairedQueueObj && pairedQueueObj.counts.failed > 0);
    }
    
    return false;
  };

  filteredQueues.forEach(queue => {
    const { name } = queue;
    
    // Skip if we've already processed this queue or its pair
    if (processedQueues.has(name)) return;
    
    // Mark this queue as processed
    processedQueues.add(name);
    
    // If this is a worker queue with a scheduler, mark the scheduler as processed too
    const schedulerName = relationships.workerToScheduler[name];
    if (schedulerName) {
      processedQueues.add(schedulerName);
    }
    
    // If this is a scheduler queue with a worker, skip it (we'll show the worker instead)
    // unless the worker isn't in the filtered list
    const workerName = relationships.schedulerToWorker[name];
    if (workerName) {
      const workerInFilteredList = filteredQueues.some(q => q.name === workerName);
      if (workerInFilteredList) {
        // Skip this scheduler queue, we'll show the worker instead
        return;
      }
      // Otherwise, mark the worker as processed so we don't show it later
      processedQueues.add(workerName);
    }

    if (name.includes(':')) {
      // Extract the prefix, but remove "Schedule" if it's present
      let prefix = name.split(':')[0];
      if (prefix.startsWith('Schedule')) {
        prefix = prefix.replace(/^Schedule/, '');
      }
      
      if (!groups[prefix]) {
        groups[prefix] = [];
      }
      groups[prefix].push(queue);
    } else {
      ungrouped.push(queue);
      if (hasFailedJobs(name)) {
        hasUngroupedFailed = true;
      }
    }
  });

  // Convert groups object to array with failure info and sort by name
  const groupsArray = Object.entries(groups).map(([name, queues]) => ({ 
    name, 
    queues,
    hasFailed: queues.some(q => hasFailedJobs(q.name))
  }));
  groupsArray.sort((a, b) => a.name.localeCompare(b.name));

  return { 
    queueGroups: groupsArray, 
    ungroupedQueues: ungrouped, 
    hasUngroupedFailed,
    queueRelationships: relationships
  };
};

/**
 * Extract the current queue name from the location pathname
 */
export const extractCurrentQueueNameFromPath = (pathname: string): string | null => {
  const match = pathname.match(/\/queue\/([^?/]+)/);
  if (match) {
    return decodeURIComponent(match[1]);
  }
  return null;
};

/**
 * Check if a queue or its related queue is currently active
 */
export const isQueueActive = (
  queueName: string, 
  currentQueueName: string | null, 
  queueRelationships: QueueRelationships
): boolean => {
  if (currentQueueName === queueName) return true;
  
  // Check if related queue is active
  const isScheduler = isSchedulerQueue(queueName);
  const relatedQueueName = isScheduler 
    ? queueRelationships.schedulerToWorker[queueName] 
    : queueRelationships.workerToScheduler[queueName];
    
  return relatedQueueName ? currentQueueName === relatedQueueName : false;
};

/**
 * Determine which queue type (worker/scheduler) is active for a given queue
 */
export const getActiveQueueTypes = (
  queueName: string,
  currentQueueName: string | null,
  queueRelationships: QueueRelationships
) => {
  const isScheduler = isSchedulerQueue(queueName);
  const isCurrentQueue = currentQueueName === queueName;
  const workerQueue = isScheduler ? queueRelationships.schedulerToWorker[queueName] : null;
  const schedulerQueue = !isScheduler ? queueRelationships.workerToScheduler[queueName] : null;
  
  const isRelatedQueueActive = (workerQueue && currentQueueName === workerQueue) || 
                             (schedulerQueue && currentQueueName === schedulerQueue);
  
  const isWorkerActive = isCurrentQueue ? !isScheduler : 
                        (isRelatedQueueActive && !isSchedulerQueue(currentQueueName!));
  const isSchedulerActive = isCurrentQueue ? isScheduler : 
                           (isRelatedQueueActive && isSchedulerQueue(currentQueueName!));
  
  return {
    isWorkerActive,
    isSchedulerActive,
    isActive: isCurrentQueue || isRelatedQueueActive
  };
};