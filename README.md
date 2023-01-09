# Swiper
Lightweight react desktop/mobile swiper

## Demo
See demo [HERE](https://antonkolesnik.com/swiper/)

## Installation

#### Install with NPM
```
npm install @antonkolesnik/swiper
```
#### Install with Yarn
```
yarn add @antonkolesnik/swiper
```

## Usage example

```js
import Swiper from '@antonkolesnik/swiper';

const Demo = () => (
  <div style={{ width: '600px', margin: '0 auto' }}>
    <Swiper>
      <h1 style={{ background: 'black', color: 'white' }}>Slide 1</h1>
      <img src="https://antonkolesnik.com/38df7b2ad210d02fbd81.jpg" />
      <img src="https://antonkolesnik.com/ab52dae85dcb5a8277e8.jpg" />
    </Swiper>
  </div>
);
```