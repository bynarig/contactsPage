// server/src/controllers/github.api.controller.ts
import { Request, Response } from 'express';
import DependencyContainer from '../services/di.service';
import { ICacheService } from '../interfaces/cache.interface';
import { IGitHubService } from '../interfaces/github.interface';

class GitHubApiController {
  async getRepos(req: Request, res: Response): Promise<void> {
    try {
      const di = DependencyContainer.getInstance();
      const cacheService = di.get<ICacheService>('redis');

      // Try to get data from cache first
      const cachedRepos = await cacheService.getRepositories();

      if (cachedRepos.length > 0) {
        res.json(cachedRepos);
        return;
      }

      // Fall back to GitHub API if cache is empty
      const githubService = di.get<IGitHubService>('github');
      const repositories = await githubService.getRepositories();
      res.json(repositories);
    } catch (error) {
      console.error('Error fetching repositories:', error);
      res.status(500).json({ error: 'Failed to fetch repositories' });
    }
  }
}

export default new GitHubApiController();