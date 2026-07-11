'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export interface Folder {
  id: string;
  name: string;
  created_at?: string;
  created_by?: string;
  updated_by?: string;
  updated_at?: string;
}

interface FoldersContextType {
  folders: Folder[];
  addFolder: (folderName: string) => Promise<void>;
  deleteFolder: (folderId: string) => Promise<void>;
  updateFolder: (folderId: string, newName: string) => Promise<void>;
  isLoading: boolean;
}

const FoldersContext = createContext<FoldersContextType | undefined>(undefined);

export function FoldersProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      const { data, error } = await supabase
        .from('folders')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      setFolders(data || []);
    } catch (error) {
      console.error('Failed to fetch folders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addFolder = async (folderName: string) => {
    const duplicateFolder = folders.some(f => f.name === folderName);
    if (duplicateFolder) {
      alert('이미 존재하는 폴더명입니다.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('folders')
        .insert([{ name: folderName }])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        setFolders([...folders, data[0]]);
      }
    } catch (error) {
      console.error('Failed to add folder:', error);
      alert('폴더 추가에 실패했습니다.');
    }
  };

  const deleteFolder = async (folderId: string) => {
    try {
      const { error } = await supabase
        .from('folders')
        .delete()
        .eq('id', folderId);

      if (error) throw error;

      setFolders(folders.filter(f => f.id !== folderId));
    } catch (error) {
      console.error('Failed to delete folder:', error);
      alert('폴더 삭제에 실패했습니다.');
    }
  };

  const updateFolder = async (folderId: string, newName: string) => {
    const duplicateFolder = folders.some(f => f.id !== folderId && f.name === newName);
    if (duplicateFolder) {
      alert('이미 존재하는 폴더명입니다.');
      return;
    }

    try {
      const { error } = await supabase
        .from('folders')
        .update({
          name: newName,
          updated_at: new Date().toISOString()
        })
        .eq('id', folderId);

      if (error) throw error;

      setFolders(folders.map(f =>
        f.id === folderId ? { ...f, name: newName, updated_at: new Date().toISOString() } : f
      ));
    } catch (error) {
      console.error('Failed to update folder:', error);
      alert('폴더 수정에 실패했습니다.');
    }
  };

  return (
    <FoldersContext.Provider value={{ folders, addFolder, deleteFolder, updateFolder, isLoading }}>
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
