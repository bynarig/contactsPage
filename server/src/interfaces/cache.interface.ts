// server/src/interfaces/cache.interface.ts
import { Repository } from '../types/github.types';
import { IApplicationLifecycle } from './application-lifecycle.interface';

export interface ICacheService extends IApplicationLifecycle {
  /**
   * Connect to the cache storage
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the cache storage
   */
  disconnect(): Promise<void>;

  /**
   * Initialize the cache with data
   */
  initializeCache(): Promise<void>;

  /**
   * Refresh the cached data
   */
  refreshCache(): Promise<void>;

  /**
   * Retrieve repositories from the cache
   */
  getRepositories(): Promise<Repository[]>;
}