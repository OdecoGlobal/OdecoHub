import React from 'react';
import calvin from '../assets/calvin.svg';
import gucci from '../assets/gucci.svg';
import prada from '../assets/prada.svg';
import versace from '../assets/versace.png';
import zara from '../assets/zara.svg';
import Image from 'next/image';

export default function Brands() {
  const brands = [versace, zara, prada, gucci, calvin];
  return (
    <section className="bg-black w-full px-3 py-2 flex flex-wrap justify-center lg:justify-evenly gap-x-7 gap-y-3">
      {brands.map((brand, i) => (
        <Image key={i} src={brand} alt="brand-logo" width={60} height={25} />
      ))}
    </section>
  );
}
