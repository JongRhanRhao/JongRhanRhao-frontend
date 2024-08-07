import Dashboard from "@/components/MenuPages/Dashboard";
import Favorite from "@/components/MenuPages/Favorite";
import Message from "@/components/MenuPages/Message";
import ReserveStatus from "@/components/MenuPages/ReserveStatus";
import StoreManagement from "@/components/MenuPages/StoreManagement";

interface ContentProps {
  selectedItem: string;
}

const Content: React.FC<ContentProps> = ({ selectedItem }) => {
  const renderContent = () => {
    switch (selectedItem) {
      case "Item 1":
        return (
          <div>
            <Dashboard />
          </div>
        );
      case "Item 2":
        return (
          <div>
            <Favorite />
          </div>
        );
      case "Item 3":
        return (
          <div>
            <Message />
          </div>
        );
      case "Item 4":
        return (
          <div>
            <ReserveStatus />
          </div>
        );
      case "Item 5":
        return (
          <div>
            <StoreManagement />
          </div>
        );
      case "Item 6":
        return <div>Setting Content</div>;
      default:
        return <div>Default Content</div>;
    }
  };

  return <div>{renderContent()}</div>;
};

export default Content;
