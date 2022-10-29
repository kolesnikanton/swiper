import React from 'react';

export default function PaginationButton({
  slideNumber, currentSlideNumber, onClick,
}) {
  const handlePaginationButton = () => {
    onClick(slideNumber);
  };

  const isActive = slideNumber === currentSlideNumber;
  const className = isActive ? 'swiper-pagination__button swiper-pagination__button_active' : 'swiper-pagination__button';

  return (
    <button
      aria-label={`Slide ${slideNumber}`}
      id={slideNumber}
      disabled={isActive}
      className={className}
      type="button"
      onClick={handlePaginationButton}
    />
  );
}
