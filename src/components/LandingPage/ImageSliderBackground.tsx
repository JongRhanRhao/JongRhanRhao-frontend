import React from "react";

import { Store } from "@/hooks/useFetchStores";

interface ImageSliderBackgroundProps {
  height: string;
  currentImageIndex: number;
  stores: Store[];
}

const ImageSliderBackground: React.FC<ImageSliderBackgroundProps> = ({
  height,
  currentImageIndex,
  stores,
}) => {
  if (
    !stores ||
    stores.length === 0 ||
    currentImageIndex < 0 ||
    currentImageIndex >= stores.length
  ) {
    return null;
  }

  const currentStore = stores[currentImageIndex];
  const currentImage = currentStore?.image_url || "";
  return (
    <div
      className="absolute top-0 left-0 right-0 z-0 bg-center bg-cover scale-100 blur-lg duration-500 ease-in transform"
      style={{
        height,
        backgroundImage: `url(${currentImage ? currentImage : ""})`,
      }}
    />
  );
};

export default ImageSliderBackground;
