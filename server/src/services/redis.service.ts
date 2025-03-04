// server/src/services/redis.service.ts
import { createClient } from 'redis';
import { Repository } from '../types/github.types';
import { ICacheService } from '../interfaces/cache.interface';
import { IGitHubService } from '../interfaces/github.interface';

class RedisService implements ICacheService {
  private client;
  private github: IGitHubService;
  private refreshInterval: number = 3600000; // 1 hour
  private intervalId: NodeJS.Timeout | null = null;

  constructor(redisUrl: string, github: IGitHubService) {
    this.client = createClient({ url: redisUrl });
    this.github = github;
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      console.log('Redis client connected successfully');
    } catch (error) {
      console.error('Redis connection error:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (this.client.isOpen) {
      await this.client.disconnect();
      console.log('Redis client disconnected');
    }
  }

  async initializeCache(): Promise<void> {
    console.log('Initializing GitHub repository cache in Redis...');
    await this.refreshCache();
    this.intervalId = setInterval(() => this.refreshCache(), this.refreshInterval);
  }

  async refreshCache(): Promise<void> {
    try {
      const repositories = await this.github.getRepositories();
      const cacheKey = `repos_${this.github.getUsername()}`;

      await this.client.set(
        cacheKey,
        JSON.stringify(repositories),
        { EX: 7200 } // 2 hours TTL
      );

      console.log(`Redis cache updated at ${new Date().toISOString()}. Fetched ${repositories.length} repositories.`);
    } catch (error) {
      console.error('Failed to refresh GitHub repository cache:', error);
    }
  }

  async getRepositories(): Promise<Repository[]> {
    try {
      const cacheKey = `repos_${this.github.getUsername()}`;
      const cachedRepos = await this.client.get(cacheKey);

      if (cachedRepos) {
        return JSON.parse(cachedRepos) as Repository[];
      }

      return [];
    } catch (error) {
      console.error('Error retrieving data from Redis:', error);
      return [];
    }
  }
}

export default RedisService;