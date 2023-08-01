import React, { useState, useRef } from 'react';

import SlideContainer from './SlideContainer';
import PaginationButton from './PaginationButton';

type OnSwipeT = {
  currentSlide: number,
  swipedDistance: number,
  startSwipeTime: number,
  startClientX: number,
  isSwipeRight: boolean,
}

type SwiperT = {
  children: Array<React.ReactElement>,
  className?: string,
  withPagination?: boolean,
  onSwipeStart?: (
    { event, currentSlide }: { event: React.TouchEvent | React.MouseEvent } & OnSwipeT
  ) => void,
  onSwipe?: (
    { event, currentSlide }: { event: React.TouchEvent | React.MouseEvent } & OnSwipeT
  ) => void,
  onSwipeEnd?: ({ currentSlide }: OnSwipeT) => void,
  onPaginationChange?: (
    { previousSlideNumber, slideNumber }: { previousSlideNumber: number, slideNumber: number}
  ) => void,
}

export default function Swiper({
  children, className, withPagination = true, onSwipeStart, onSwipe, onSwipeEnd, onPaginationChange,
}: SwiperT) {
  const containerRef = useRef(null);
  const swiperRef = useRef(null);
  const isMovingRef = useRef(false);
  const isSwipeRightRef = useRef(true);
  const startClientXRef = useRef(0);
  const swipedDistanceRef = useRef(0);
  const startSwipeTimeRef = useRef(0);
  const currentSlideRef = useRef(1); // To optimise

  const [paginationData, setPaginationData] = useState({
    currentSlide: currentSlideRef.current,
  });

  const slidesNumber = children.length;

  const getSlideWidth = () => {
    if (!containerRef.current) {
      return 0;
    }

    const containerEl = (containerRef.current as HTMLDivElement);
    return containerEl.parentElement ? containerEl.parentElement.clientWidth : 0;
  };

  const getMaxDistanceToSwipe = () => getSlideWidth() * (children.length - 1);
  const getRoundedSlideNumber = () => Math.round(swipedDistanceRef.current / getSlideWidth());

  const isNextSlideOut = ({ distance }: { distance: number }) => (
    distance < -100 || distance > getMaxDistanceToSwipe() + 100
  );

  const getClientX = (event: React.TouchEvent | React.MouseEvent) => {
    if ('touches' in event) {
      return Math.round(event.touches[0].clientX);
    }

    return event.nativeEvent.clientX;
  };

  const roundSlide = (
    { roundedSlide, slideWidth }: { roundedSlide: number, slideWidth: number },
  ) => {
    if (!swiperRef.current) {
      return;
    }

    const roundedSlideDistance = roundedSlide * slideWidth;

    const swiperElement = swiperRef.current as HTMLDivElement;
    swiperElement.style.transition = 'transform 0.2s';
    swiperElement.style.transform = `translate(${-roundedSlideDistance}px, 0px)`;
    swipedDistanceRef.current = roundedSlideDistance;

    if (currentSlideRef.current !== roundedSlide + 1) {
      setPaginationData({ currentSlide: roundedSlide + 1 });
      currentSlideRef.current = roundedSlide + 1;
    }
  };

  const roundSlideByShortTime = ({ slideWidth }: { slideWidth: number}) => {
    let roundedSlide = isSwipeRightRef.current
      ? Math.floor(swipedDistanceRef.current / slideWidth)
      : Math.ceil(swipedDistanceRef.current / slideWidth);

    if (roundedSlide < 0) {
      roundedSlide = 0;
    }

    if (roundedSlide >= slidesNumber) {
      roundedSlide = slidesNumber - 1;
    }

    roundSlide({ roundedSlide, slideWidth });
  };

  const handleSwipeStart = (event: React.TouchEvent | React.MouseEvent) => {
    if (!swiperRef.current) {
      return;
    }

    startSwipeTimeRef.current = Date.now();
    isMovingRef.current = true;
    const clientX = getClientX(event);
    startClientXRef.current = clientX + swipedDistanceRef.current;
    (swiperRef.current as HTMLDivElement).style.transition = 'transform 0s';

    if (onSwipeStart) {
      onSwipeStart({
        event,
        currentSlide: currentSlideRef.current,
        swipedDistance: swipedDistanceRef.current,
        startSwipeTime: startSwipeTimeRef.current,
        startClientX: startClientXRef.current,
        isSwipeRight: isSwipeRightRef.current,
      });
    }
  };

  const handleSwipeEnd = () => {
    if (!isMovingRef.current) {
      return;
    }

    isMovingRef.current = false;

    const endSwipeTime = Date.now() - startSwipeTimeRef.current;
    const slideWidth = getSlideWidth();

    if (endSwipeTime < 500) {
      roundSlideByShortTime({ slideWidth });
    } else {
      const roundedSlide = getRoundedSlideNumber();
      roundSlide({ roundedSlide, slideWidth });
    }

    if (onSwipeEnd) {
      onSwipeEnd({
        currentSlide: currentSlideRef.current,
        swipedDistance: swipedDistanceRef.current,
        startSwipeTime: startSwipeTimeRef.current,
        startClientX: startClientXRef.current,
        isSwipeRight: isSwipeRightRef.current,
      });
    }
  };

  const handleSwipe = (event: React.TouchEvent | React.MouseEvent) => {
    if (!isMovingRef.current || !swiperRef.current) {
      return;
    }

    const clientX = getClientX(event);
    const distance = startClientXRef.current - clientX;

    if (isNextSlideOut({ distance })) {
      return;
    }

    isSwipeRightRef.current = swipedDistanceRef.current > distance;

    (swiperRef.current as HTMLDivElement).style.transform = `translate(${-distance}px, 0px)`;
    swipedDistanceRef.current = distance;

    if (onSwipe) {
      onSwipe({
        event,
        currentSlide: currentSlideRef.current,
        swipedDistance: swipedDistanceRef.current,
        startSwipeTime: startSwipeTimeRef.current,
        startClientX: startClientXRef.current,
        isSwipeRight: isSwipeRightRef.current,
      });
    }
  };

  const handlePaginationButton = (slideNumber: number) => {
    if (!swiperRef.current) {
      return;
    }

    const swiperElement = swiperRef.current as HTMLDivElement;
    swiperElement.style.transition = 'transform 0.8s ease-in';
    const distance = getSlideWidth() * (slideNumber - 1);
    swiperElement.style.transform = `translate(${-distance}px, 0px)`;

    if (onPaginationChange) {
      onPaginationChange({ previousSlideNumber: currentSlideRef.current, slideNumber });
    }

    swipedDistanceRef.current = distance;
    currentSlideRef.current = slideNumber;
    setPaginationData({ currentSlide: slideNumber });
  };

  const renderPagination = () => {
    const buttons = [];

    for (let i = 0; i < slidesNumber; i++) {
      const slideNumber = i + 1;

      buttons.push(
        <PaginationButton
          key={slideNumber}
          slideNumber={slideNumber}
          currentSlideNumber={paginationData.currentSlide}
          onClick={handlePaginationButton}
        />,
      );
    }

    return buttons;
  };

  const defaultClassName = 'swiper-container';
  const classNames = className ? `${defaultClassName} ${className}` : defaultClassName;

  return (
    <>
      <div ref={containerRef} className={classNames}>
        <SlideContainer
          slides={children}
          ref={swiperRef}
          handleSwipeStart={handleSwipeStart}
          handleSwipe={handleSwipe}
          handleSwipeEnd={handleSwipeEnd}
        />
      </div>
      {
        withPagination ? (
          <div className="swiper-pagination">
            {renderPagination()}
          </div>
        ) : null
      }
    </>
  );
}
