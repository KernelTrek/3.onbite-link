'use client';

import { useState } from 'react';
import { useLinks } from '@/contexts/LinksContext';
import DeleteConfirmModal from './DeleteConfirmModal';

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
  const { deleteLink } = useLinks();
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteLink(id);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group block rounded-2xl bg-[var(--bg-card)] card-hover transition-all overflow-hidden flex flex-col h-full relative"
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

        {/* Delete Button */}
        {isHovered && (
          <button
            onClick={handleDeleteClick}
            className="absolute top-3 right-3 p-2 bg-white rounded-lg shadow-md hover:bg-[var(--error)] hover:text-white transition-all"
            title="삭제"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--error)]"
              style={{
                color: isHovered ? 'white' : 'var(--error)',
              }}
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        )}

        {/* Content */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col p-4 cursor-pointer"
        >
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
        </a>
      </div>

      {/* Delete Confirm Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        folderName={title}
        type="link"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}
