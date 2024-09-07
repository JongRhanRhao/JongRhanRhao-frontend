import { Store } from "@/hooks/useFetchStores";
import React from "react";
import ShopCard from "./ShopCard";
import { Link } from "react-router-dom";

export const ShopCardLink = React.memo(({ store }: { store: Store }) => (
  <Link to={`/shop/${store.store_id}`} className="no-underline">
    <ShopCard
      id={store.store_id}
      image={store.image_url || ""}
      title={store.shop_name}
      reservationStatus={
        store.curr_seats < store.max_seats ? "can reserve" : "cannot reserve"
      }
      rating={store.rating}
      maxSeats={store.max_seats}
      currSeats={store.curr_seats}
      isFavorite={store.is_favorite}
      description={store.description || ""}
      onClick={() => {}}
    />
  </Link>
));
