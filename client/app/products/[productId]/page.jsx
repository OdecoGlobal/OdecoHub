'use client';
import Pending from '@/app/components/ProductCard/Pending';
import StarRating from '@/app/components/StarRating';
import useAxios from '@/app/hooks/useAxios';
import { MinusSquare, Minus, Plus, PlusSquare } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ProductDetails({ params: { productId } }) {
  const { data, isPending, error } = useAxios(`/products/${productId}`);
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  console.log(data);
  useEffect(() => {
    if (data?.images) {
      setActiveImage(data.images[0]);
    }
  }, [data]);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  return (
    <section className="py-6 px-10">
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 py-3">
          {/* ACTIVE IMAGE */}
          <div className=" lg:order-2 max-h-96 overflow-hidden col-span-2 ">
            <Image
              className="w-full h-full object-cover object-center"
              src={activeImage}
              width={300}
              height={300}
              alt={`${data.slug}`}
            />
          </div>
          {/* IMAGES GALLERY */}
          <div className="col-span-1 lg-order-1 flex lg:flex-col h-full justify-evenly">
            {data.images.map((img, i) => (
              <Image
                key={i}
                className={`object-cover  ${
                  activeImage === img
                    ? 'border-2 border-red-600 opacity-70'
                    : ''
                } w-36 h-32 mx-auto`}
                src={img}
                width={300}
                height={300}
                alt={`${data.slug}-img-${i}`}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
          {/* PRODUCT DETAILS */}
          <div className="col-span-2 lg:order-3 px-3 flex flex-col space-y-4">
            <p className="text-center text-2xl font-bold">{data.name}</p>
            <StarRating rating={data.ratingsAverage} />
            <div className="flex space-x-2">
              <p>${data.price}</p>
              <p
                className={`${data.stock > 0 ? 'text-accent' : 'text-primary'}`}
              >
                {data.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
            <p className="text-sm font-medium">{data.description}</p>

            <div className="flex space-x-3">
              <div className="flex items-center  border-2 border-secondary2 rounded-md">
                <div
                  className="flex justify-center items-center h-full rounded-l-md  w-10 hover:bg-primary text-secondary2 cursor-pointer hover:text-white"
                  onClick={decrementQuantity}
                >
                  <Minus />
                </div>

                <input
                  type="number"
                  className=" border-x-2 border-inherit w-16 h-full text-center focus:outline-none focus:border-2 focus:border-primary"
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                />

                <div
                  className="flex justify-center rounded-r-md items-center h-full w-10 hover:bg-primary text-secondary2 cursor-pointer hover:text-white
                
                "
                  onClick={incrementQuantity}
                >
                  <Plus />
                </div>
              </div>
              <button className="btn--primary px-4">Buy Now</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
