import React from 'react';
import { createRoot } from 'react-dom/client';

import Swiper from '../Swiper';

import '../Swiper/styles.css';
import './index.css';

function Demo() {
  return (
    <>
      <div style={{ width: '400px', margin: '0 auto' }}>
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
      <div style={{ width: '400px', margin: '0 auto' }}>
        <Swiper
          withPagination
          className="custom"
          onSwipeStart={(onSwipeStartData) => console.log({ onSwipeStartData })}
          onSwipe={(onSwipeData) => console.log({ onSwipeData })}
          onSwipeEnd={(onSwipeEndData) => console.log({ onSwipeEndData })}
          onPaginationChange={(onPaginationData) => console.log({ onPaginationData })}
        >
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
      <div style={{ width: '400px', margin: '0 auto' }}>
        <Swiper withPagination={false}>
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
    </>
  );
}

const main = document.getElementById('main');
if (main) {
  createRoot(main).render(<Demo />);
}
