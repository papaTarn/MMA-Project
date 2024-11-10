"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Carousel as AntCarousel, message } from 'antd';
import '../Banner/Banner.css'
import useApi from '@/hooks/useApi';


const Banner: React.FC = () => {
    const api = useApi()
    const urlapi = process.env.NEXT_PUBLIC_API_URL_DEV1
    const urlimg = process.env.NEXT_PUBLIC_API_URL_DEVimg

    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const beforeChange = (oldIndex: number, newIndex: number) => {
        setCurrentSlide(newIndex);
    };

    const [dataImg, setDataImg] = useState<any>([])
    const [speed, setSpeed] = useState<number[]>([0])

    //speedAPI
    type ResultSpeed = {
        numeric_value: number;
    }
    type SpeedApiResponse = {
        isSucess: boolean,
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
// ตัวย่อย จน 1:1
// a = [{message:"aaa",result:[{value:10}]}]


    //getconfig speed
    const getSpeedApi = async () => {
        try {
            const speedApiResponse: SpeedApiResponse | undefined = await api.api(`${urlapi}/api/config/getSpeedauto`, "GET");
            if (speedApiResponse?.isSucess) {
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
        const apiImg: ImgApiResponse | undefined = await api.api(`${urlapi}/api/product/getProdBanner`, "GET")
        if (apiImg) {
            setDataImg(apiImg.result)
            console.log("testAPIimg", apiImg);
        }
    }
    useEffect(() => {
        getApiImg()
        getSpeedApi()
    }, [])

    return (
        <div className='Back mt-5'>
            <AntCarousel
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
                    <div key={data.config_name} className={currentSlide === index ? 'active-slide' : 'inactive-slide'}>
                        <img
                            src={urlimg+data.config_value}
                            alt={`banner ${index}`}
                            loading="lazy"
                        />
                    </div>
                ))}
            </AntCarousel>
        </div>
    )
}

export default Banner

