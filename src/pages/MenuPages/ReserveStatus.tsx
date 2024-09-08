import BackHomeButton from "@/components/shared/BackHomeButton";
import { useUser } from "@/contexts/UserContext";
import { SERVER_URL } from "@/lib/helpers/environment";
import { Reservations } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ReservationStatus = () => {
  const user = useUser();
  const userId = user.user?.userId;
  const { data, isLoading, error } = useQuery({
    queryKey: ["reservations"],
    queryFn: () =>
      axios
        .get(`${SERVER_URL}/stores/api/reservations/customer/${userId}`)
        .then((res) => res.data),
  });

  if (isLoading) {
    return (
      <div className="p-4 space-x-2 space-y-4">
        <div className="text-text text-3xl font-bold">Manage Reservations</div>
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-secondary">
              <th className="w-1/4 py-4 px-6 text-left text-text font-bold uppercase">
                id reservation
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-text font-bold uppercase">
                shop name
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-text font-bold uppercase">
                date & time
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-text font-bold uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-bg">
            <tr>
              <td className="py-4 px-6 ">
                <span className="loading loading-ring loading-lg text-primary"></span>
              </td>
              <td className="py-4 px-6 ">
                <span className="loading loading-ring loading-lg text-primary"></span>
              </td>
              <td className="py-4 px-6 ">
                <span className="loading loading-ring loading-lg text-primary"></span>
              </td>
              <td className="py-4 px-6 ">
                <span className="loading loading-ring loading-lg text-primary"></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-2xl flex justify-center items-center h-full flex-col">
        Something went wrong, please try again later.
        <BackHomeButton className="mt-5 text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 space-x-2 space-y-4">
      <div className="text-text text-3xl font-bold">Manage Reservations</div>
      <table className="w-full table-fixed">
        <thead>
          <tr className="bg-secondary">
            <th className="w-1/4 py-4 px-6 text-left text-text font-bold uppercase">
              id reservation
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-text font-bold uppercase">
              shop name
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-text font-bold uppercase">
              date & time
            </th>
            <th className="w-1/4 py-4 px-6 text-left text-text font-bold uppercase">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-secondary">
          {data.map((data: Reservations) => (
            <tr key={data.reservation_id}>
              <td className="py-4 px-6 border-b border-neutral-500">
                {data.reservation_id}
              </td>
              <td className="py-4 px-6 truncate border-b border-neutral-500">
                {data.shop_name}
              </td>
              <td className="py-4 px-6 border-b border-neutral-500">
                {data.reservation_date} {data.reservation_time}
              </td>
              <td className="py-4 px-6 border-b border-neutral-500">
                <span className="bg-green-500 text-white py-1 px-2 rounded-full text-sm">
                  {data.reservation_status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationStatus;
