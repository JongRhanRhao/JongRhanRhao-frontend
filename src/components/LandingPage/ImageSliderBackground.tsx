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

  return (
    <div
      className="absolute top-0 left-0 right-0 z-0"
      style={{
        height,
        backgroundImage: `url(${currentStore.image_url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(10px)",
        transform: "scale(1.1)",
      }}
    />
  );
};

export default ImageSliderBackground;
