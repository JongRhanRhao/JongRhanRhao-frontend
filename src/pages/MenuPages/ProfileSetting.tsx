import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { PhoneInput } from "react-international-phone";

import LinkBack from "@/components/shared/LinkBack";
import { useUser } from "@/hooks/useUserStore";
import { CUSTOM_BUTTON_CLASS, SERVER_URL } from "@/lib/variables";
import LoginButton from "@/components/shared/LoginButton";
import LogoutButton from "@/components/shared/LogoutButton";

const ProfileSetting = () => {
  const { user, isAuthenticated } = useUser();
  const [userName, setUserName] = useState<string>(user?.userName || "");
  const [phoneNumber, setPhoneNumber] = useState<string>(
    user?.phoneNumber || ""
  );
  const { t } = useTranslation();

  if (!isAuthenticated) {
    return (
      <>
        <LinkBack />
        <div className="flex flex-col items-center justify-center mt-20 text-xl text-text">
          {t("You need to log in to view this page.")}
          <LoginButton className="mt-4" />
        </div>
      </>
    );
  }

  const handleUserUpdate = () => {
    try {
      return axios.put(`${SERVER_URL}/users/update/${user?.userId}`, {
        user_name: userName || user?.userName,
        phone_number: phoneNumber || user?.phoneNumber,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const userUpdateStatus = () => {
    toast.promise(handleUserUpdate(), {
      loading: t("Updating user..."),
      success: t("Updated successfully!"),
      error: t("Something went wrong. Please try again."),
    });
  };

  return (
    <>
      <LinkBack />
      <h1 className="text-2xl font-bold text-text">{t("Edit Profile")}</h1>
      <div className="min-w-full mt-4 shadow-xl card">
        <div className="p-6 card-body">
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src={user?.profilePicture} alt="Profile" />
              </div>
            </div>
          </div>
          <div className="w-full p-4 mt-6 text-text bg-secondary/50 rounded-xl">
            <p className="mb-2 text-sm text-text/50">{t("Name")}</p>
            <input
              type="text"
              className="w-auto mb-4 input input-md bg-secondary text-text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              maxLength={16}
            />
            <p className="text-sm text-text/50">{t("phone")}</p>
            <PhoneInput
              defaultCountry="th"
              className="mb-2 text-sm w-fit bg-secondary  text-text"
              placeholder="+66 81 234 5678"
              value={phoneNumber}
              onChange={(phone) => {
                setPhoneNumber(phone);
              }}
            />
            <div className="card-actions">
              <button
                onClick={userUpdateStatus}
                className={`min-w-fit mt-2 ${CUSTOM_BUTTON_CLASS}`}
                disabled={
                  userName === user?.userName &&
                  phoneNumber === user?.phoneNumber
                }
              >
                {t("Update")}
              </button>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSetting;
