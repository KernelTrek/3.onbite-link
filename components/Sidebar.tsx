'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFolders } from '@/contexts/FoldersContext';
import DeleteConfirmModal from './DeleteConfirmModal';
import EditFolderModal from './EditFolderModal';

interface SidebarProps {
  currentFolderId?: string;
}

export default function Sidebar({ currentFolderId }: SidebarProps) {
  const { folders, deleteFolder, updateFolder } = useFolders();
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [hoveredFolderId, setHoveredFolderId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState<{ id: string; name: string } | null>(null);
  const [folderToEdit, setFolderToEdit] = useState<{ id: string; name: string } | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, folderId: string, folderName: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFolderToDelete({ id: folderId, name: folderName });
    setDeleteModalOpen(true);
  };

  const handleEditClick = (e: React.MouseEvent, folderId: string, folderName: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFolderToEdit({ id: folderId, name: folderName });
    setEditModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (folderToDelete) {
      await deleteFolder(folderToDelete.id);
      setDeleteModalOpen(false);
      setFolderToDelete(null);
    }
  };

  const handleConfirmEdit = async (newName: string) => {
    if (folderToEdit) {
      await updateFolder(folderToEdit.id, newName);
      setEditModalOpen(false);
      setFolderToEdit(null);
    }
  };

  return (
    <>
      <aside className="w-64 bg-[var(--bg)] px-5 py-6 overflow-y-auto" style={{ marginTop: '56px' }}>
        <div className="space-y-1">
          <Link
            href="/"
            className={`block w-full text-left px-4 py-2.5 rounded-xl font-medium transition-all ${
              isHome
                ? 'bg-[var(--accent)] text-white'
                : 'text-[var(--text)] hover:bg-white'
            }`}
          >
            ALL
          </Link>

          <div className="pt-4">
            <h2 className="text-xs font-bold text-[var(--text-sub)] uppercase px-4 mb-3 tracking-wider">
              폴더
            </h2>
            <nav className="space-y-1">
              {folders.length > 0 ? (
                folders.map((folder) => (
                  <div
                    key={folder.id}
                    onMouseEnter={() => setHoveredFolderId(folder.id)}
                    onMouseLeave={() => setHoveredFolderId(null)}
                    className="relative group"
                  >
                    <Link
                      href={`/folder/${folder.id}`}
                      className={`flex items-center justify-between w-full text-left px-4 py-2.5 rounded-xl transition-all ${
                        currentFolderId === String(folder.id)
                          ? 'bg-[var(--accent)] text-white'
                          : 'text-[var(--text)] hover:bg-white'
                      }`}
                    >
                      <span>{folder.name}</span>
                      {hoveredFolderId === folder.id && (
                        <div className="flex-shrink-0 ml-2 flex gap-1">
                          <button
                            onClick={(e) => handleEditClick(e, folder.id, folder.name)}
                            className={`p-1.5 rounded-lg transition-all ${
                              currentFolderId === String(folder.id)
                                ? 'hover:bg-white/20'
                                : 'hover:bg-[var(--accent)]/10'
                            }`}
                            title="수정"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={currentFolderId === folder.id ? 'text-white' : 'text-[var(--accent)]'}
                            >
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19H4v-3L16.5 3.5z" />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => handleDeleteClick(e, folder.id, folder.name)}
                            className={`p-1.5 rounded-lg transition-all ${
                              currentFolderId === String(folder.id)
                                ? 'hover:bg-white/20'
                                : 'hover:bg-[var(--error)]/10'
                            }`}
                            title="삭제"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={currentFolderId === folder.id ? 'text-white' : 'text-[var(--error)]'}
                            >
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </Link>
                  </div>
                ))
              ) : (
                <p className="px-4 py-2 text-sm text-[var(--text-sub)]">
                  폴더가 없습니다
                </p>
              )}
            </nav>
          </div>
        </div>
      </aside>

      {folderToDelete && (
        <DeleteConfirmModal
          isOpen={deleteModalOpen}
          folderName={folderToDelete.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setDeleteModalOpen(false);
            setFolderToDelete(null);
          }}
        />
      )}

      {folderToEdit && (
        <EditFolderModal
          isOpen={editModalOpen}
          folderName={folderToEdit.name}
          onClose={() => {
            setEditModalOpen(false);
            setFolderToEdit(null);
          }}
          onSave={handleConfirmEdit}
        />
      )}
    </>
  );
}
