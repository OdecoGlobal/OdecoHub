'use client';
import useAxios from '@/app/hooks/useAxios';
import Image from 'next/image';
import Link from 'next/link';
import favIcon from '../../assets/favoriteIcon.svg';
import { useEffect, useState } from 'react';

export default function ProductCard() {
  const { data, isPending, error, fetchData } = useAxios('/products');
  //   const [products, setProduct] = useState(null);
  console.log(data);

  return (
    <section className="px-6 mt-5 lg:mt-10">
      <h3 className="text-2xl lg:text-3xl font-bold ">Explore Our Products</h3>
      <div className="mt-5 grid grid-cols-4 gap-9 border-primary auto-rows-auto">
        {data &&
          data.slice(2, 10).map(product => (
            <div key={product.id} className="relative border-2 border-red-500">
              <Image
                className="bg-slate-300 absolute right-3 top-1"
                width={30}
                height={30}
                src={favIcon}
                alt="favorite icon"
              />
              <Link
                href="#"
                className="h-80 rounded-2xl  shadow-slate-400 shadow-xl flex flex-col justify-center items-center  relative"
              >
                <div className=" p-6 overflow-hidden">
                  <Image
                    className="object-contain"
                    width={300}
                    height={300}
                    src={product.imageCover}
                    alt={product.slug}
                  />
                </div>

                <h1>{product.name}</h1>
                <div className="flex w-full justify-evenly">
                  <p className="text-primary text-sm">${product.price}</p>
                  <p className="text-sm">({product.ratingsAverage})</p>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
}
