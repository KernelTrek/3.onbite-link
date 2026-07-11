'use client';

import { useParams } from 'next/navigation';
import { useFolders } from '@/contexts/FoldersContext';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import LinkGrid from '@/components/LinkGrid';

export default function FolderPage() {
  const params = useParams();
  const id = params.id as string;
  const { folders } = useFolders();

  const folder = folders.find((f) => f.id === id);

  if (!folder) {
    return (
      <div className="flex h-screen bg-[var(--bg)]">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <section className="flex-1 p-8 flex items-center justify-center" style={{ marginTop: '56px' }}>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[var(--text)]">
                폴더를 찾을 수 없습니다
              </h2>
              <p className="text-[var(--text-sub)] mt-2">
                존재하지 않는 폴더입니다
              </p>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[var(--bg)]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentFolderId={id} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 py-5" style={{ marginTop: '56px' }}>
            <h2 className="text-2xl font-bold text-[var(--text)]">
              {folder.name}
            </h2>
          </div>
          <LinkGrid folderName={folder.name} />
        </div>
      </div>
    </div>
  );
}
