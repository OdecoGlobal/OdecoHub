'use client';
import useAxios from '@/app/hooks/useAxios';
import ProductCard from './ProductCard';

export default function Explore() {
  const { data, isPending, error } = useAxios('/products');

  const exploreData = data && data.slice(2, 6);
  return (
    <div>
      {data && <ProductCard title="Explore Our Products" data={exploreData} />}{' '}
    </div>
  );
}
