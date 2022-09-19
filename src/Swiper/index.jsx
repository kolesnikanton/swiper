/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';

import SlideContainer from './SlideContainer';
import PaginationButton from './PaginationButton';
import './index.css';

let isMoving = false;
let startingClientX = 0;
let distanceSwiped = 0;
let startSwipeTime = 0;
let isSwipeRight = true;

export default function Swiper({
  children,
}) {
  const [paginationData, setPaginationData] = useState({
    currentSlide: 1,
  });

  const containerRef = useRef(null);
  const swiperRef = useRef(null);

  const slidesNumber = children.length;

  const getSlideWidth = () => containerRef.current?.parentElement?.clientWidth;

  const getMaxDistanceToSwipe = () => getSlideWidth() * (children.length - 1);

  const getClientX = (event) => {
    if (event.touches) {
      return Math.round(event.touches[0].clientX);
    }

    return event.nativeEvent.clientX;
  };

  const getRoundedSlideNumber = () => Math.round(distanceSwiped / getSlideWidth());

  const roundSlide = ({ roundedSlide, slideWidth }) => {
    const roundedSlideDistance = roundedSlide * slideWidth;

    swiperRef.current.style.transition = 'transform 0.2s';
    swiperRef.current.style.transform = `translate(${-roundedSlideDistance}px, 0px)`;
    distanceSwiped = roundedSlideDistance;

    if (paginationData.currentSlide !== roundedSlide + 1) {
      setPaginationData({ currentSlide: roundedSlide + 1 });
    }
  };

  const roundSlideByShortTime = ({ slideWidth }) => {
    let roundedSlide = isSwipeRight
      ? Math.floor(distanceSwiped / slideWidth)
      : Math.ceil(distanceSwiped / slideWidth);

    if (roundedSlide < 0) {
      roundedSlide = 0;
    }

    if (roundedSlide >= slidesNumber) {
      roundedSlide = slidesNumber - 1;
    }

    roundSlide({ roundedSlide, slideWidth });
  };

  const handleSwipeStart = (event) => {
    startSwipeTime = Date.now();
    isMoving = true;
    const clientX = getClientX(event);
    startingClientX = clientX + distanceSwiped;
    swiperRef.current.style.transition = 'transform 0s';
  };

  const isNextSlideOut = ({ distance }) => (
    distance < -100 || distance > getMaxDistanceToSwipe() + 100
  );

  const handleSwipeEnd = () => {
    if (!isMoving) {
      return;
    }

    isMoving = false;

    const endSwipeTime = Date.now() - startSwipeTime;
    const slideWidth = getSlideWidth();

    if (endSwipeTime < 500) {
      roundSlideByShortTime({ slideWidth });
    } else {
      const roundedSlide = getRoundedSlideNumber();
      roundSlide({ roundedSlide, slideWidth });
    }
  };

  const handleSwipe = (event) => {
    if (!isMoving) {
      return;
    }

    const clientX = getClientX(event);
    const distance = startingClientX - clientX;

    if (isNextSlideOut({ distance })) {
      return;
    }

    isSwipeRight = distanceSwiped > distance;

    swiperRef.current.style.transform = `translate(${-distance}px, 0px)`;
    distanceSwiped = distance;
  };

  const handlePaginationButton = (slideNumber) => {
    swiperRef.current.style.transition = 'transform 0.8s ease-in';
    const distance = getSlideWidth() * (slideNumber - 1);
    swiperRef.current.style.transform = `translate(${-distance}px, 0px)`;

    distanceSwiped = distance;
    setPaginationData({ currentSlide: slideNumber });
  };

  const renderPagination = () => {
    const buttons = [];

    for (let i = 0; i < slidesNumber; i++) {
      const slideNumber = i + 1;

      buttons.push(
        <PaginationButton
          slideNumber={slideNumber}
          currentSlideNumber={paginationData.currentSlide}
          key={slideNumber}
          onClick={handlePaginationButton}
        />,
      );
    }

    return buttons;
  };

  return (
    <>
      <div ref={containerRef} className="container">
        <SlideContainer
          slides={children}
          ref={swiperRef}
          handleSwipeStart={handleSwipeStart}
          handleSwipe={handleSwipe}
          handleSwipeEnd={handleSwipeEnd}
        />
      </div>
      <div className="pagination">
        {renderPagination()}
      </div>
    </>
  );
}
