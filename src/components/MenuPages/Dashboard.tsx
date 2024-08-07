import Card from "@/components/shared/HeaderCard";
import SearchBar from "@/components/shared/SearchBar";
import PopularStoreList from "@/components/shared/PopularStoreList";

const DashboardContent = () => {
  return (
    <div className="space-y-2 mt-5">
      <SearchBar />
      <Card
        title="Dashboard"
        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam eligendi enim, quos soluta eveniet obcaecati? Ex iste aliquid in eveniet?"
        imageSrc="https://www.freeiconspng.com/thumbs/minions-png/evil-minions-png-24.png"
      />
      <PopularStoreList />
    </div>
  );
};

export default DashboardContent;
