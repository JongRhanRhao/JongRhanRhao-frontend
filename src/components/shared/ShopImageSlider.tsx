import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ShopCard from "@/components/shared/ShopCard";
import { ShopSamepleData } from "@/SampleData/data";

const ImageSlider: React.FC = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    dots: true,
    slidesToScroll: 1,
    autoplay: true,
    speed: 750,
    cssEase: "linear",
  };

  return (
    <div className={`p-2`}>
      <Slider {...settings}>
        {ShopSamepleData.map((card) => (
          <div key={card.id}>
            <ShopCard {...card} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
