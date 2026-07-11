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
      className="group block p-4 rounded-lg border border-gray-200 bg-white hover:shadow-lg hover:border-gray-300 transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:hover:border-zinc-600"
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
          <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors dark:text-white dark:group-hover:text-blue-400">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-gray-600 line-clamp-2 mt-1 dark:text-gray-400">
              {description}
            </p>
          )}
          <p className="text-xs text-gray-500 truncate mt-2 dark:text-gray-500">
            {url}
          </p>
        </div>
      </div>
      {folder && (
        <div className="mt-2 inline-block text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded dark:bg-zinc-700 dark:text-gray-300">
          {folder}
        </div>
      )}
    </a>
  );
}
