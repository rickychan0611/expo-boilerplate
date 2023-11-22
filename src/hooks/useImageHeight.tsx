import { useState, useEffect } from 'react';
import { Image, Dimensions } from 'react-native';

const useImageHeight = (imageSource: string, containerWidth: number): number => {
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    const getImageHeight = async () => {
      try {
        const { width, height } = await getImageDimensions(imageSource);
        const calculatedHeight = (containerWidth / width) * height;
        setImageHeight(calculatedHeight);
      } catch (error) {
        console.warn('Error retrieving image height:', error);
      }
    };

    getImageHeight();
  }, [imageSource, containerWidth]);

  const getImageDimensions = (imageUri: string) => {
    return new Promise<{ width: number; height: number }>((resolve, reject) => {
      Image.getSize(
        imageUri,
        (width, height) => {
          resolve({ width, height });
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  return imageHeight;
};

export default useImageHeight;