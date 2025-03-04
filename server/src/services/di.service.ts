// server/src/services/di.service.ts
import { config } from 'dotenv';
import GitHub from './github.service';
import RedisService, { IRedisService } from './redis.service';
import { IGitHubService } from '../interfaces/github.interface';
import { IApplicationLifecycle } from '../interfaces/application-lifecycle.interface';

config();

class DependencyContainer {
  private static instance: DependencyContainer;
  private services: Map<string, any> = new Map();
  private lifecycleServices: IApplicationLifecycle[] = [];

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
    // Redis service (generic)
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    const redisService: IRedisService = new RedisService(redisUrl);
    this.services.set('redis', redisService);
    this.lifecycleServices.push(redisService);

    // GitHub service (uses Redis for caching)
    const githubUsername = process.env.GITHUB_USERNAME || 'bynarig';
    const githubToken = process.env.GITHUB_TOKEN || '';
    const githubService: IGitHubService = new GitHub(githubUsername, githubToken, redisService);
    this.services.set('github', githubService);
    this.lifecycleServices.push(githubService);
  }

  get<T>(serviceName: string): T {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service ${serviceName} not found in container`);
    }
    return service as T;
  }

  getLifecycleServices(): IApplicationLifecycle[] {
    return [...this.lifecycleServices];
  }
}

export default DependencyContainer;