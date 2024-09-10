import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "@/hooks/useUserStore";
import { STORE_MANAGEMENT_MENU } from "@/lib/variables";
import ReservationsList from "@/components/StoreManagementPage/ReservationsList";
import StaffManagement from "@/components/StoreManagementPage/StaffManagement";
import StoreStatus from "@/components/StoreManagementPage/StoreStatus";
import StoreSelector from "@/components/StoreManagementPage/StoreSelector";
import { FilterButton } from "@/components/shared/FilterButton";

const StoreManagement = () => {
  const { user } = useUser();
  const userRole = user?.role;
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(
    STORE_MANAGEMENT_MENU.RESERVATIONS
  );

  const handleTypeClick = useCallback((title: string) => {
    setSelectedType(title);
  }, []);

  useEffect(() => {
    if (userRole !== "owner" && userRole !== "staff") {
      navigate("/");
    }
  }, [userRole, navigate]);

  const renderActiveSection = () => {
    switch (selectedType) {
      case "Reservations":
        return <ReservationsList />;
      case "Store":
        return <StoreStatus />;
      case "Staff":
        return <StaffManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-text mb-5">Store Management</h2>
      <StoreSelector
        userId={user?.userId?.toString() || ""}
        className="p-1 bg-secondary font-bold text-text text-xl border-2 border-primary rounded"
      />
      <div className="flex flex-wrap gap-2 mb-4">
        {["Reservations", "Store", "Staff"].map((title) => (
          <FilterButton
            key={title}
            onClick={handleTypeClick}
            title={title}
            selectedTitle={selectedType}
            className="flex-grow sm:flex-grow-0"
          />
        ))}
      </div>
      <div className="mt-2">{renderActiveSection()}</div>
    </div>
  );
};

export default StoreManagement;
