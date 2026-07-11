import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import LinkForm from '@/components/LinkForm';

const mockFolders = [
  { id: '1', name: '개발' },
  { id: '2', name: '디자인' },
  { id: '3', name: '뉴스' },
];

export default function NewLinkPage() {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar folders={mockFolders} />
        <section className="flex-1 p-8 overflow-y-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">새 링크 추가</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">북마크할 새로운 링크를 추가해보세요</p>
          </div>
          <LinkForm folders={mockFolders} />
        </section>
      </div>
    </div>
  );
}
