import { Image as RNImage } from "react-native";

/**
 * Given an image source and a desired width, returns the aspect ratio and calculated height.
 * @param source - The image source (require or { uri })
 * @param width - The desired width for the image
 * @returns { aspectRatio: number, height: number, originalWidth: number, originalHeight: number }
 */
export function getImageAspectRatioAndHeight(
  source: any,
  width: number
): {
  aspectRatio: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
} {
  const { width: originalWidth, height: originalHeight } =
    RNImage.resolveAssetSource(source);
  const aspectRatio = originalWidth / originalHeight;
  const height = width / aspectRatio;
  return { aspectRatio, height, originalWidth, originalHeight };
}
