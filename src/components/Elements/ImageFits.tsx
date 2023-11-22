import useImageHeight from '@/src/hooks/useImageHeight';
import { useState } from 'react'
import { Image } from 'react-native'
import tw from "twrnc";

/**
 * An Image that fits the width of its container with dynamic height
 */
const ImageFits = ({ uri }: { uri: string }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };
  const imageHeight = useImageHeight(uri, containerWidth)
  return (
    <Image
      onLayout={handleLayout}
      source={{ uri }}
      style={tw`w-full h-[${imageHeight}px]`}
      resizeMode='contain'
    />
  )
}

export default ImageFits