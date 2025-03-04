// server/src/interfaces/github.interface.ts
import { Repository } from '../types/github.types';

export interface IGitHubService {
  /**
   * Get the current username configured for the GitHub service
   */
  getUsername(): string;

  /**
   * Fetch repositories for the configured user
   */
  getRepositories(): Promise<Repository[]>;
}