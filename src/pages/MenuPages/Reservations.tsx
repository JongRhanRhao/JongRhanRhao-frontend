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
      <div className="text-xl text-text flex justify-center items-center mt-20 flex-col">
        You need to log in to view this page.
        <BackHomeButton className="mt-5 text-primary" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto space-x-2 space-y-4">
        <div className="text-text text-xl font-bold">Reservations</div>
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
      <div className="text-2xl text-text flex justify-center items-center h-full flex-col mt-14">
        Something went wrong, please try again later.
        <BackHomeButton className="mt-5 text-primary" />
      </div>
    );
  }
  // TODO: Add refresh button, control button
  return (
    <div className="container mx-auto">
      <div className="text-text text-xl font-bold mb-4">Reservations</div>
      <table className="w-full table-fixed table">
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
            <th className="w-1/4 text-left text-text font-bold uppercase"></th>
          </tr>
        </thead>
        <tbody className="bg-secondary text-text">
          {Array.isArray(data) &&
            data.map((data) => (
              <tr key={data.reservation_id}>
                <td className="py-4 px-6 border-b border-neutral-500">
                  {data.reservation_id}
                </td>
                <td className="py-4 px-6 truncate border-b border-neutral-500">
                  {data.shop_name}
                </td>
                <td className="py-4 px-6 border-b border-neutral-500">
                  {data.reservation_date}, {data.reservation_time}
                </td>
                <td className="py-4 px-6 border-b border-neutral-500">
                  <span className="bg-green-500 text-white py-1 px-2 rounded-full text-sm">
                    {data.reservation_status}
                  </span>
                </td>
                <td className="border-b border-neutral-500">
                  <a
                    href={`/shop/${data.shop_id}`}
                    className="text-primary underline"
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
