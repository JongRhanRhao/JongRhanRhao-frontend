import StoreListWithFilterFeature from "@/components/LandingPage/StoreListWithFilterFeature";
import SynchronizedImageSlider from "@/components/LandingPage/SynchronizedImageSlider";

// TODO: Add location filter and selector feature e.g. by city, by district
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
