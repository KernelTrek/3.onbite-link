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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* URL Input */}
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            링크 주소
          </label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:placeholder-gray-500 dark:focus:ring-blue-400"
          />
        </div>

        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="링크의 제목을 입력하세요"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:placeholder-gray-500 dark:focus:ring-blue-400"
          />
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            설명 (선택사항)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="링크에 대한 설명을 입력하세요"
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:placeholder-gray-500 dark:focus:ring-blue-400"
          />
        </div>

        {/* Folder Select */}
        <div>
          <label htmlFor="folder" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            폴더
          </label>
          <select
            id="folder"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:focus:ring-blue-400"
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
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
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
            className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition-colors dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600"
          >
            취소
          </button>
        </div>
      </div>
    </form>
  );
}
