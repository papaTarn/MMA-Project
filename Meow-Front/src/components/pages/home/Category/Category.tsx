"use client";

import React, { useState } from 'react';
import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link'

function Category() {

    const itemsCategory = [
        {
            key: '1',
            label: (
                <div className="item-center">
                    <Image src="http://localhost:3001/images/food.png" alt="icon Food and Medicine" width={68} height={68} />
                    <span className="mt-6 text-white-700" >Food & Medicine</span>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div className="item-center">
                    <Image src="http://localhost:3001/images/house_cat.png"alt="icon Home & Items" width={60} height={60} />
                    <span className="mt-7 text-white-700" >Home & Items</span>
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <div className="item-center">
                    <Image src="http://localhost:3001/images/soap-bottle.png" alt="icon Cleaning Product" width={60} height={60} />
                    <span className="mt-6 text-white-700" >Cleaning Product</span>
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <div className="item-center">
                    <Image src="http://localhost:3001/images/kitty.png" alt="icon Other" width={60} height={60} />
                    <span className="mt-6 text-white-700" >Other</span>
                </div>
            ),
        },
    ];

    return (
        <div className="my-5">
            <h3 className="bg-Header text-lg py-2 pl-6 font-bold">Category</h3>
            <div className="mt-3 py-6 px-7 shadow-1xl flex flex-wrap">
                {itemsCategory.map(item => (
                    <div className="flex space-x-6" key={item.key}>
                        <Link href={`/home/category/${item.key}`} >
                            <Button className="category-button mr-4 mb-4">
                                {item.label}
                            </Button>
                        </Link>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Category;
