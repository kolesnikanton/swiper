import React from 'react';
import ReactDOM from 'react-dom';

import Swiper from './Swiper';

function TestContainer() {
  return (
    <div style={{ width: '1000px', margin: '0 auto' }}>
      <Swiper>
        <img
          alt="text"
          src="https://www.apple.com/newsroom/images/product/fitness-plus/Apple_fitness-plus-winter-update_TTR-london_big_carousel.jpg.large_2x.jpg"
        />
        <img
          alt="text"
          src="https://www.apple.com/newsroom/images/product/fitness-plus/Apple_fitness-plus-winter-update_collections-yoga_big_carousel.jpg.large_2x.jpg"
        />
        <div style={{ background: 'grey' }}>
          <h1>lalallalalala</h1>
          <p>lalallalalala</p>
          <p>aldldaladladlad</p>
        </div>
      </Swiper>
    </div>
  );
}

ReactDOM.render(<TestContainer />, document.getElementById('main'));
