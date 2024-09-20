import React, { useState, useEffect } from "react";

import { useFetchStores } from "@/hooks/useFetchStores";
import ShopImageSlider from "@/components/LandingPage/ShopImageSlider";
import ImageSliderBackground from "@/components/LandingPage/ImageSliderBackground";

const SynchronizedImageSlider: React.FC = () => {
  const { data: stores } = useFetchStores();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (stores && stores.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % stores.length);
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [stores]);

  if (!stores || stores.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <ImageSliderBackground
        height="275px"
        currentImageIndex={currentImageIndex}
        stores={stores}
      />
      <ShopImageSlider currentImageIndex={currentImageIndex} />
    </div>
  );
};

export default SynchronizedImageSlider;
