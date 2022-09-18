/* eslint-disable react/prop-types */
import React from 'react';

export default function PaginationButton({
  slideNumber, currentSlideNumber, onClick,
}) {
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

  //   const currentSlide = getRoundedSlideNumber();
  //   setPaginationData({ currentSlide: currentSlide + 1 });
  // };

  // const handleRightButton = () => {
  //   handleSwipeButton({ direction: 'right' });
  // };

  // const handleLeftButton = () => {
  //   handleSwipeButton({ direction: 'left' });
  // };

  /*
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <button type="button" onClick={handleLeftButton}>Left</button>
    <div>
      {paginationData.currentSlide}
      /
      {slidesNumber}
    </div>
    <button type="button" onClick={handleRightButton}>Right</button>
  </div>
  */

  const handlePaginationButton = () => {
    onClick(slideNumber);
  };

  const isActive = slideNumber === currentSlideNumber;
  const className = isActive ? 'pagination__button pagination__button_active' : 'pagination__button';

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      id={slideNumber}
      disabled={isActive}
      className={className}
      type="button"
      onClick={handlePaginationButton}
    />
  );
}
