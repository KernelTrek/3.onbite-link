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
    <section className="flex-1 p-6" style={{ marginTop: '56px' }}>
      {links.length > 0 ? (
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
        </div>
      ) : (
        <div className="flex items-center justify-center h-full min-h-96">
          <div className="text-center">
            <p className="text-lg text-[var(--text)]">
              저장된 링크가 없습니다
            </p>
            <p className="text-sm text-[var(--text-sub)] mt-2">
              오른쪽 상단의 "+ 새 링크" 버튼으로 새로운 링크를 추가해보세요
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
