import { useEffect } from 'react';

export const useScrollListener = (callback: () => void) => {
  useEffect(() => {
    window.addEventListener('scroll', callback);
    return () => window.removeEventListener('scroll', callback);
  }, [callback]);
};
