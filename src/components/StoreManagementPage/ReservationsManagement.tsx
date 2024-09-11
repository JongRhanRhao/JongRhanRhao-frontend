import { useFetchReservations } from "@/hooks/useFetchReservations";
import { Store } from "@/hooks/useFetchStores";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

const ReservationsManagement = ({ store }: { store: Store | null }) => {
  const { data, isLoading, error, refetch } = useFetchReservations({
    type: "store",
    id: store?.store_id || "",
  });

  useEffect(() => {
    if (store?.store_id) {
      refetch();
    }
  }, [store?.store_id, refetch]);

  if (!store) {
    return (
      <p className="text-text text-lg">
        Please select a store to view reservations.
      </p>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto space-x-2 space-y-4">
        <table className="w-full table-fixed table">
          <thead>
            <tr className="bg-secondary">
              <th className="w-1/4 py-4 px-6 text-left text-text font-bold uppercase">
                id reservation
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-text font-bold uppercase">
                customer id
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-text font-bold uppercase">
                date & time
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-text font-bold uppercase">
                Phone
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-text font-bold uppercase">
                Status
              </th>
            </tr>
          </thead>
        </table>
        <div className="flex justify-center">
          <span className="loading loading-ring loading-lg text-primary"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto space-x-2 space-y-4">
        <div className="text-text text-xl font-bold">Reservations</div>
        <div className="text-text text-lg">
          There was an error fetching the data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-text text-xl font-bold mb-4">
        Reservations for {store.shop_name}
      </h2>
      <table className="w-full table-fixed table">
        <thead>
          <tr className="bg-secondary">
            <th className="w-1/4 py-4 px-6 text-left text-text font-bold uppercase">
              id reservation
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-text font-bold uppercase">
              customer name
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-text font-bold uppercase">
              date & time
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-text font-bold uppercase">
              Phone
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-text font-bold uppercase">
              Status
            </th>
            <th className="w-1/4 text-left text-text font-bold uppercase"></th>
          </tr>
        </thead>
        <tbody className="bg-secondary text-text">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((data) => (
              <tr key={data.reservation_id}>
                <td className="py-4 px-6 border-b border-neutral-500">
                  {data.reservation_id}
                </td>
                <td className="py-4 px-6 truncate border-b border-neutral-500">
                  {data.user_name}
                </td>
                <td className="py-4 px-6 border-b border-neutral-500">
                  {data.reservation_date}, {data.reservation_time}
                </td>
                <td className="py-4 px-6 border-b border-neutral-500">
                  <a className="link" href={`tel:${data.phone_number}`}>
                    {data.phone_number}
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="ml-2 text-primary"
                    />
                  </a>
                </td>
                <td className="py-4 px-6 border-b border-neutral-500">
                  <span className="bg-green-500 text-white py-1 px-2 rounded-full text-sm">
                    {data.reservation_status}
                  </span>
                </td>
                <td className="border-b border-neutral-500">
                  <a
                    href={`/shop/${data.store_id}`}
                    className="text-primary underline"
                  >
                    View Shop
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-4 px-6 text-center">
                No reservations found for this store.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsManagement;
