'use client';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  folderName: string;
  type?: 'folder' | 'link';
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  folderName,
  type = 'folder',
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  const itemType = type === 'folder' ? '폴더' : '링크';
  const title = `${itemType} 삭제`;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="bg-[var(--bg-card)] rounded-2xl p-6 w-96 max-w-[90%]"
        style={{ boxShadow: 'var(--shadow-md)' }}
      >
        <h3 className="text-lg font-bold text-[var(--text)] mb-3">{title}</h3>
        <p className="text-[var(--text-sub)] mb-6">
          <span className="font-semibold text-[var(--text)]">{folderName}</span>
          {' '}{itemType}를 정말 삭제하시겠어요?
        </p>
        <p className="text-sm text-[var(--text-sub)] mb-6">
          이 작업은 되돌릴 수 없습니다.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-[#F4F4F4] text-[var(--text)] rounded-xl font-bold transition-all hover:bg-white"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-[var(--error)] text-white rounded-xl font-bold transition-all hover:opacity-90"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
