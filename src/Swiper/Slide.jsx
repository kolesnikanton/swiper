import React from 'react';

export default class Slide extends React.PureComponent {
  render() {
    const { slide } = this.props;
    return (
      <div className="swiper-slide">
        {slide}
      </div>
    );
  }
}
