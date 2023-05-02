import React from 'react';

type PaginationButtonT = {
  slideNumber: number,
  currentSlideNumber: number,
  onClick: (slideNumber: number) => void,
}

export default function PaginationButton({
  slideNumber, currentSlideNumber, onClick,
}: PaginationButtonT) {
  const handlePaginationButton = () => {
    onClick(slideNumber);
  };

  const isActive = slideNumber === currentSlideNumber;
  const className = isActive ? 'swiper-pagination__button swiper-pagination__button_active' : 'swiper-pagination__button';

  return (
    <button
      aria-label={`Slide ${slideNumber}`}
      id={String(slideNumber)}
      disabled={isActive}
      className={className}
      type="button"
      onClick={handlePaginationButton}
    />
  );
}
