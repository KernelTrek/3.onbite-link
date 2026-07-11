'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFolders } from '@/contexts/FoldersContext';

interface SidebarProps {
  currentFolderId?: string;
}

export default function Sidebar({ currentFolderId }: SidebarProps) {
  const { folders } = useFolders();
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
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
                <Link
                  key={folder.id}
                  href={`/folder/${folder.id}`}
                  className={`block w-full text-left px-4 py-2.5 rounded-xl transition-all ${
                    currentFolderId === folder.id
                      ? 'bg-[var(--accent)] text-white'
                      : 'text-[var(--text)] hover:bg-white'
                  }`}
                >
                  {folder.name}
                </Link>
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
  );
}
