import { useState, useEffect, useRef } from 'react';

type Callback = () => void;

const useExternalClick = (ref: React.RefObject<HTMLElement>, callback: Callback): void => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleClick);
    return () => {
      document.removeEventListener('mouseup', handleClick);
    };
  }, []);
};

export default useExternalClick;