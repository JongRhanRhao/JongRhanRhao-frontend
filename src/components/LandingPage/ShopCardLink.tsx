import React from "react";

import { Store } from "@/hooks/useFetchStores";
import ShopCard from "@/components/LandingPage/ShopCard";
import { Link } from "react-router-dom";
import { STORE_AVAILABILITY_STATUS } from "@/lib/variables";

export const ShopCardLink = React.memo(({ store }: { store: Store }) => (
  <Link to={`/shop/${store.store_id}`} className="no-underline">
    <ShopCard
      id={store.store_id}
      image={store.image_url || ""}
      title={store.shop_name}
      reservationStatus={
        store.curr_seats < store.max_seats
          ? STORE_AVAILABILITY_STATUS.AVAILABLE
          : STORE_AVAILABILITY_STATUS.UNAVAILABLE
      }
      rating={store.rating}
      maxSeats={store.max_seats}
      currSeats={store.curr_seats}
      description={store.description || ""}
    />
  </Link>
));
