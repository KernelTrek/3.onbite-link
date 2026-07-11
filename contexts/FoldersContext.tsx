'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface Folder {
  id: string;
  name: string;
}

interface FoldersContextType {
  folders: Folder[];
  addFolder: (folderName: string) => void;
  deleteFolder: (folderId: string) => void;
  updateFolder: (folderId: string, newName: string) => void;
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
      id: String(Math.max(...folders.map(f => parseInt(f.id)), 0) + 1),
      name: folderName,
    };
    setFolders([...folders, newFolder]);
  };

  const deleteFolder = (folderId: string) => {
    setFolders(folders.filter(f => f.id !== folderId));
  };

  const updateFolder = (folderId: string, newName: string) => {
    setFolders(folders.map(f =>
      f.id === folderId ? { ...f, name: newName } : f
    ));
  };

  return (
    <FoldersContext.Provider value={{ folders, addFolder, deleteFolder, updateFolder }}>
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
