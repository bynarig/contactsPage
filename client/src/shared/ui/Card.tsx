// client/src/shared/ui/Card.tsx
type CardProps = {
  image?: string;
  title?: string;
  description?: string;
  stars?: number;
  lastCommitDate?: string;
  language?: string;
  url?: string;
  className?: string;
};

export default function Card({
  image,
  title,
  description,
  stars,
  lastCommitDate,
  language,
  url,
  className,
}: CardProps) {
  return (
    <div className={`card bg-base-100 shadow-sm h-full ${className}`}>
      <figure>
        <img
          src={image || "https://t4.ftcdn.net/jpg/02/39/25/27/360_F_239252747_hTpJXZjxZn60wgkAeyoiwl3G3uLKqUXO.jpg"}
          alt={title || "Repository"}
          className="object-cover h-48 w-full"
        />
      </figure>
      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="card-title">{title}</h2>
          {stars !== undefined && (
            <div className="badge badge-secondary">{stars} ⭐</div>
          )}
        </div>
        <p className="flex-grow">{description}</p>
        {lastCommitDate && (
          <p className="text-sm text-gray-500">
            Last updated: {new Date(lastCommitDate).toLocaleDateString()}
          </p>
        )}
        <div className="card-actions justify-between items-center mt-3">
          <div className="flex gap-1">
            {language && (
              <div className="badge badge-outline">{language}</div>
            )}
            <div className="badge badge-outline">GitHub</div>
          </div>
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
              View Repository
            </a>
          )}
        </div>
      </div>
    </div>
  );
}