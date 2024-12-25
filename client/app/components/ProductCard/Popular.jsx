import ProductCard from './ProductCard';
import { axiosInstance } from '@/app/utils/axios';

export default async function Popular() {
  const products = await axiosInstance('/products/popular-products');
  const data = products.data.data.data;

  const popularProduct = data && data.slice(0, 4);
  return (
    <div>
      {data && (
        <ProductCard title="Best Selling Products" data={popularProduct} />
      )}
    </div>
  );
}
