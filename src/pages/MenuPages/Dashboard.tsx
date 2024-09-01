import Card from "@/components/shared/HeaderCard";
import SearchBar from "@/components/shared/SearchBar";
import PopularStoreList from "@/components/shared/PopularStoreList";
import SeatAvailableStoreList from "@/components/shared/SeatAvailableStoreList";

const DashboardContent = () => {
  return (
    <div className="space-y-4">
      <SearchBar />
      <Card
        title="Dashboard"
        description="Welcome to dashboard. Here you can see available store and seat status."
        imageSrc="https://png.pngtree.com/png-vector/20220616/ourmid/pngtree-drunk-santa-claus-cartoon-character-with-two-mugs-of-beer-png-image_5090275.png"
      />
      <PopularStoreList />
      <SeatAvailableStoreList />
    </div>
  );
};

export default DashboardContent;
