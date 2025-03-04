// server/src/interfaces/github.interface.ts
import { Repository } from '../types/github.types';
import { IApplicationLifecycle } from './application-lifecycle.interface';

export interface IGitHubService extends IApplicationLifecycle {
  getUsername(): string;
  getRepositories(): Promise<Repository[]>;
  refreshCache(): Promise<void>;
}