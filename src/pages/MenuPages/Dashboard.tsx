import StoreListWithFilterFeature from "@/components/LandingPage/StoreListWithFilterFeature";
import SynchronizedImageSlider from "@/components/LandingPage/SynchronizedImageSlider";

const DashboardContent = () => {
  return (
    <div className="relative">
      <SynchronizedImageSlider />
      <div className="mt-5" />
      <StoreListWithFilterFeature />
    </div>
  );
};

export default DashboardContent;
