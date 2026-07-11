'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Folder {
  id: string;
  name: string;
}

interface SidebarProps {
  folders?: Folder[];
  currentFolderId?: string;
}

export default function Sidebar({ folders = [], currentFolderId }: SidebarProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isFolderPage = pathname.startsWith('/folder/');

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 px-4 py-6 dark:bg-zinc-900 dark:border-zinc-800">
      <div className="space-y-2">
        <Link
          href="/"
          className={`block w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
            isHome
              ? 'bg-blue-500 text-white dark:bg-blue-600'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700'
          }`}
        >
          ALL
        </Link>

        <div className="pt-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase px-4 mb-2 dark:text-gray-400">
            폴더
          </h2>
          <nav className="space-y-1">
            {folders.length > 0 ? (
              folders.map((folder) => (
                <Link
                  key={folder.id}
                  href={`/folder/${folder.id}`}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    currentFolderId === folder.id
                      ? 'bg-blue-500 text-white dark:bg-blue-600'
                      : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-zinc-800'
                  }`}
                >
                  {folder.name}
                </Link>
              ))
            ) : (
              <p className="px-4 py-2 text-sm text-gray-400 dark:text-gray-500">
                폴더가 없습니다
              </p>
            )}
          </nav>
        </div>
      </div>
    </aside>
  );
}
