// server/src/services/di.service.ts
import { config } from 'dotenv';
import GitHub from './github.service';
import RedisService from './redis.service';
import { IGitHubService } from '../interfaces/github.interface';
import { ICacheService } from '../interfaces/cache.interface';

// Load environment variables
config();

class DependencyContainer {
  private static instance: DependencyContainer;
  private services: Map<string, any> = new Map();

  private constructor() {
    this.registerServices();
  }

  static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  private registerServices(): void {
    // GitHub service
    const githubUsername = process.env.GITHUB_USERNAME || '';
    const githubToken = process.env.GITHUB_TOKEN || '';
    const githubService: IGitHubService = new GitHub(githubUsername, githubToken);
    this.services.set('github', githubService);

    // Redis service
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    const redisService: ICacheService = new RedisService(redisUrl, githubService);
    this.services.set('redis', redisService);
  }

  get<T>(serviceName: string): T {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service ${serviceName} not found in container`);
    }
    return service as T;
  }
}

export default DependencyContainer;