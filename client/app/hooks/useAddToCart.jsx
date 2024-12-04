import { useAuthContext } from './useAuthContext';
import useAxios from './useAxios';
import { showAlert } from '../utils/alert';

export function useAddToCart() {
  const { user } = useAuthContext();
  const { isPending, fetchData, error } = useAxios('/carts', 'POST');

  const addToCart = async productId => {
    if (!user) {
      showAlert('error', 'You must be logged in to add items to cart ');
      return;
    }

    try {
      await fetchData({
        data: {
          product: productId,
          quantity: 1,
        },
      });
      showAlert('success', 'Cart added succesfully');
    } catch (err) {
      console.log(err);
      showAlert('error', error || 'FAiled to add product to cart');
    }
  };

  return { addToCart, isPending };
}
