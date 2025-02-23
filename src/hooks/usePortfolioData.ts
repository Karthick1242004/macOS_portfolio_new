/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';

const DATA_URL = 'https://gist.githubusercontent.com/Caliber875/b5750e905a08adf1f259d45809ad624d/raw/f1e7430c7e441535eb68afff964c23dfafc7fac0/data.json';

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
