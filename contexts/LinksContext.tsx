'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export interface Link {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail_url?: string;
  folder_id?: string;
  created_at?: string;
  created_by?: string;
  updated_by?: string;
  updated_at?: string;
}

interface LinksContextType {
  links: Link[];
  addLink: (link: Omit<Link, 'id' | 'created_at' | 'created_by' | 'updated_by' | 'updated_at'>) => Promise<void>;
  deleteLink: (linkId: string) => Promise<void>;
  updateLink: (linkId: string, link: Partial<Link>) => Promise<void>;
  isLoading: boolean;
}

const LinksContext = createContext<LinksContextType | undefined>(undefined);

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setLinks(data || []);
    } catch (error) {
      console.error('Failed to fetch links:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addLink = async (link: Omit<Link, 'id' | 'created_at' | 'created_by' | 'updated_by' | 'updated_at'>) => {
    const duplicateLink = links.some(l => l.url === link.url);
    if (duplicateLink) {
      alert('이미 저장된 링크입니다.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('links')
        .insert([{
          title: link.title,
          url: link.url,
          description: link.description || null,
          thumbnail_url: link.thumbnail_url || null,
          folder_id: link.folder_id ? parseInt(link.folder_id) : null,
        }])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        setLinks([data[0], ...links]);
      }
    } catch (error) {
      console.error('Failed to add link:', error);
      alert('링크 추가에 실패했습니다.');
    }
  };

  const deleteLink = async (linkId: string) => {
    try {
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', linkId);

      if (error) throw error;

      setLinks(links.filter(l => l.id !== linkId));
    } catch (error) {
      console.error('Failed to delete link:', error);
      alert('링크 삭제에 실패했습니다.');
    }
  };

  const updateLink = async (linkId: string, updatedLink: Partial<Link>) => {
    try {
      const updateData: any = {};
      if (updatedLink.title !== undefined) updateData.title = updatedLink.title;
      if (updatedLink.description !== undefined) updateData.description = updatedLink.description;
      if (updatedLink.folder_id !== undefined) updateData.folder_id = updatedLink.folder_id ? parseInt(updatedLink.folder_id) : null;
      updateData.updated_at = new Date().toISOString();

      const { error } = await supabase
        .from('links')
        .update(updateData)
        .eq('id', linkId);

      if (error) throw error;

      setLinks(links.map(l =>
        l.id === linkId ? { ...l, ...updatedLink, updated_at: updateData.updated_at } : l
      ));
    } catch (error) {
      console.error('Failed to update link:', error);
      alert('링크 수정에 실패했습니다.');
    }
  };

  return (
    <LinksContext.Provider value={{ links, addLink, deleteLink, updateLink, isLoading }}>
      {children}
    </LinksContext.Provider>
  );
}

export function useLinks() {
  const context = useContext(LinksContext);
  if (context === undefined) {
    throw new Error('useLinks must be used within LinksProvider');
  }
  return context;
}
