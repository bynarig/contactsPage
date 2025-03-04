// client/src/features/GithubCard.tsx
import {useEffect, useMemo, useState} from 'react';
import Card from '#/shared/ui/Card';
import {getLanguageImage} from '#/entities/LangToImage';
import {fetchRepositories} from '#/entities/github';
import {Repository} from '#/entities/types/github.types';

export default function GithubCard() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');

  // client/src/features/GithubCard.tsx
  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        console.log('Attempting to fetch repositories...');
        const repos = await fetchRepositories('bynarig');
        console.log('Successfully retrieved repositories:', repos.length);
        setRepositories(repos);
      } catch (err) {
        console.error('Detailed error:', err);
        setError('Failed to fetch repositories');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const languages = useMemo(() => {
    const langs = new Set<string>();
    repositories.forEach(repo => {
      if (repo.language) langs.add(repo.language);
    });
    return Array.from(langs);
  }, [repositories]);

  const filteredRepos = useMemo(() => {
    return repositories.filter(repo => {
      const matchesSearch = repo.name.toLowerCase().includes(search.toLowerCase()) ||
        (repo.description?.toLowerCase().includes(search.toLowerCase()) ?? false);
      const matchesFilter = filter === 'all' || repo.language === filter;
      return matchesSearch && matchesFilter;
    });
  }, [repositories, search, filter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-40">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="form-control w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search repositories..."
            className="input input-bordered w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="form-control w-full md:w-1/3">
          <select
            className="select select-bordered w-full"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Languages</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredRepos.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium">No repositories found</h3>
          <p className="text-gray-500">Try changing your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo) => (
            <Card
              key={repo.name}
              title={repo.name}
              description={repo.description || 'No description'}
              image={getLanguageImage(repo.language)}
              stars={repo.stars}
              lastCommitDate={repo.last_commit_date}
              language={repo.language}
              url={repo.url}
              className="h-full hover:shadow-lg transition-shadow duration-300"
            />
          ))}
        </div>
      )}
    </div>
  );
}