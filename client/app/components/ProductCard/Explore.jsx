import ProductCard from './ProductCard';
import { axiosInstance } from '@/app/utils/axios';

export default async function Explore() {
  const explore = await axiosInstance('/products');
  const data = explore.data.data.data;

  const exploreData = data && data.slice(2, 6);
  return (
    <div>
      {data && <ProductCard title="Explore Our Products" data={exploreData} />}
    </div>
  );
}
