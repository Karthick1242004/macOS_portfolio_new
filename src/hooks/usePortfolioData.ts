/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';

const DATA_URL = 'https://gist.githubusercontent.com/Karthick1242004/d62e7e6fd0503badf9324ee880203ebb/raw/gistfile1.txt';

interface PortfolioData {
  name: string;
  avatar: string;
  websites: {
    favorites: {
      title: string;
      sites: Array<{
        id: string;
        title: string;
        img: string;
        link: string;
      }>;
    };
    freq: {
      title: string;
      sites: Array<{
        id: string;
        title: string;
        img: string;
        link: string;
      }>;
    };
  };
  about: {
    name: string;
    bio: string[];
    education: string;
    interests: string;
    hobbies: string;
    contact: {
      email: string;
      github: string;
      linkedin: string;
    };
  };
  notes: Array<{
    id: string;
    title: string;
    icon: string;
    md: Array<{
      id: string;
      title: string;
      file: string;
      icon: string;
      excerpt: string;
      link?: string;
    }>;
  }>;
}

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
