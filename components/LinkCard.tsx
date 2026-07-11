'use client';

interface LinkCardProps {
  id: string;
  title: string;
  description?: string;
  url: string;
  favicon?: string;
  image?: string;
  folder?: string;
}

export default function LinkCard({
  id,
  title,
  description,
  url,
  favicon,
  image,
  folder,
}: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl bg-[var(--bg-card)] card-hover transition-all overflow-hidden flex flex-col h-full"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      {/* Thumbnail Image */}
      {image && (
        <div className="w-full h-32 overflow-hidden bg-[#F4F4F4]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col p-4">
        <div className="flex items-start gap-3 flex-1">
          {favicon && !image && (
            <img
              src={favicon}
              alt={title}
              className="w-6 h-6 rounded flex-shrink-0 mt-0.5"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[var(--text)] truncate group-hover:text-[var(--accent)] transition-colors line-clamp-2">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-[var(--text-sub)] line-clamp-2 mt-1">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#F4F4F4]">
          <p className="text-xs text-[var(--text-sub)] truncate mb-2">
            {url}
          </p>
          {folder && (
            <div className="inline-block text-xs bg-[#E8F3FF] text-[var(--accent)] px-2.5 py-1 rounded-lg font-medium">
              {folder}
            </div>
          )}
        </div>
      </div>
    </a>
  );
}
