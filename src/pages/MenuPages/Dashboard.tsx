import SearchBar from "@/components/shared/SearchBar";
import StoreListWithFilterFeature from "@/components/LandingPage/StoreListWithFilterFeature";
import ShopImageSlider from "@/components/LandingPage/ShopImageSlider";

const DashboardContent = () => {
  return (
    <>
      {/* <SearchBar /> */}
      <ShopImageSlider />
      <StoreListWithFilterFeature />
    </>
  );
};

export default DashboardContent;
