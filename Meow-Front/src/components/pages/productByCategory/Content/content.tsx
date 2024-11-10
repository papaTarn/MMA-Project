import React, { useState, useEffect } from "react"; 
import { Layout } from 'antd';
import CardProduct from "@/components/ui/Product/CardProduct";
import useApi from '@/hooks/useApi';
import Link from "next/link";
import { Col, Divider, Row } from 'antd';

const { Content: AntdContent } = Layout; 

type Props = {
  categoryId: string; 
}

type Product = {
  id: number;
  ImageUrl: string;
  title: string;
  price: number;
  recommend: boolean; 
}

type ApiResponseItem = {
  PRODUCT_ID: number;
  PRODUCT_IMG: string;
  PRODUCT_NAME: string;
  PRODUCT_PRICE: number;
  RECOMEND_FLAG: string | null; 
}

const CustomContent: React.FC<Props> = ({ categoryId }) => { 
  const api = useApi();
  const urlapi = process.env.NEXT_PUBLIC_API_URL_DEV1;
  const [product, setProduct] = useState<Product[]>([]);

  const getApiProducts = async (categoryId: string): Promise<void> => {
    try {
      const response = await fetch(`${urlapi}/api/product/getProdByCateId/${categoryId}/null`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const dataProducts = await response.json();
      const products: ApiResponseItem[] = dataProducts.recordset; 

      if (products) {
        const newData = products.map((data: ApiResponseItem) => ({
          id: data.PRODUCT_ID,
          ImageUrl: data.PRODUCT_IMG,
          title: data.PRODUCT_NAME,
          price: data.PRODUCT_PRICE,
          recommend: data.RECOMEND_FLAG === "X"
        }));
        setProduct(newData);
        console.log('newData', newData);
      }
    } catch (error: any) {
      console.error('Error fetching products:', error.message);
    }
  };

  useEffect(() => {
    getApiProducts(categoryId);
  }, [categoryId]);

  const chunkArray = (array: Product[], size: number) => {
    return array.reduce((acc, item, index) => {
      const chunkIndex = Math.floor(index / size);
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = []; 
      }
      acc[chunkIndex].push(item);
      return acc;
    }, [] as Product[][]);
  };

  const productChunks = chunkArray(product, 5);

return (

  <Row>
        <Col span={19} push={4}>
          <Row gutter={16}>
                {productChunks.map((chunk, index) => (
                  <Col className="gutter-row" span={3}>
                  <div>
                    {chunk.map((data: Product) => (
                      <Link key={data.id} href={`/home/category/[id]`} as={`/home/category/${data.id}`}>
                        <CardProduct {...data} />
                      </Link>
                    ))}
                  </div>
                  </Col>
                ))}  
            </Row>
        </Col>
        <Col span={5} pull={18}>
            col-5 col-push-18
        </Col>
    </Row>

  );
}

export default CustomContent;