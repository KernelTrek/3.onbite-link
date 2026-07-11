import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4 dark:bg-zinc-950 dark:border-zinc-800">
      <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
        <h1 className="text-2xl font-bold text-black dark:text-white">한입 링크</h1>
      </Link>
      <Link
        href="/new"
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        <span className="text-lg">+</span>
        새 링크
      </Link>
    </header>
  );
}
