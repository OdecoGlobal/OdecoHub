'use client';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import useAxios from '../hooks/useAxios';
import Image from 'next/image';
import { ChevronUp, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { showAlert } from '../utils/alert';

export default function Cart() {
  const FREE_SHIPPING_THRESHOLD = 4000;
  const SHIPPING_FEE = 10;
  const { user } = useAuthContext();
  if (!user) throw new Error('You need to be logged in to access this page.');
  const { data: cartData, fetchData } = useAxios('/carts');
  const { isPending: isUpdating, fetchData: updateFetchData } = useAxios(
    '/carts',
    'PATCH'
  );
  const [quantities, setQuantities] = useState({});
  useEffect(() => {
    user && fetchData();
  }, []);

  useEffect(() => {
    if (user && cartData && cartData.length > 0) {
      const initialQuantities = cartData.reduce((acc, item) => {
        acc[item._id] = item.quantity;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [user, cartData]);

  const handleQuantityChange = (itemId, newQuantity) => {
    // Allow empty string or valid number input
    if (newQuantity === '' || !isNaN(Number(newQuantity))) {
      setQuantities(prev => ({
        ...prev,
        [itemId]: newQuantity === '' ? '' : Math.max(1, Number(newQuantity)),
      }));
    }
  };

  const handleQuantityIncrement = itemId => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.min(
        (prev[itemId] || 1) + 1,
        cartData.find(item => item._id === itemId).product.stock
      ),
    }));
  };
  const handleQuantityDecrement = itemId => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) - 1),
    }));
  };

  const handleUpdateCart = () => {
    cartData.forEach(item => {
      updateFetchData(
        {
          data: {
            quantity: quantities[item._id],
          },
        },
        item._id
      );
      showAlert('success', 'Cart updated successfully');
    });
  };
  const calculateSubtotal = (price, itemId) => {
    const quantity = quantities[itemId] || 1;
    return (price * quantity).toFixed(2);
  };

  const calculateSubTotal = () => {
    return cartData
      .reduce((total, item) => {
        const quantity = quantities[item._id] || 1;
        return total + item.product.price * quantity;
      }, 0)
      .toFixed(2);
  };

  const calculateShippingFee = () => {
    const subtotal = parseFloat(calculateSubtotal());
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubTotal());
    const shippingFee = parseFloat(calculateShippingFee());
    return subtotal + shippingFee;
  };

  return (
    <section className="mt-5 lg:mt-10 pb-4 px-4 flex items-center justify-center">
      {!user && <div>Please login to acces your cart</div>}

      {!cartData || (cartData?.length === 0 && <p>No cart added yet</p>)}
      {user && cartData?.length > 0 && (
        <main>
          <div className="grid grid-cols-4 mb-6 gap-x-10">
            <h1>Product</h1>
            <h1>Price</h1>
            <h1>Quantity</h1>
            <h1>Subtotal</h1>
          </div>
          {cartData.map((data, i) => (
            <div key={i} className="grid grid-cols-4 gap-x-10  mb-12">
              <div className="flex items-center gap-x-3">
                <Image
                  width={40}
                  height={40}
                  alt={data.product.name}
                  src={data.product.imageCover}
                />
                {data.product.name}
              </div>
              <p>${data.product.price}</p>
              <div className="relative w-fit h-fit rounded-md  border-2 border-secondary2 focus-within:border-red-400">
                <input
                  className="focus:outline-none appearance-none w-14"
                  type="number"
                  value={quantities[data._id] || ''}
                  onChange={e => handleQuantityChange(data._id, e.target.value)}
                  min={1}
                  max={data.product.stock}
                  step={1}
                />
                <div className="absolute inset-y-0 right-0 flex flex-col items-center justify-center gap-y-1 ">
                  <ChevronUp
                    onClick={() => handleQuantityIncrement(data._id)}
                    className="cursor-pointer text-black hover:text:gray-800"
                    strokeWidth={4}
                    size={32}
                  />
                  <ChevronDown
                    onClick={() => handleQuantityDecrement(data._id)}
                    className="cursor-pointer text-black hover:text:gray-800"
                    strokeWidth={4}
                    size={32}
                  />
                </div>
              </div>
              <p>{calculateSubtotal(data.product.price, data._id)}</p>
            </div>
          ))}
          <div className="flex justify-between">
            <Link
              className="btn border-2 px-3 border-secondary2 hover:border-none hover:text-white hover:bg-primary delay-150"
              href="/"
            >
              Back to Shop
            </Link>
            <button
              onClick={handleUpdateCart}
              className="btn border-2 px-3 border-secondary2 hover:border-none hover:text-white hover:bg-primary delay-150"
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating Cart...' : 'Update Cart'}
            </button>
          </div>
          <div className="flex items-center my-5">
            <div></div>
            <div className="ml-auto border-2 border-secondary2 py-3 px-7 rounded-md flex flex-col justify-center gap-y-3">
              <h3 className="mb-3 font-bold text-sm">Cart Total</h3>
              <div className="flex text-xs font-semibold  justify-between gap-x-14 ">
                <p>Subtotal</p>
                <p>${calculateSubTotal()}</p>
              </div>
              <div className="flex text-xs font-semibold  justify-between gap-x-14 ">
                <p>Shipping</p>
                <p>
                  {calculateShippingFee() === 0
                    ? 'Free'
                    : `$${calculateShippingFee().toFixed(2)}`}
                </p>
              </div>
              <div className="flex text-xs font-semibold  justify-between gap-x-14 ">
                <p>Total</p>
                <p>${calculateTotal().toFixed(2)}</p>
              </div>
              <button className="btn bg-primary text-secondary">
                Proceed to checkout
              </button>
            </div>
          </div>
        </main>
      )}
    </section>
  );
}
