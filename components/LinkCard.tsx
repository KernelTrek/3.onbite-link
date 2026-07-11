'use client';

interface LinkCardProps {
  title: string;
  description?: string;
  url: string;
  favicon?: string;
  folder?: string;
}

export default function LinkCard({
  title,
  description,
  url,
  favicon,
  folder,
}: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-5 rounded-2xl bg-[var(--bg-card)] card-hover transition-all"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="flex items-start gap-3">
        {favicon && (
          <img
            src={favicon}
            alt={title}
            className="w-6 h-6 rounded flex-shrink-0"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.style.display = "none";
            }}
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-[var(--text)] truncate group-hover:text-[var(--accent)] transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-[var(--text-sub)] line-clamp-2 mt-1">
              {description}
            </p>
          )}
          <p className="text-xs text-[var(--text-sub)] truncate mt-2">
            {url}
          </p>
        </div>
      </div>
      {folder && (
        <div className="mt-3 inline-block text-xs bg-[#E8F3FF] text-[var(--accent)] px-3 py-1.5 rounded-lg font-medium">
          {folder}
        </div>
      )}
    </a>
  );
}
