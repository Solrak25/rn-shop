import { useState } from 'react';
import { getProducts } from '@/lib/data/products';
import { useInfiniteQuery } from '@tanstack/react-query';


export const useProducts = () => {
  const [gender, setGender] = useState('all');

  const productsQuery = useInfiniteQuery({
    queryKey: ['products', 'infinite', { gender }],
    queryFn: ({ pageParam }) => getProducts(20, pageParam * 20, gender),

    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length;
    },
  });


  return {
    productsQuery,
    gender,

    setGender,
    loadNextPage: productsQuery.fetchNextPage,
  };
};

