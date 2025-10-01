// Dynamic Title Hook - Created by AI Assistant
import { useEffect } from 'react';

export const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | App Store`;
    return () => {
      document.title = 'App Store';
    };
  }, [title]);
};