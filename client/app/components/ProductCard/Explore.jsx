'use client';
import useAxios from '@/app/hooks/useAxios';
import ProductCard from './ProductCard';
import { useEffect } from 'react';

export default function Explore() {
  const { data, isPending, error, fetchData } = useAxios('/products');

  useEffect(() => {
    fetchData();
  }, []);
  const exploreData = data && data.slice(2, 6);
  return (
    <div>
      {data && <ProductCard title="Explore Our Products" data={exploreData} />}{' '}
    </div>
  );
}
