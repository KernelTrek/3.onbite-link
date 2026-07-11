'use client';

import { useState } from 'react';

interface Folder {
  id: string;
  name: string;
}

interface LinkFormProps {
  folders: Folder[];
}

export default function LinkForm({ folders }: LinkFormProps) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [folder, setFolder] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement API call to save link
      console.log({ url, title, description, folder });
      // Reset form after successful save
      setUrl('');
      setTitle('');
      setDescription('');
      setFolder('');
    } catch (error) {
      console.error('Failed to save link:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-5 py-8">
      <div className="space-y-5">
        {/* URL Input */}
        <div>
          <label htmlFor="url" className="block text-base font-bold text-[var(--text)] mb-2">
            링크 주소
          </label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
            className="w-full px-4 py-3.5 rounded-xl bg-[#F4F4F4] text-[var(--text)] placeholder-[var(--placeholder)] focus:outline-none focus:bg-[var(--bg-card)] transition-all"
            style={{
              boxShadow: '0 0 0 2px transparent',
              '--webkit-autofill': 'none',
            } as React.CSSProperties}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 2px transparent';
            }}
          />
        </div>

        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-base font-bold text-[var(--text)] mb-2">
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="링크의 제목을 입력하세요"
            required
            className="w-full px-4 py-3.5 rounded-xl bg-[#F4F4F4] text-[var(--text)] placeholder-[var(--placeholder)] focus:outline-none focus:bg-[var(--bg-card)] transition-all"
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 2px transparent';
            }}
          />
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block text-base font-bold text-[var(--text)] mb-2">
            설명 (선택사항)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="링크에 대한 설명을 입력하세요"
            rows={4}
            className="w-full px-4 py-3.5 rounded-xl bg-[#F4F4F4] text-[var(--text)] placeholder-[var(--placeholder)] focus:outline-none focus:bg-[var(--bg-card)] transition-all resize-none"
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 2px transparent';
            }}
          />
        </div>

        {/* Folder Select */}
        <div>
          <label htmlFor="folder" className="block text-base font-bold text-[var(--text)] mb-2">
            폴더
          </label>
          <select
            id="folder"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            required
            className="w-full px-4 py-3.5 rounded-xl bg-[#F4F4F4] text-[var(--text)] focus:outline-none focus:bg-[var(--bg-card)] transition-all appearance-none"
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 2px transparent';
            }}
          >
            <option value="">폴더를 선택하세요</option>
            {folders.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-6 py-3.5 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '저장 중...' : '저장'}
          </button>
          <button
            type="button"
            onClick={() => {
              setUrl('');
              setTitle('');
              setDescription('');
              setFolder('');
            }}
            className="px-6 py-3.5 bg-[#F4F4F4] text-[var(--text)] rounded-xl font-bold transition-all hover:bg-white"
          >
            취소
          </button>
        </div>
      </div>
    </form>
  );
}
