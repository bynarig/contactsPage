// server/src/services/github.service.ts
import axios from 'axios';
import { Repository } from '../types/github.types';
import { IGitHubService } from '../interfaces/github.interface';

class GitHub implements IGitHubService {
  private username: string;
  private token: string | undefined;
  private baseUrl = 'https://api.github.com';

  constructor(username: string, token?: string) {
    this.username = username;
    this.token = token;
  }

  getUsername(): string {
    return this.username;
  }

  async getRepositories(): Promise<Repository[]> {
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

      return repositories;
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw new Error('Failed to fetch repositories from GitHub API');
    }
  }
}

export default GitHub;