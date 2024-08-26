import { Routes, Route } from "react-router-dom";

import Dashboard from "@/components/MenuPages/Dashboard";
import Favorite from "@/components/MenuPages/Favorite";
import Message from "@/components/MenuPages/Message";
import ReserveStatus from "@/components/MenuPages/ReserveStatus";
import StoreManagement from "@/components/MenuPages/StoreManagement";

const Content: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/message" element={<Message />} />
        <Route path="/status" element={<ReserveStatus />} />
        <Route path="/store" element={<StoreManagement />} />
        <Route path="/setting" element={<div>Setting Content</div>} />
        <Route path="*" element={<div>Default Content</div>} />
      </Routes>
    </div>
  );
};

export default Content;
