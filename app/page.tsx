import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LinkGrid from "@/components/LinkGrid";

const mockFolders = [
  { id: "1", name: "개발" },
  { id: "2", name: "디자인" },
  { id: "3", name: "뉴스" },
];

const mockLinks = [
  {
    id: "1",
    title: "GitHub",
    description: "The world's leading software development platform",
    url: "https://github.com",
    favicon: "https://github.com/favicon.ico",
    folder: "개발",
  },
  {
    id: "2",
    title: "Next.js",
    description: "The React Framework for Production",
    url: "https://nextjs.org",
    favicon: "https://nextjs.org/favicon.ico",
    folder: "개발",
  },
  {
    id: "3",
    title: "Figma",
    description: "The collaborative interface design tool",
    url: "https://figma.com",
    favicon: "https://figma.com/favicon.ico",
    folder: "디자인",
  },
  {
    id: "4",
    title: "CSS-Tricks",
    description: "Daily articles about CSS, HTML, JavaScript, and web design",
    url: "https://css-tricks.com",
    favicon: "https://css-tricks.com/favicon.ico",
    folder: "디자인",
  },
];

export default function Home() {
  return (
    <div className="flex h-screen bg-[var(--bg)]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar folders={mockFolders} />
        <LinkGrid links={mockLinks} />
      </div>
    </div>
  );
}
