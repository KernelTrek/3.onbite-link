'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useFolders } from '@/contexts/FoldersContext';
import FolderModal from './FolderModal';

export default function Header() {
  const { addFolder } = useFolders();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveFolder = (folderName: string) => {
    addFolder(folderName);
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="flex items-center justify-between bg-[var(--bg-card)] px-5 py-3.5 fixed top-0 left-0 right-0 z-50" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <h1 className="text-xl font-bold text-[var(--text)]">한입 링크</h1>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#F4F4F4] text-[var(--text)] rounded-xl font-medium hover:bg-white transition-all"
          >
            <span>+</span>
            새 폴더
          </button>
          <Link
            href="/new"
            className="flex items-center gap-2 btn-primary"
          >
            <span>+</span>
            새 링크
          </Link>
        </div>
      </header>
      <FolderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveFolder}
      />
    </>
  );
}
