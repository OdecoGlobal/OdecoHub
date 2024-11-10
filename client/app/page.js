import React from 'react';
import Hero from './components/Hero';
import Brands from './components/Brands';
import ProductCard from './components/ProductCard/ProductCard';

export default function Home() {
  return (
    <div>
      <Hero />
      <Brands />
      <ProductCard />
    </div>
  );
}
