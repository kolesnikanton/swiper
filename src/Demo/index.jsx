import React from 'react';
import ReactDOM from 'react-dom';

import Swiper from '../Swiper';

import './index.css';

function Demo() {
  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <Swiper>
        <img
          alt="text"
          src="https://antonkolesnik.com/38df7b2ad210d02fbd81.jpg"
        />
        <img
          alt="text"
          src="https://antonkolesnik.com/6ab753c0e5734915a8c9.jpg"
        />
        <img
          alt="text"
          src="https://antonkolesnik.com/ab52dae85dcb5a8277e8.jpg"
        />
        <h1 className="slide">Slide 4</h1>
        <img
          alt="text"
          src="https://antonkolesnik.com/ab52dae85dcb5a8277e8.jpg"
        />
        <h1 className="slide">Slide 6</h1>
      </Swiper>
    </div>
  );
}

ReactDOM.render(<Demo />, document.getElementById('main'));
