# Swiper
Lightweight react desktop/mobile swiper

## Demo
See demo [HERE](https://antonkolesnik.com/swiper/)

## Installation

#### Install with NPM
```bash
npm install @antonkolesnik/swiper
```
#### Install with Yarn
```bash
yarn add @antonkolesnik/swiper
```

## Stylesheets
```js
import '@antonkolesnik/swiper/lib/styles.css';
```

## Props:
* `className`: CSS class name to style the swiper
* `withPagination (true by default)`: Enable/disable pagination
* `onSwipeStart`
* `onSwipe`
* `onSwipeEnd`
* `onPaginationChange`

## Usage example

```js
import Swiper from '@antonkolesnik/swiper';
import '@antonkolesnik/swiper/lib/styles.css';

const Demo = () => (
  <div style={{ width: '600px' }}>
    <Swiper className="custom" withPagination>
      <div style={{ background: 'black', color: 'white' }}>Slide 1</div>
      <img src="img.jpg" />
    </Swiper>
  </div>
);
```
