'use client'; // บังคับให้ไฟล์นี้รันใน Client Side เท่านั้น

import React, { useEffect, useState } from 'react';
import { Layout, Carousel } from 'antd';
import Link from 'next/link';
import { URL } from '@/shared/constant/url.const';
import useApi from '@/hooks/useApi';

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

export default function Banner() {
  const api = useApi()
  const urlapi = process.env.NEXT_PUBLIC_API_URL_DEV
  const urlimg = process.env.NEXT_PUBLIC_API_URL_DEVimg

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const beforeChange = (oldIndex: number, newIndex: number) => {
    setCurrentSlide(newIndex);
  };

  const [dataImg, setDataImg] = useState<any>([])
  const [speed, setSpeed] = useState<number[]>([0])

  //getconfig speed
  const getSpeedApi = async () => {
    try {
      const speedApiResponse: SpeedApiResponse | undefined = await api.api(`${urlapi}${URL.getAutoPlaySpeed}`, "GET");
      if (speedApiResponse?.isSuccess) {
        const speedValue = speedApiResponse.result[0].numeric_value;
        setSpeed([speedValue]);
      } else {
        console.warn("SpeedAPINodata");
      }
    } catch (error) {
      console.error("Error fetching speed:", error);
    }
  }
  //getImg
  const getApiImg = async () => {
    const apiImg: ImgApiResponse | undefined = await api.api(`${urlapi}${URL.getBanner}`, "GET");
    if (apiImg) {
      setDataImg(apiImg.result)
    }
  }
  useEffect(() => {
    getApiImg()
    getSpeedApi()
  }, [])

  //speedAPI
  type ResultSpeed = {
    numeric_value: number;
  }
  type SpeedApiResponse = {
    isSuccess: boolean,
    message: string;
    result: ResultSpeed[];
  }
  //imgapi
  type ResultImg = {
    config_name: string;
    config_value: string;
  }
  type ImgApiResponse = {
    message: string;
    result: ResultImg[];
  }

  return (
    <React.Fragment>

      {/* <Carousel
        autoplay
        autoplaySpeed={speed[0]}
        beforeChange={beforeChange}
        speed={500}
        easing="ease-in-out"
        slidesToShow={1}
        centerMode={true}
        centerPadding='10%'
      >
        {dataImg?.map((data: ResultImg, index: number) => (
          <div key={data.config_name} className={currentSlide === index ? 'active-slide' : 'inactive-slide'} style={{ position: 'relative', width: '1200px', height: '400px' }}>
            <img
              src={urlimg + data.config_value}
              alt={`banner ${index}`}
              loading="lazy"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </Carousel> */}

      <Carousel autoplay style={{ padding: '20px' }}>
        <div>
          <img
            src="http://localhost:3001/images/banner_1.jpg"
            alt="Slide 1"
            style={{ objectFit: 'cover', width: '100%' }}
            height={350}
          />
        </div>
        <div>
          <img
            src="http://localhost:3001/images/banner_2.jpg"
            alt="Slide 2"
            style={{ objectFit: 'cover', width: '100%' }}
            width={1200}
            height={350}
          />
        </div>
        <div>
          <img
            src="http://localhost:3001/images/banner_3.jpg"
            alt="Slide 3"
            style={{ objectFit: 'cover', width: '100%' }}
            width={1200}
            height={350}
          />
        </div>
      </Carousel>
    </React.Fragment>
  );
}
