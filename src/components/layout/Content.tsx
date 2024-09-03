import { Routes, Route } from "react-router-dom";

import Dashboard from "@/pages/MenuPages/Dashboard";
import Favorite from "@/pages/MenuPages/Favorite";
import Message from "@/pages/MenuPages/Message";
import ReserveStatus from "@/pages/MenuPages/ReserveStatus";
import StoreManagement from "@/pages/MenuPages/StoreManagement";
import NotFoundPage from "@/pages/NotFoundPage";

const Content: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/favorite" element={<Favorite />} />
      <Route path="/message" element={<Message />} />
      <Route path="/status" element={<ReserveStatus />} />
      <Route path="/store" element={<StoreManagement />} />
      <Route path="/setting" element={<div>Setting Content</div>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Content;
