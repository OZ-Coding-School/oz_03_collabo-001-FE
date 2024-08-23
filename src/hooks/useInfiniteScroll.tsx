/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import {
  useInfiniteQuery,
  InfiniteQueryObserverResult,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

interface UseInfiniteScrollProps<TData, TError> {
  queryKey: readonly unknown[];
  queryFn: (context: any) => Promise<TData>;
  getNextPageParam: (lastPage: TData, allPages: TData[]) => unknown;
  options?: Omit<
    UseInfiniteQueryOptions<TData, TError>,
    'queryKey' | 'queryFn' | 'getNextPageParam'
  >;
}

function useInfiniteScroll<TData, TError = unknown>({
  queryKey,
  queryFn,
  getNextPageParam,
  options = {
    initialPageParam: undefined,
  },
}: UseInfiniteScrollProps<TData, TError>) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  }: InfiniteQueryObserverResult<TData, TError> = useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam,
    ...options,
  });

  const observerElem = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerElem.current) {
      observer.observe(observerElem.current);
    }

    return () => {
      if (observerElem.current) {
        observer.unobserve(observerElem.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return {
    data,
    observerElem,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  };
}

export default useInfiniteScroll;
