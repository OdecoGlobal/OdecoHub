import React from 'react';
import Hero from './components/Hero';
import Brands from './components/Brands';
import Explore from './components/ProductCard/Explore';
import Popular from './components/ProductCard/Popular';

export default function Home() {
  return (
    <div>
      <Hero />
      <Explore />
      <Popular />
    </div>
  );
}
