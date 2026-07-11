'use client';

import { useFolders } from '@/contexts/FoldersContext';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import LinkForm from '@/components/LinkForm';

export default function NewLinkPage() {
  const { folders } = useFolders();

  return (
    <div className="flex h-screen bg-[var(--bg)]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <section className="flex-1 overflow-y-auto" style={{ marginTop: '56px' }}>
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-[var(--text)]">새 링크 추가</h2>
            <p className="text-[var(--text-sub)] mt-1 text-sm">북마크할 새로운 링크를 추가해보세요</p>
          </div>
          <LinkForm folders={folders} />
        </section>
      </div>
    </div>
  );
}
