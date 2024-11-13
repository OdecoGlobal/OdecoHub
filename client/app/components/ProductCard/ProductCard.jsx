'use client';
import Image from 'next/image';
import Link from 'next/link';
import StarRating from '../StarRating';
import { Heart, ShoppingCart } from 'lucide-react';

export default function ProductCard({ data, title }) {
  return (
    <section className="px-6 mt-5 lg:mt-10 mb-5">
      <h3 className="text-2xl lg:text-3xl font-bold ">{title}</h3>
      <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-9 auto-rows-auto">
        {data.map(product => (
          <div
            key={product.id}
            className="py-5  rounded-2xl bg-tetiary shadow-slate-400 shadow-xl"
          >
            <div className="flex items-center px-5">
              <p className="bg-primary  text-slate-100  w-10 text-center">
                {product.priceDiscount}%
              </p>
              <div className="ml-auto flex space-x-3">
                <ShoppingCart
                  className="cursor-pointer hover:fill-accent"
                  fill="gray"
                  strokeWidth={0}
                />
                <Heart
                  className="cursor-pointer hover:fill-primary"
                  fill="gray"
                  strokeWidth={0}
                />
              </div>
            </div>
            <Link
              href={`/products/${product.id}`}
              className="h-80 flex flex-col justify-center items-center  relative"
            >
              <div className=" w-48 h-36 overflow-hidden ">
                <Image
                  className="object-cover"
                  width={300}
                  height={300}
                  src={product.imageCover}
                  alt={product.slug}
                />
              </div>

              <p className="font-bold">{product.name}</p>
              <div className="flex flex-col w-full justify-evenly px-4">
                <div className="flex space-x-2 items-center">
                  <p className="text-primary">
                    {(
                      product.price *
                      (1 - product.priceDiscount * 0.01)
                    ).toFixed(2)}
                  </p>
                  <p className="text-secondary line-through text-sm">
                    ${product.price}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <StarRating rating={product.ratingsAverage} />
                  <p className="text-sm">({product.ratingsAverage})</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
