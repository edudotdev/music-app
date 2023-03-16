import { useState, useEffect, useRef } from 'react';

type Callback = () => void;

const useExternalClick = (ref: React.RefObject<HTMLElement>, callback: Callback): void => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);
};

export default useExternalClick;