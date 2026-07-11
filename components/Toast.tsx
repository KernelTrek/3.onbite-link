'use client';

import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const bgColor = {
    success: 'bg-[#30B06E]',
    error: 'bg-[#F04452]',
    info: 'bg-[var(--accent)]',
  }[type];

  return (
    <div className="fixed bottom-6 left-6 right-6 max-w-sm z-50">
      <div className={`${bgColor} text-white rounded-xl px-4 py-3 shadow-lg animate-fadeIn`}>
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}
