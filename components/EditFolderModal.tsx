'use client';

import { useState, useEffect } from 'react';

interface EditFolderModalProps {
  isOpen: boolean;
  folderName: string;
  onClose: () => void;
  onSave: (newName: string) => void;
}

export default function EditFolderModal({
  isOpen,
  folderName,
  onClose,
  onSave,
}: EditFolderModalProps) {
  const [inputValue, setInputValue] = useState(folderName);

  useEffect(() => {
    setInputValue(folderName);
  }, [folderName, isOpen]);

  const handleSave = () => {
    if (inputValue.trim() && inputValue !== folderName) {
      onSave(inputValue.trim());
      onClose();
    }
  };

  const handleCancel = () => {
    setInputValue(folderName);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="bg-[var(--bg-card)] rounded-2xl p-6 w-96 max-w-[90%]"
        style={{ boxShadow: 'var(--shadow-md)' }}
      >
        <h3 className="text-lg font-bold text-[var(--text)] mb-5">폴더 이름 수정</h3>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="폴더 이름을 입력하세요"
          className="w-full px-4 py-3.5 rounded-xl bg-[#F4F4F4] text-[var(--text)] placeholder-[var(--placeholder)] focus:outline-none focus:bg-[var(--bg-card)] transition-all mb-6"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSave();
            } else if (e.key === 'Escape') {
              handleCancel();
            }
          }}
          onFocus={(e) => {
            e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = '0 0 0 2px transparent';
          }}
          autoFocus
          maxLength={30}
        />

        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 px-6 py-3 bg-[#F4F4F4] text-[var(--text)] rounded-xl font-bold transition-all hover:bg-white"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={!inputValue.trim() || inputValue === folderName}
            className="flex-1 px-6 py-3 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
