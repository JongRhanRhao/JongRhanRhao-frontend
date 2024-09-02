import SearchBar from "@/components/shared/SearchBar";
import PopularStoreList from "@/components/shared/PopularStoreList";
import ShopImageSlider from "@/components/shared/ShopImageSlider";

const DashboardContent = () => {
  return (
    <div className="space-y-4">
      <SearchBar />
      <ShopImageSlider />
      <PopularStoreList />
    </div>
  );
};

export default DashboardContent;
