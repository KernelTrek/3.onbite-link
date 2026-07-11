import LinkCard from "./LinkCard";

interface Link {
  id: string;
  title: string;
  description?: string;
  url: string;
  favicon?: string;
  folder?: string;
}

interface LinkGridProps {
  links?: Link[];
}

export default function LinkGrid({ links = [] }: LinkGridProps) {
  return (
    <section className="flex-1 p-6">
      {links.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {links.map((link) => (
            <LinkCard
              key={link.id}
              title={link.title}
              description={link.description}
              url={link.url}
              favicon={link.favicon}
              folder={link.folder}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full min-h-96">
          <div className="text-center">
            <p className="text-gray-500 text-lg dark:text-gray-400">
              저장된 링크가 없습니다
            </p>
            <p className="text-gray-400 text-sm mt-2 dark:text-gray-500">
              오른쪽 상단의 "+ 새 링크" 버튼으로 새로운 링크를 추가해보세요
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
