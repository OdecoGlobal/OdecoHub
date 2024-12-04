'use client';
import React, { useEffect } from 'react';
import useAxios from '@/app/hooks/useAxios';
import ProductCard from './ProductCard';

export default function Popular() {
  const { data, isPending, error, fetchData } = useAxios(
    '/products/popular-products'
  );

  useEffect(() => {
    fetchData();
  }, []);
  const popularProduct = data && data.slice(0, 4);
  return (
    <div>
      {data && (
        <ProductCard title="Best Selling Products" data={popularProduct} />
      )}
    </div>
  );
}
