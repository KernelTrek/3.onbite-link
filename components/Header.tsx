import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-[var(--bg-card)] px-5 py-3.5 fixed top-0 left-0 right-0 z-50" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
        <h1 className="text-xl font-bold text-[var(--text)]">한입 링크</h1>
      </Link>
      <Link
        href="/new"
        className="flex items-center gap-2 btn-primary"
      >
        <span>+</span>
        새 링크
      </Link>
    </header>
  );
}
