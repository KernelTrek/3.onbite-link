'use client';

import { useState, useEffect } from 'react';
import { useFolders } from '@/contexts/FoldersContext';

interface EditLinkModalProps {
  isOpen: boolean;
  linkTitle: string;
  linkDescription: string;
  linkFolder: string;
  onClose: () => void;
  onSave: (data: { title: string; description: string; folder: string }) => void;
}

export default function EditLinkModal({
  isOpen,
  linkTitle,
  linkDescription,
  linkFolder,
  onClose,
  onSave,
}: EditLinkModalProps) {
  const { folders } = useFolders();
  const [title, setTitle] = useState(linkTitle);
  const [description, setDescription] = useState(linkDescription);
  const [folder, setFolder] = useState(linkFolder);

  useEffect(() => {
    if (isOpen) {
      setTitle(linkTitle);
      setDescription(linkDescription);
      setFolder(linkFolder);
    }
  }, [isOpen, linkTitle, linkDescription, linkFolder]);

  const handleSave = () => {
    if (title.trim()) {
      onSave({
        title: title.trim(),
        description: description.trim(),
        folder,
      });
      onClose();
    }
  };

  const handleCancel = () => {
    setTitle(linkTitle);
    setDescription(linkDescription);
    setFolder(linkFolder);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="bg-[var(--bg-card)] rounded-2xl p-6 w-96 max-w-[90%]"
        style={{ boxShadow: 'var(--shadow-md)' }}
      >
        <h3 className="text-lg font-bold text-[var(--text)] mb-5">링크 수정</h3>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-[var(--text)] mb-2">
            제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="링크 제목"
            className="w-full px-4 py-3 rounded-xl bg-[#F4F4F4] text-[var(--text)] placeholder-[var(--placeholder)] focus:outline-none focus:bg-[var(--bg-card)] transition-all"
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 2px transparent';
            }}
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label className="block text-sm font-bold text-[var(--text)] mb-2">
            설명
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="링크 설명"
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-[#F4F4F4] text-[var(--text)] placeholder-[var(--placeholder)] focus:outline-none focus:bg-[var(--bg-card)] transition-all resize-none"
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 2px transparent';
            }}
          />
        </div>

        {/* Folder Select */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-[var(--text)] mb-2">
            폴더
          </label>
          <select
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#F4F4F4] text-[var(--text)] focus:outline-none focus:bg-[var(--bg-card)] transition-all appearance-none"
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 2px transparent';
            }}
          >
            {folders.map((f) => (
              <option key={f.id} value={f.name}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 px-6 py-3 bg-[#F4F4F4] text-[var(--text)] rounded-xl font-bold transition-all hover:bg-white"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="flex-1 px-6 py-3 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
