import BackHomeButton from "@/components/shared/BackHomeButton";
import { useUser } from "@/hooks/useUserStore";
import { useFetchReservations } from "@/hooks/useFetchReservations";

const Reservations = () => {
  const user = useUser();
  const { isAuthenticated } = user;
  const { data, isLoading, error } = useFetchReservations({
    type: "customer",
    id: user.user?.userId?.toString() || "",
  });

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-xl text-text">
        You need to log in to view this page.
        <BackHomeButton className="mt-5 text-primary" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto space-x-2 space-y-4">
        <div className="text-xl font-bold text-text">Reservations</div>
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-secondary">
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                id reservation
              </th>
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                shop name
              </th>
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                date & time
              </th>
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-bg">
            <tr>
              <td className="px-6 py-4 ">
                <span className="loading loading-ring loading-lg text-primary"></span>
              </td>
              <td className="px-6 py-4 ">
                <span className="loading loading-ring loading-lg text-primary"></span>
              </td>
              <td className="px-6 py-4 ">
                <span className="loading loading-ring loading-lg text-primary"></span>
              </td>
              <td className="px-6 py-4 ">
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
      <div className="flex flex-col items-center justify-center h-full text-2xl text-text mt-14">
        Something went wrong, please try again later.
        <BackHomeButton className="mt-5 text-primary" />
      </div>
    );
  }
  // TODO: Add refresh button, control button
  return (
    <div className="container mx-auto">
      <div className="mb-4 text-xl font-bold text-text">Reservations</div>
      <table className="table w-full table-fixed">
        <thead>
          <tr className="bg-secondary">
            <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
              id reservation
            </th>
            <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
              shop name
            </th>
            <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
              date & time
            </th>
            <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
              Status
            </th>
            <th className="w-1/4 font-bold text-left uppercase text-text"></th>
          </tr>
        </thead>
        <tbody className="bg-secondary text-text">
          {Array.isArray(data) &&
            data.map((data) => (
              <tr key={data.reservation_id}>
                <td className="px-6 py-4 border-b border-neutral-500">
                  {data.reservation_id}
                </td>
                <td className="px-6 py-4 truncate border-b border-neutral-500">
                  {data.shop_name}
                </td>
                <td className="px-6 py-4 border-b border-neutral-500">
                  {data.reservation_date}, {data.reservation_time}
                </td>
                <td className="px-6 py-4 border-b border-neutral-500">
                  <span className="px-2 py-1 text-sm text-white bg-green-500 rounded-full">
                    {data.reservation_status}
                  </span>
                </td>
                <td className="border-b border-neutral-500">
                  <a
                    href={`/shop/${data.shop_id}`}
                    className="underline text-primary"
                  >
                    View Shop
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservations;
