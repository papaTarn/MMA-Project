import React from 'react';
import Recommend from "./Recommend/Recommend"
import Banner from './Banner/Banner';
import Category from './Category/Category';

function HomePage() {
  return (
    <div>
      <Banner />
      <div className="mx-60">
        <Category />
        <Recommend />
      </div>
    </div>
  )
}

export default HomePage;
