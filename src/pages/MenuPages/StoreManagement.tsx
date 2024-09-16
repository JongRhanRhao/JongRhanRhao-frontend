import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useUser } from "@/hooks/useUserStore";
import { STORE_MGMT_MENU } from "@/lib/variables";
import ReservationsManagement from "@/components/StoreManagementPage/ReservationsManagement";
import StaffManagement from "@/components/StoreManagementPage/StaffManagement";
import StoreStatus from "@/components/StoreManagementPage/StoreStatus";
import StoreSelector from "@/components/StoreManagementPage/StoreSelector";
import { FilterButton } from "@/components/shared/FilterButton";
import { Store } from "@/hooks/useFetchStores";
import LinkBack from "@/components/shared/LinkBack";

const StoreManagement = () => {
  const { user } = useUser();
  const role = user?.role;
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(
    STORE_MGMT_MENU.RESERVATIONS
  );
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const { t } = useTranslation();

  const handleTypeClick = useCallback((title: string) => {
    setSelectedType(title);
  }, []);

  const handleStoreSelect = useCallback((store: Store | null) => {
    setSelectedStore(store);
    setSelectedType(STORE_MGMT_MENU.RESERVATIONS);
  }, []);

  useEffect(() => {
    if (role !== "owner" && role !== "staff") {
      navigate("/");
    }
  }, [role, navigate]);

  const renderActiveSection = () => {
    switch (selectedType) {
      case STORE_MGMT_MENU.RESERVATIONS:
        return <ReservationsManagement store={selectedStore} />;
      case STORE_MGMT_MENU.STORE:
        return <StoreStatus store={selectedStore} />;
      case STORE_MGMT_MENU.STAFF:
        return <StaffManagement store={selectedStore} />;
      default:
        return null;
    }
  };

  return (
    <>
      <LinkBack />
      <span className="mb-5 text-2xl font-bold text-text">
        {t("storeManagement")}
      </span>
      <p className="mt-2 text-sm text-text">
        {t("storeManagementDesc")}
      </p>
      <div className="flex items-center mt-4 shadow-lg w-fit rounded-xl bg-secondary">
        <StoreSelector
          userId={user?.userId?.toString() || ""}
          className="font-bold rounded text-text select bg-secondary"
          onStoreSelect={handleStoreSelect}
        />
      </div>
      <div className="flex flex-wrap gap-2 mt-4 mb-4">
        {Object.values(STORE_MGMT_MENU).map((title) => (
          <FilterButton
            key={title}
            onClick={handleTypeClick}
            title={title}
            selectedTitle={selectedType}
            className="flex-grow sm:flex-grow-0"
          />
        ))}
      </div>
      <div className="mt-2">
        {selectedStore ? (
          renderActiveSection()
        ) : (
          <p className="text-text">{t('pleaseSelectYourStore')}</p>
        )}
      </div>
    </>
  );
};

export default StoreManagement;
