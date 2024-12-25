'use client';
import useSWR from 'swr';
import { axiosInstance } from '@/app/utils/axios';
import StarRating from '@/app/components/StarRating';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

export default function ProductDetails({ params: { productId } }) {
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const fetcher = async url => {
    try {
      const response = await axiosInstance.get(url);
      return response.data.data.data;
    } catch (err) {
      console.log(err.status);
      if (err.status === 400) notFound();
      throw err;
    }
  };

  const { data: product } = useSWR(`/products/${productId}`, fetcher, {
    suspense: true,
  });

  useEffect(() => {
    if (product?.images?.length > 0) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, product.stock));
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleQuantityChange = e => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };

  return (
    <section className="py-6 px-10">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 py-3">
        {/* ACTIVE IMAGE */}
        <div className=" lg:order-2 max-h-96 overflow-hidden col-span-2 ">
          <Image
            className="w-full h-full object-cover object-center"
            src={activeImage}
            width={300}
            height={300}
            alt={`${product.slug}`}
          />
        </div>
        {/* IMAGES GALLERY */}
        <div className="col-span-1 lg-order-1  flex flex-wrap lg:flex-col h-full gap-2">
          {product.images.map((img, i) => (
            <Image
              key={i}
              className={`object-cover  ${
                activeImage === img ? 'opacity-70' : ''
              } w-20 aspect-square rounded-lg lg:w-36 lg:h-32 mx-auto`}
              src={img}
              width={300}
              height={300}
              alt={`${product.slug}-img-${i}`}
              onClick={() => setActiveImage(img)}
            />
          ))}
        </div>
        {/* PRODUCT DETAILS */}
        <div className="col-span-2 lg:order-3 px-3 flex flex-col space-y-4">
          <p className="text-center text-2xl font-bold">{product.name}</p>
          <StarRating rating={product.ratingsAverage} />
          <div className="flex space-x-2">
            <p>${product.price}</p>
            <p
              className={`${
                product.stock > 0 ? 'text-accent' : 'text-primary'
              }`}
            >
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
          <p className="text-sm font-medium">{product.description}</p>

          <div className="flex space-x-3">
            <div className="flex items-center  border-2 border-secondary2 rounded-md">
              <button
                className="flex justify-center items-center h-full rounded-l-md w-10 hover:bg-primary text-secondary2 hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus />
              </button>

              <input
                type="number"
                className="border-x-2 border-inherit w-16 h-full text-center focus:outline-none focus:border-2 focus:border-primary"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={product.stock}
                aria-label="Quantity"
              />

              <button
                className="flex justify-center items-center h-full rounded-r-md w-10 hover:bg-primary text-secondary2 hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                onClick={incrementQuantity}
                disabled={quantity >= product.stock}
                aria-label="Increase quantity"
              >
                <Plus />
              </button>
            </div>
            <button className="btn--primary px-4">Buy Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}
