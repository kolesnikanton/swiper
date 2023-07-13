import React from 'react';

type SlideT = {
  slide: React.ReactElement,
}

function Slide({ slide }: SlideT) {
  return (
    <div className="swiper-slide">
      {slide}
    </div>
  );
}

const MemoSlide = React.memo(Slide);
export default MemoSlide;
