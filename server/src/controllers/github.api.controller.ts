// server/src/controllers/github.api.controller.ts
import { Request, Response } from 'express';
import DependencyContainer from '../services/di.service';
import { IGitHubService } from '../interfaces/github.interface';

class GitHubApiController {
  async getRepos(req: Request, res: Response): Promise<void> {
    try {
      const di = DependencyContainer.getInstance();
      const githubService = di.get<IGitHubService>('github');

      // GitHub service now handles caching internally
      const repositories = await githubService.getRepositories();
      res.json(repositories);
    } catch (error) {
      console.error('Error fetching repositories:', error);
      res.status(500).json({ error: 'Failed to fetch repositories' });
    }
  }
}

export default new GitHubApiController();