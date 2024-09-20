import React, { useState, useEffect } from "react";
import { useFetchStores } from "@/hooks/useFetchStores";

interface ImageSliderBackgroundProps {
  height: string;
}

const ImageSliderBackground: React.FC<ImageSliderBackgroundProps> = ({
  height,
}) => {
  const { data: stores } = useFetchStores();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (stores && stores.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % stores.length);
      }, 5400);

      return () => clearInterval(intervalId);
    }
  }, [stores]);

  if (!stores || stores.length === 0) {
    return null;
  }

  const currentStore = stores[currentImageIndex];

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
