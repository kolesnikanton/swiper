import React from 'react';
import TestRenderer from 'react-test-renderer';
import Swiper from '..';

test('render', () => {
  const component = TestRenderer.create(
    <Swiper>
      <img
        alt="1"
        src="https://antonkolesnik.com/38df7b2ad210d02fbd81.jpg"
      />
      <h1 className="slide">Slide 2</h1>
      <img
        alt="3"
        src="https://antonkolesnik.com/6ab753c0e5734915a8c9.jpg"
      />
    </Swiper>,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('render without pagination', () => {
  const component = TestRenderer.create(
    <Swiper withPagination={false}>
      <img
        alt="1"
        src="https://antonkolesnik.com/38df7b2ad210d02fbd81.jpg"
      />
      <h1 className="slide">Slide 2</h1>
      <img
        alt="3"
        src="https://antonkolesnik.com/6ab753c0e5734915a8c9.jpg"
      />
    </Swiper>,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('render with additional props', () => {
  const component = TestRenderer.create(
    <Swiper
      className="custom-class"
      onSwipeStart={() => ({})}
      onSwipe={() => ({})}
      onSwipeEnd={() => ({})}
    >
      <img
        alt="1"
        src="https://antonkolesnik.com/38df7b2ad210d02fbd81.jpg"
      />
      <h1 className="slide">Slide 2</h1>
      <img
        alt="3"
        src="https://antonkolesnik.com/6ab753c0e5734915a8c9.jpg"
      />
    </Swiper>,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
