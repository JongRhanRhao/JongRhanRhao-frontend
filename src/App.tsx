import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import RootLayout from "@/pages/RootLayout";
import ShopDescription from "@/components/shared/ShopDescription";

function App() {
  const [selectedItem, setSelectedItem] = useState("Item 1");

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <RootLayout
              selectedItem={selectedItem}
              onItemClick={handleItemClick}
            />
          }
        />
        <Route
          path="/shop/:id"
          element={
            <ShopDescription
              selectedItem={selectedItem}
              onItemClick={handleItemClick}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
