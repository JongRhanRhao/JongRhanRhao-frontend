import Card from "@/components/shared/HeaderCard";
import SearchBar from "@/components/shared/SearchBar";
import PopularStoreList from "@/components/shared/PopularStoreList";
import SeatAvailableStoreList from "@/components/shared/SeatAvailableStoreList";

const DashboardContent = () => {
  return (
    <div className="space-y-4 mt-5 p-4">
      <SearchBar />
      <Card
        title="Dashboard"
        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam eligendi enim, quos soluta eveniet obcaecati? Ex iste aliquid in eveniet?"
        imageSrc="https://www.freeiconspng.com/thumbs/minions-png/evil-minions-png-24.png"
      />
      <PopularStoreList />
      <SeatAvailableStoreList />
    </div>
  );
};

export default DashboardContent;
