import GithubCard from '#/features/GithubCard';

export default function ProjectsWidget() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">My Projects</h1>
        <p className="mb-8">Explore my GitHub repositories and projects.</p>
        <GithubCard />
      </div>
    </div>
  );
}