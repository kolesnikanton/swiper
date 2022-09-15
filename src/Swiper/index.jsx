/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';

import './index.css';

let isMoving = false;
let startingClientX = 0;
let distanceSwiped = 0;

export function Swiper({
  children,
  width: SLIDE_WIDTH = 500,
  height: SLIDE_HEIGHT = 500,
}) {
  const slidesNumber = children.length;
  const maxDistanceToSwipe = SLIDE_WIDTH * (children.length - 1);

  const [paginationData, setPaginationData] = useState({
    currentSlide: 1,
  });

  const swiperRef = useRef(null);

  const getClientX = (event) => {
    if (event.touches) {
      return Math.round(event.touches[0].clientX);
    }

    return event.nativeEvent.clientX;
  };

  const handleSwipeStart = (event) => {
    isMoving = true;
    const clientX = getClientX(event);
    startingClientX = clientX + distanceSwiped;
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

  const handleSwipeEnd = () => {
    isMoving = false;
    roundSlide();
    const currentSlide = getCurrentSlide();
    setPaginationData({ currentSlide: currentSlide + 1 });
  };

  const handleSwipe = (event) => {
    if (!isMoving) {
      return;
    }

    const clientX = getClientX(event);
    const distance = startingClientX - clientX;

    if (distance < -50 || distance > maxDistanceToSwipe + 50) {
      handleSwipeEnd();
    }

    swiperRef.current.style.transform = `translate(${-distance}px, 0px)`;
    distanceSwiped = distance;
  };

  const handleSwipeButton = ({ direction }) => {
    let distance = distanceSwiped + SLIDE_WIDTH;

    if (direction === 'left') {
      distance = distanceSwiped - SLIDE_WIDTH;
    }

    if (distance > maxDistanceToSwipe || distance < 0) {
      return;
    }

    swiperRef.current.style.transform = `translate(${-distance}px, 0px)`;
    distanceSwiped = distance;

    const currentSlide = getCurrentSlide();
    setPaginationData({ currentSlide: currentSlide + 1 });
  };

  const handleRightButton = () => {
    handleSwipeButton({ direction: 'right' });
  };

  const handleLeftButton = () => {
    handleSwipeButton({ direction: 'left' });
  };

  return (
    <>
      <div className="container" style={{ width: SLIDE_WIDTH, height: SLIDE_HEIGHT }}>
        {/*
          eslint-disable-next-line
          jsx-a11y/no-static-element-interactions,
          jsx-a11y/mouse-events-have-key-events
        */}
        <div
          className="swiper"
          onMouseDown={handleSwipeStart}
          onTouchStart={handleSwipeStart}
          onMouseMove={handleSwipe}
          onTouchMove={handleSwipe}
          onMouseUp={handleSwipeEnd}
          onMouseOut={handleSwipeEnd}
          onTouchEnd={handleSwipeEnd}
          ref={swiperRef}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className="template"
              style={{
                minWidth: SLIDE_WIDTH,
                width: SLIDE_WIDTH,
                minHeight: SLIDE_HEIGHT,
                height: SLIDE_HEIGHT,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button type="button" onClick={handleLeftButton}>Left</button>
        <div>
          {paginationData.currentSlide}
          /
          {slidesNumber}
        </div>
        <button type="button" onClick={handleRightButton}>Right</button>
      </div>
    </>
  );
}

module.exports = {
  Swiper,
};
