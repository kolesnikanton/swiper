/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';

import styles from './index.css';

let isMoving = false;
let startingClientX = 0;
let distanceSwiped = 0;
let slideIndex = 0;

export default function Swiper({ children }) {
  const SLIDE_WIDTH = 520;
  const swiperRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);

  const handleStart = (event) => {
    isMoving = true;
    startingClientX = event.nativeEvent.clientX;
  };

  const handleEnd = () => {
    if (isMoving) {
      isMoving = false;
      slideIndex += 1;
    }
  };

  const handleSwipe = (event) => {
    if (isMoving) {
      const { clientX } = event.nativeEvent;
      const distance = clientX - startingClientX;

      let translateValue = SLIDE_WIDTH * slideIndex;

      distanceSwiped = distance;

      console.log({ distanceSwiped, clientX, startingClientX });

      translateValue -= distanceSwiped;

      swiperRef.current.style.transform = `translate(-${translateValue}px, 0px)`;
    }
  };

  const handleRightButton = () => {
    const currentTranslateX = translateX - SLIDE_WIDTH;
    setTranslateX(currentTranslateX);
    swiperRef.current.style.transform = `translate(${currentTranslateX}px, 0px)`;
  };

  const handleLeftButton = () => {
    const currentTranslateX = translateX + SLIDE_WIDTH;
    setTranslateX(currentTranslateX);
    swiperRef.current.style.transform = `translate(${currentTranslateX}px, 0px)`;
  };

  return (
    <>
      <div className={styles.container}>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          className={styles.swiper}
          onMouseMove={handleSwipe}
          onMouseUp={handleEnd}
          onMouseDown={handleStart}
          ref={swiperRef}
        >
          {children.map((child, index) => (
            <div key={index} className={styles.template}>{child}</div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button type="button" onClick={handleLeftButton}>Left</button>
        <button type="button" onClick={handleRightButton}>Right</button>
      </div>
    </>
  );
}
