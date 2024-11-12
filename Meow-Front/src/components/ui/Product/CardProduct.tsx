import React, { useState } from 'react';
import Image from 'next/image';
import RecommendFlag from '@/components/ui/Product/RecommendFlag';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

type ProductProps = {
  id: number;
  ImageUrl: string;
  title: string;
  price: number;
  recommend: boolean;
};
const urlapi = process.env.NEXT_PUBLIC_API_URL_DEV;

function CardProduct(props: ProductProps) {
  const { id, ImageUrl, title, price, recommend } = props;

  const [favorites, setFavorite] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorite(prevFavorite => {
      if (prevFavorite.includes(id)) {
        return prevFavorite.filter(favId => favId !== id);
      } else {
        return [...prevFavorite, id];
      }
    });
  };

  return (
    <div
      className={`shadow-1xl rounded-sm max-w-44  hover:transform hover:scale-105 hover:transition hover:ease-in-out`}>
      <div className="relative">
        <div className={`absolute top-0 left-0 ${recommend ? 'visible' : 'invisible'}`}>
          <RecommendFlag />
        </div>
        <Image
          src={`${urlapi}/images/${ImageUrl}`}
          alt="product"
          width={220}
          height={250}
          className="rounded-sm object-cover w-52 h-52"
        />
      </div>
      <div className="mx-2 mt-0.5 mb-2">
        <div className="flex justify-between">
          <h3 className="font-medium text-base">{title}</h3>
          <button key={id} onClick={() => toggleFavorite(id)}>
            {favorites.includes(id) ? (
              <HeartFilled />
            ) : (
              <HeartOutlined className="text-xl text-primary hover:transform hover:scale-125 hover:transition hover:ease-in-out " />
            )}
          </button>
        </div>
        <h3 className="text-primary font-semibold text-sm mt-5">฿{price}</h3>
      </div>
    </div>
  );
}

export default CardProduct;
