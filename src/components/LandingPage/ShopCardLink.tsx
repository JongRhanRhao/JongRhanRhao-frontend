import React from "react";

import { Store } from "@/hooks/useFetchStores";
import ShopCard from "@/components/LandingPage/ShopCard";
import { Link } from "react-router-dom";
import { STORE_AVAILABILITY_STATUS } from "@/lib/variables";
import { useTranslation } from "react-i18next";

export const ShopCardLink = React.memo(({ store }: { store: Store }) => {
  const { t } = useTranslation();
  return (
    <Link to={`/shop/${store.store_id}`}>
      <ShopCard
        id={store.store_id}
        image={store.image_url || ""}
        title={store.shop_name}
        storeStatus={store.status}
        open_timebooking={store.open_timebooking}
        reservationStatus={
          store.status === "Available"
            ? t(STORE_AVAILABILITY_STATUS.AVAILABLE)
            : store.status === "Busy"
            ? t(STORE_AVAILABILITY_STATUS.BUSY)
            : t(STORE_AVAILABILITY_STATUS.CLOSE)
        }
        rating={store.rating}
        type={store.type}
        description={store.description || ""}
        className="rounded"
      />
    </Link>
  );
});
