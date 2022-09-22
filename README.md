# Swiper
Desktop/mobile slider

## Demo
See demo [HERE](https://antonkolesnik.com/swiper/)

## Installation

#### Install with Yarn
```
npm install @antonkolesnik/swiper
```
#### Install with NPM
```
yarn add @antonkolesnik/swiper
```

## Usage example

```js
import Swiper from '@antonkolesnik/swiper';

const Slider = () => (
  <div style={{ width: '1000px' }}>
    <Swiper>
      <img alt="img1" src={img1} />
      <TextComponent text={text} />
      <img alt="img2" src={img2} />
    </Swiper>
  </div>
);
```