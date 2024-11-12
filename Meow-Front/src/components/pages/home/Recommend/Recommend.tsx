"use client"

import React, { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import CardProduct from '@/components/ui/Product/CardProduct'
import useApi from '@/hooks/useApi'
import PaginationCom from '@/components/ui/pagination/PaginationCom'
import { Row, Col } from 'antd';
// import page from '@/app/category/[id]/page';


type Props = {}

type Pagin = {
  pageDefault: number
  pageSize: number
  total: number
}

type Product = {
  id: number
  ImageUrl: string;
  title: string;
  price: number;
  recommend: boolean;
}

type ApiResponse = {
  result: Product[];
};

const RecommendPage: React.FC = ({ }: Props) => {

  const api = useApi()
  const urlapi = process.env.NEXT_PUBLIC_API_URL_DEV
  const [product, setProduct] = useState<Product[]>([])

  const [buttonVisible, setButtonVisible] = useState<boolean>(true)

  const getApiRecommend = async (): Promise<void> => {
    try {

      // const response = await api.api('http://localhost:3001/api/product/null/null', 'GET');

      const response = await fetch(`${urlapi}/api/product/getProdRecomend/null/null`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const dataRecommend = await response.json() as ApiResponse;
      if (dataRecommend) {
        const newData = dataRecommend.result.map((data: any) => {
          return {
            id: data?.PRODUCT_ID,
            ImageUrl: data?.PRODUCT_IMG,
            title: data?.PRODUCT_NAME,
            price: data?.PRODUCT_PRICE,
            recommend: true
          }
        })
        setProduct(newData);
        console.log('newData', newData)
      }
      console.log("dataRecommend", dataRecommend);
      console.log('product', product)
    } catch (error: any) {
      console.error('Error fetching recommendations:', error.message);
    }
  };

  useEffect(() => {
    getApiRecommend()
  }, [])

  const onclick = () => {
    setButtonVisible(false)
  }

  //#region pagination
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageSize = 10

  const indexOfLastProduct = currentPage * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);

  const page: Pagin = {
    pageDefault: 1,
    pageSize: pageSize,
    total: product.length,
  }


  const onChange = (page: number) => {
    setCurrentPage(page)
  }
  //#endregion pagination


  return (
    <div className='my-5'>
      <h3 className="bg-Header text-sm py-2 pl-6 font-bold">Recommended</h3>
      <div className="mt-3 py-6 px-7 shadow-1xl ">
        <div className='grid xl:grid-cols-5 gap-5 justify-evenly justify-items-center'>
          {currentProducts?.map((data: Product, index: number) => (
            <Link key={data.id} href={`/category/[id]`} as={`/category/${data.title}`} >
              <CardProduct {...data} />
            </Link>
          ))}
        </div>

        <div className={`flex ${product.length <= 10 ? "hidden " : "visible"} ${buttonVisible ? "justify-center" : "justify-end mr-12"}`}>
          {buttonVisible && (
            <button
              className={`mt-20 px-24 py-2  gradient text-lg text-white rounded hover:transform hover:scale-105 hover:transition hover:ease-in-out `}
              onClick={onclick}
            >
              SEE MORE...
            </button>
          )}
          <PaginationCom onChange={onChange} {...page} className={`mt-12  ${buttonVisible ? "hidden" : "visible"}`} />
        </div>
      </div>
    </div>
  )
}

export default RecommendPage