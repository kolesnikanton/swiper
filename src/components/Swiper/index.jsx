/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useRef } from 'react';

import styles from './index.css';

let isMoving = false;
let startingClientX = 0;
let distanceSwiped = 0;

export default function Swiper({ children }) {
  const SLIDE_WIDTH = 500;
  const swiperRef = useRef(null);
  const maxDistanceToSwipe = SLIDE_WIDTH * (children.length - 1);

  const handleStart = (event) => {
    isMoving = true;
    startingClientX = event.nativeEvent.clientX + distanceSwiped;
  };

  const getCurrentSlide = () => Math.round(distanceSwiped / SLIDE_WIDTH);

  const roundSlide = () => {
    const currentSlide = getCurrentSlide();
    const currentSlideDistance = currentSlide * SLIDE_WIDTH;

    while (currentSlideDistance !== distanceSwiped) {
      if (currentSlideDistance > distanceSwiped) {
        distanceSwiped += 1;
      } else {
        distanceSwiped -= 1;
      }

      swiperRef.current.style.transform = `translate(${-distanceSwiped}px, 0px)`;
    }
  };

  const handleEnd = () => {
    isMoving = false;
    roundSlide();
  };

  const handleSwipe = (event) => {
    if (!isMoving) {
      return;
    }

    const { clientX } = event.nativeEvent;
    const distance = startingClientX - clientX;

    if (distance < -50 || distance > maxDistanceToSwipe + 50) {
      handleEnd();
    }

    swiperRef.current.style.transform = `translate(${-distance}px, 0px)`;
    distanceSwiped = distance;
  };

  const handleSwipeButton = ({ direction }) => {
    let currentTranslateX = distanceSwiped + SLIDE_WIDTH;

    if (direction === 'left') {
      currentTranslateX = distanceSwiped - SLIDE_WIDTH;
    }

    if (currentTranslateX > maxDistanceToSwipe || currentTranslateX < 0) {
      return;
    }

    while (currentTranslateX !== distanceSwiped) {
      if (currentTranslateX > distanceSwiped) {
        distanceSwiped += 1;
      } else {
        distanceSwiped -= 1;
      }

      swiperRef.current.style.transform = `translate(${-distanceSwiped}px, 0px)`;
    }
  };

  const handleRightButton = () => {
    handleSwipeButton({ direction: 'right' });
  };

  const handleLeftButton = () => {
    handleSwipeButton({ direction: 'left' });
  };

  const handleTouchMove = (event) => {
    const clientX = Math.round(event.touches[0].clientX);

    const distance = startingClientX - clientX;

    console.log(clientX, distance);

    // if (distance < -50 || distance > maxDistanceToSwipe + 50) {
    //   handleEnd();
    // }

    // swiperRef.current.style.transform = `translate(${-distance}px, 0px)`;
    // distanceSwiped = distance;
  };

  return (
    <>
      <div className={styles.container}>
        {/*
          eslint-disable-next-line
          jsx-a11y/no-static-element-interactions,
          jsx-a11y/mouse-events-have-key-events
        */}
        <div
          className={styles.swiper}
          onMouseDown={handleStart}
          onMouseMove={handleSwipe}
          onMouseUp={handleEnd}
          onMouseOut={handleEnd}
          // onTouchStart={handleStart}
          // onTouchMove={handleTouchMove}
          // onTouchEnd={handleEnd}
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
