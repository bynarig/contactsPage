// server/src/services/github.service.ts
import axios from 'axios';
import { Repository } from '../types/github.types';
import { IGitHubService } from '../interfaces/github.interface';
import { IRedisService } from './redis.service';
import { IApplicationLifecycle } from '../interfaces/application-lifecycle.interface';

const CACHE_TTL = 7200; // 2 hours in seconds
const CACHE_REFRESH_INTERVAL = 3600000; // 1 hour in milliseconds

class GitHub implements IGitHubService, IApplicationLifecycle {
  private username: string;
  private token: string | undefined;
  private baseUrl = 'https://api.github.com';
  private cacheService?: IRedisService;
  private intervalId: NodeJS.Timeout | null = null;

  constructor(username: string, token?: string, cacheService?: IRedisService) {
    this.username = username;
    this.token = token;
    this.cacheService = cacheService;
  }

  getUsername(): string {
    return this.username;
  }

  private getCacheKey(): string {
    return `repos_${this.username}`;
  }

  async getRepositories(): Promise<Repository[]> {
    // Try to get from cache first if cache service is available
    if (this.cacheService) {
      try {
        const cachedRepos = await this.cacheService.get<Repository[]>(this.getCacheKey());
        if (cachedRepos && cachedRepos.length > 0) {

          return cachedRepos;
        }
      } catch (error) {
        console.warn('Failed to retrieve from cache, falling back to API:', error);
      }
    }

    // Fetch from GitHub API
    return this.fetchRepositoriesFromApi();
  }

  private async fetchRepositoriesFromApi(): Promise<Repository[]> {
    try {
      const headers: Record<string, string> = {};
      if (this.token) {
        headers['Authorization'] = `token ${this.token}`;
      }

      const reposResponse = await axios.get(
        `${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=100`,
        { headers }
      );

      const repositories: Repository[] = await Promise.all(
        reposResponse.data.map(async (repo: any) => {
          let lastCommitDate = null;

          try {
            const commitsResponse = await axios.get(
              `${this.baseUrl}/repos/${this.username}/${repo.name}/commits?per_page=1`,
              { headers }
            );
            lastCommitDate = commitsResponse.data[0]?.commit?.committer?.date || null;
          } catch (error) {
            console.warn(`Failed to fetch commits for ${repo.name}:`, error);
          }

          return {
            name: repo.name,
            full_name: repo.full_name,
            description: repo.description,
            url: repo.html_url,
            created_at: repo.created_at,
            updated_at: repo.updated_at,
            pushed_at: repo.pushed_at,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            last_commit_date: lastCommitDate,
            languages: {}
          };
        })
      );

      // Update cache if cache service is available
      if (this.cacheService) {
        await this.cacheService.set(this.getCacheKey(), repositories, CACHE_TTL);
        console.log(`Cache updated at ${new Date().toISOString()}. Cached ${repositories.length} repositories.`);
      }

      return repositories;
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw new Error('Failed to fetch repositories from GitHub API');
    }
  }

  async refreshCache(): Promise<void> {
    if (!this.cacheService) {
      console.warn('Cache refresh requested but no cache service provided');
      return;
    }

    try {
      const repositories = await this.fetchRepositoriesFromApi();
      await this.cacheService.set(this.getCacheKey(), repositories, CACHE_TTL);
      console.log(`GitHub cache refreshed at ${new Date().toISOString()}. Fetched ${repositories.length} repositories.`);
    } catch (error) {
      console.error('Failed to refresh GitHub repository cache:', error);
    }
  }

  // Lifecycle methods
  async onStartup(): Promise<void> {
    if (!this.cacheService) {
      console.log('No cache service provided for GitHub service. Skipping cache initialization.');
      return;
    }

    try {
      console.log('Initializing GitHub service cache...');
      await this.refreshCache();
      this.intervalId = setInterval(() => this.refreshCache(), CACHE_REFRESH_INTERVAL);
      console.log('GitHub service cache initialized successfully');
    } catch (error) {
      console.error('GitHub service cache initialization failed:', error);
      throw error;
    }
  }

  async onShutdown(): Promise<void> {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('GitHub service cache refresh interval cleared');
    }
  }
}

export default GitHub;