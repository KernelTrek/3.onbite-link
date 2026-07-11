'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface Link {
  id: string;
  title: string;
  description: string;
  url: string;
  favicon?: string;
  image?: string;
  folder: string;
}

interface LinksContextType {
  links: Link[];
  addLink: (link: Omit<Link, 'id'>) => void;
  deleteLink: (linkId: string) => void;
  updateLink: (linkId: string, link: Partial<Link>) => void;
}

const LinksContext = createContext<LinksContextType | undefined>(undefined);

export function LinksProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<Link[]>([
    {
      id: '1',
      title: 'GitHub',
      description: "The world's leading software development platform",
      url: 'https://github.com',
      favicon: 'https://github.com/favicon.ico',
      folder: '개발',
    },
    {
      id: '2',
      title: 'Next.js',
      description: 'The React Framework for Production',
      url: 'https://nextjs.org',
      favicon: 'https://nextjs.org/favicon.ico',
      folder: '개발',
    },
    {
      id: '3',
      title: 'Figma',
      description: 'The collaborative interface design tool',
      url: 'https://figma.com',
      favicon: 'https://figma.com/favicon.ico',
      folder: '디자인',
    },
    {
      id: '4',
      title: 'CSS-Tricks',
      description: 'Daily articles about CSS, HTML, JavaScript, and web design',
      url: 'https://css-tricks.com',
      favicon: 'https://css-tricks.com/favicon.ico',
      folder: '디자인',
    },
  ]);

  const addLink = (link: Omit<Link, 'id'>) => {
    const newLink = {
      ...link,
      id: String(Math.max(...links.map(l => parseInt(l.id)), 0) + 1),
    };
    setLinks([...links, newLink]);
  };

  const deleteLink = (linkId: string) => {
    setLinks(links.filter(l => l.id !== linkId));
  };

  const updateLink = (linkId: string, updatedLink: Partial<Link>) => {
    setLinks(links.map(l =>
      l.id === linkId ? { ...l, ...updatedLink } : l
    ));
  };

  return (
    <LinksContext.Provider value={{ links, addLink, deleteLink, updateLink }}>
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
