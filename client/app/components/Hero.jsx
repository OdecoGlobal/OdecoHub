import Link from 'next/link';
import React from 'react';
import heroImage from '../assets/heroImageb.png';
import heroImageMobile from '../assets/heroImageMobileb.png';
import Image from 'next/image';

export default function Hero() {
  const stats = [
    {
      number: '200+',
      text: 'International Brands',
    },
    {
      number: '2,000+',
      text: 'High-Quality Products',
    },
    {
      number: '30,000+',
      text: 'Happy Customers',
    },
  ];
  return (
    <section className="lg:flex pt-7 max-h-[700]">
      <div className="px-4">
        <h2 className=" font-black mb-3 text-4xl">
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h2>
        <p className=" mb-3 text-xs md:text-base text-slate-500">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and carter to your sense of
          style
        </p>
        <Link
          className="block mx-auto lg:mx-0 mb-4 bg-black  py-2 w-full lg:w-fit lg:px-10 rounded-full text-white text-sm text-center"
          href="#"
        >
          Shop Now
        </Link>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-2">
          {stats.map((stat, i) => (
            <div key={i}>
              <h3 className="text-black lg:text-2xl lg:font-semibold font-extrabold">
                {stat.number}
              </h3>
              <p className="text-xs text-slate-500">{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
      <Image
        className=" block mx-auto lg:hidden"
        alt="Hero-Image"
        src={heroImageMobile}
        width={390}
        height={443}
      />
      <Image
        className="hidden bg-inherit lg:block"
        alt="Hero Image"
        src={heroImage}
        width={2000}
        height={663}
      />
    </section>
  );
}
