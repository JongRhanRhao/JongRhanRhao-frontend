import { Store } from "@/hooks/useFetchStores";
import React from "react";

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
  if (!stores || stores.length === 0) {
    return null;
  }

  const currentStore = stores[currentImageIndex % stores.length];
  const currentImage = currentStore.image_url;

  return (
    <div
      className="absolute top-0 left-0 right-0 z-0 bg-cover bg-center blur-lg duration-500 ease-in transform"
      style={{
        height,
        backgroundImage: `url(${currentImage ? currentImage : ""})`,
      }}
    />
  );
};

export default ImageSliderBackground;