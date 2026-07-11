'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface Folder {
  id: string;
  name: string;
}

interface FoldersContextType {
  folders: Folder[];
  addFolder: (folderName: string) => void;
}

const FoldersContext = createContext<FoldersContextType | undefined>(undefined);

export function FoldersProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([
    { id: '1', name: '개발' },
    { id: '2', name: '디자인' },
    { id: '3', name: '뉴스' },
  ]);

  const addFolder = (folderName: string) => {
    const newFolder = {
      id: String(folders.length + 1),
      name: folderName,
    };
    setFolders([...folders, newFolder]);
  };

  return (
    <FoldersContext.Provider value={{ folders, addFolder }}>
      {children}
    </FoldersContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FoldersContext);
  if (context === undefined) {
    throw new Error('useFolders must be used within FoldersProvider');
  }
  return context;
}
