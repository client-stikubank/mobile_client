import React, { useEffect, useState } from "react";
import { Image as ExpoImage, ImageProps as ExpoImageProps } from "expo-image";
import { Image as RNImage } from "react-native";
import { getImageAspectRatioAndHeight } from "../utils/image";

interface AutoHeightImageProps
  extends Omit<ExpoImageProps, "style" | "source"> {
  source: any;
  width: number;
  style?: any;
}

const AutoHeightImage: React.FC<AutoHeightImageProps> = ({
  source,
  width,
  style,
  ...rest
}) => {
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    if (source && source.uri) {
      // Remote image
      RNImage.getSize(
        source.uri,
        (originalWidth, originalHeight) => {
          const aspectRatio = originalWidth / originalHeight;
          setHeight(width / aspectRatio);
        },
        (error) => {
          console.warn("Failed to get image size", error);
          setHeight(width); // fallback: square
        }
      );
    } else if (source) {
      // Local asset
      const { height: calculatedHeight } = getImageAspectRatioAndHeight(
        source,
        width
      );
      setHeight(calculatedHeight);
    }
  }, [source, width]);

  if (height == null) return null; // or a placeholder/spinner

  return (
    <ExpoImage source={source} style={[{ width, height }, style]} {...rest} />
  );
};

export default AutoHeightImage;
