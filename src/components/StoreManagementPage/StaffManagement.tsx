import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { useFetchStaffList } from "@/hooks/useFetchStaffList";
import { Store } from "@/hooks/useFetchStores";
import { ERROR_TEXT, SERVER_URL } from "@/lib/variables";
import BackHomeButton from "@/components/shared/BackHomeButton";

const StaffManagement = ({ store }: { store: Store | null }) => {
  const {
    data: staff,
    isLoading,
    error,
    refetch,
  } = useFetchStaffList({
    storeId: store?.store_id || "",
  });
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="space-x-2 space-y-4">
        <table className="table w-full table-fixed">
          <thead>
            <tr className="bg-secondary">
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                {t("name")}
              </th>
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                {t("E-mail")}/{t("phone")}
              </th>
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                {t("Role")}
              </th>
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                {t("status")}
              </th>
              <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
                {t("action")}
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
      <div className="flex flex-col items-center justify-center h-full text-2xl text-text mt-14">
        {ERROR_TEXT}
        <BackHomeButton className="mt-5 text-primary" />
      </div>
    );
  }

  const handleDelete = async (staffId: string, storeId: string) => {
    await axios.delete(`${SERVER_URL}/stores/api/stores/${storeId}/staff`, {
      data: {
        storeId,
        staffId,
      },
    });
    refetch();
  };

  const updateDeleteStatus = (staffId: string) => {
    toast.promise(handleDelete(staffId, store?.store_id || ""), {
      loading: t("Deleting..."),
      success: t("Deleted successfully"),
      error: t("Something went wrong. Please try again."),
    });
  };

  return (
    <div className="space-x-2 space-y-4">
      <table className="table w-full table-fixed">
        <thead>
          <tr className="bg-secondary">
            <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
              {t("Name")}
            </th>
            <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
              {t("E-mail")}/{t("phone")}
            </th>
            <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
              {t("Role")}
            </th>
            <th className="w-1/4 px-6 py-4 font-bold text-left uppercase text-text">
              {t("action")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-secondary text-text">
          {Array.isArray(staff) && staff.length > 0 ? (
            staff.map((s, index) => (
              <tr key={s.userId || index} className="bg-bg">
                <td className="px-6 py-4">{s.userName}</td>
                <td className="px-6 py-4">{s.userEmail}</td>
                <td className="px-6 py-4">{s.role}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      updateDeleteStatus(s.userId.toString());
                    }}
                    className="uppercase btn btn-xs btn-outline text-rose-500 hover:border-rose-500 hover:text-rose-500 hover:bg-rose-500/50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center">
                {t("No staff found for this store.")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StaffManagement;
