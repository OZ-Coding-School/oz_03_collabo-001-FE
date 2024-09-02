import { useEffect, useRef } from 'react';

const useInfiniteScroll = (callback: () => void, hasMore: boolean) => {
  const observerElem = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          callback();
        }
      },
      { threshold: 0.1 }
    );

    const currentElem = observerElem.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [callback, hasMore]);

  return { observerElem };
};

export default useInfiniteScroll;
