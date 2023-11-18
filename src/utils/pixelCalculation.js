/*
 * @Author: Hugh Xie 
 * @Date: 2023-06-16 16:02:11 
 * 
 * Calculation of pixels based on screen size,
 * base width and height is equal to screen size that is provided by UI design (375*667)
 * 
 * @Last Modified by: Hugh Xie
 * @Last Modified time: 2023-09-28 10:36:17
 */


import { Dimensions, PixelRatio } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

const guidelineBaseWidth = 375
const guidelineBaseHeight = 736

const widthBaseScale = SCREEN_WIDTH / guidelineBaseWidth
const heightBaseScale = SCREEN_HEIGHT / guidelineBaseHeight

const normalize = (size, based = 'width') => {
  const newSize = (based === 'height') ? size * heightBaseScale : size * widthBaseScale
  return Math.round(PixelRatio.roundToNearestPixel(newSize))
 }

 // for width pixel
const widthPixel = (size) => {
  return normalize(size, 'width')
}

// for height pixel
const heightPixel = (size) => {
  return normalize(size, 'height')
}

// for font pixel
const fontPixel = (size) => {
  return heightPixel(size)
}

// for Margin and Padding horizontal pixel
const pixelSizeHorizontal = (size) => {
  return widthPixel(size)
}

// for Margin and Padding vertical pixel
const pixelSizeVertical = (size) => {
  return heightPixel(size)
}

export {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeHorizontal,
  pixelSizeVertical
}