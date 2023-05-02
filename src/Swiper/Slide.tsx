import React from 'react';

type SlideT = {
  slide: React.ReactElement,
}

export default class Slide extends React.PureComponent<SlideT> {
  render() {
    const { slide } = this.props;
    return (
      <div className="swiper-slide">
        {slide}
      </div>
    );
  }
}
