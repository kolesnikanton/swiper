import React from 'react';

import Slide from './Slide';

const SlideContainer = React.forwardRef(({
  handleSwipeStart,
  handleSwipe,
  handleSwipeEnd,
  slides,
}, swiperRef) => (
  // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
  <div
    role="presentation"
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
    {slides.map((slide, index) => (
      <Slide key={index} slide={slide} />
    ))}
  </div>
));

function propsAreEqual() {
  /*
    We don't need to rerender this component currently.
    Be attention when changing the parent component!
  */
  return true;
}

export default React.memo(SlideContainer, propsAreEqual);
