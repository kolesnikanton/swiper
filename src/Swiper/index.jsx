/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';

import './index.css';

let isMoving = false;
let startingClientX = 0;
let distanceSwiped = 0;

// TODO: Need to optimize
export default function Swiper({
  children,
}) {
  const [paginationData, setPaginationData] = useState({
    currentSlide: 1,
  });

  const [slideWidth, setWidth] = useState(null);

  const containerRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    setWidth(containerRef.current.parentElement.clientWidth);
  }, []);

  const slidesNumber = children.length;
  const maxDistanceToSwipe = slideWidth * (children.length - 1);

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
    swiperRef.current.style.transition = 'transform 0s';
  };

  const getCurrentSlide = () => Math.round(distanceSwiped / slideWidth);

  const roundSlide = ({ currentSlide }) => {
    const currentSlideDistance = currentSlide * slideWidth;

    swiperRef.current.style.transition = 'transform 0.2s';
    swiperRef.current.style.transform = `translate(${-currentSlideDistance}px, 0px)`;
    distanceSwiped = currentSlideDistance;
  };

  const handleSwipeEnd = () => {
    isMoving = false;
    const currentSlide = getCurrentSlide();
    roundSlide({ currentSlide });
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

  // const handleSwipeButton = ({ direction }) => {
  //   let distance = distanceSwiped + slideWidth;

  //   if (direction === 'left') {
  //     distance = distanceSwiped - slideWidth;
  //   }

  //   if (distance > maxDistanceToSwipe || distance < 0) {
  //     return;
  //   }

  //   swiperRef.current.style.transform = `translate(${-distance}px, 0px)`;
  //   distanceSwiped = distance;

  //   const currentSlide = getCurrentSlide();
  //   setPaginationData({ currentSlide: currentSlide + 1 });
  // };

  // const handleRightButton = () => {
  //   handleSwipeButton({ direction: 'right' });
  // };

  // const handleLeftButton = () => {
  //   handleSwipeButton({ direction: 'left' });
  // };

  const handlePaginationButton = (slideNumber) => {
    swiperRef.current.style.transition = 'transform 0.8s ease-in';
    const distance = slideWidth * (slideNumber - 1);
    swiperRef.current.style.transform = `translate(${-distance}px, 0px)`;

    distanceSwiped = distance;
    setPaginationData({ currentSlide: slideNumber });
  };

  const renderPagination = () => {
    const buttons = [];

    for (let i = 0; i < slidesNumber; i++) {
      const slideNumber = i + 1;
      const isActiveButton = slideNumber === paginationData.currentSlide;
      const className = isActiveButton ? 'pagination__button pagination__button_active' : 'pagination__button';
      buttons.push(
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button id={slideNumber} disabled={isActiveButton} className={className} type="button" key={slideNumber} onClick={() => handlePaginationButton(slideNumber)} />,
      );
    }

    return buttons;
  };

  return (
    <>
      <div ref={containerRef} className="container">
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
          style={{ transform: 'translate(0, 0)', transition: 'transform 0s' }}
        >
          {children.map((child, index) => (
            <div key={index} className="template">
              {child}
            </div>
          ))}
        </div>
      </div>
      {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button type="button" onClick={handleLeftButton}>Left</button>
        <div>
          {paginationData.currentSlide}
          /
          {slidesNumber}
        </div>
        <button type="button" onClick={handleRightButton}>Right</button>
      </div> */}
      <div className="pagination">
        {renderPagination()}
      </div>
    </>
  );
}
