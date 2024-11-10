import React from 'react';
import Banner from '@/components/pages/home/Banner/Banner';
import ProductByCategory from '../productByCategory/Sidebar/sidebar_category';

function HomePage() {
  return (
    <div>
      <Banner />
        <div>
          <ProductByCategory/>
        </div>
    </div>
  )
}

export default HomePage;
