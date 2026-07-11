import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LinkGrid from "@/components/LinkGrid";

export default function Home() {
  return (
    <div className="flex h-screen bg-[var(--bg)]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <LinkGrid />
      </div>
    </div>
  );
}
