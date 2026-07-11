import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import LinkGrid from '@/components/LinkGrid';

const mockFolders = [
  { id: '1', name: '개발' },
  { id: '2', name: '디자인' },
  { id: '3', name: '뉴스' },
];

const mockLinks = [
  {
    id: '1',
    title: 'GitHub',
    description: 'The world\'s leading software development platform',
    url: 'https://github.com',
    favicon: 'https://github.com/favicon.ico',
    folder: '개발',
  },
  {
    id: '2',
    title: 'Next.js',
    description: 'The React Framework for Production',
    url: 'https://nextjs.org',
    favicon: 'https://nextjs.org/favicon.ico',
    folder: '개발',
  },
  {
    id: '3',
    title: 'Figma',
    description: 'The collaborative interface design tool',
    url: 'https://figma.com',
    favicon: 'https://figma.com/favicon.ico',
    folder: '디자인',
  },
  {
    id: '4',
    title: 'CSS-Tricks',
    description: 'Daily articles about CSS, HTML, JavaScript, and web design',
    url: 'https://css-tricks.com',
    favicon: 'https://css-tricks.com/favicon.ico',
    folder: '디자인',
  },
];

interface FolderPageProps {
  params: Promise<{ id: string }>;
}

export default async function FolderPage({ params }: FolderPageProps) {
  const { id } = await params;

  const folder = mockFolders.find((f) => f.id === id);
  const folderLinks = mockLinks.filter((link) => {
    const folderName = mockFolders.find((f) => f.id === id)?.name;
    return link.folder === folderName;
  });

  if (!folder) {
    return (
      <div className="flex h-screen bg-[var(--bg)]">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar folders={mockFolders} />
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
        <Sidebar folders={mockFolders} currentFolderId={id} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 py-5" style={{ marginTop: '56px' }}>
            <h2 className="text-2xl font-bold text-[var(--text)]">
              {folder.name}
            </h2>
            <p className="text-[var(--text-sub)] mt-1 text-sm">
              {folderLinks.length}개의 링크
            </p>
          </div>
          <LinkGrid links={folderLinks} />
        </div>
      </div>
    </div>
  );
}
