// server/src/types/github.types.ts
export interface Repository {
  name: string;
  full_name: string;
  description: string | null;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  stars: number;
  forks: number;
  language: string | null;
  last_commit_date: string | null;
  languages: Record<string, number>;
}