import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { PhoneInput } from "react-international-phone";

import BackHomeButton from "@/components/shared/BackHomeButton";
import LinkBack from "@/components/shared/LinkBack";
import { useUser } from "@/hooks/useUserStore";
import {
  CUSTIOM_BUTTON_OUTLINE_CLASS,
  CUSTOM_BUTTON_CLASS,
  SERVER_URL,
} from "@/lib/variables";

const ProfileSetting = () => {
  const { user, isAuthenticated } = useUser();
  const [userName, setUserName] = useState<string>(user?.userName || "");
  const [phoneNumber, setPhoneNumber] = useState<string>(
    user?.phoneNumber || ""
  );
  const [profilePicture, setProfilePicture] = useState<File>();
  const { t } = useTranslation();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-xl text-text">
        {t("You need to log in to view this page.")}
        <BackHomeButton className="mt-5 text-primary" />
      </div>
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
      loading: "Updating user...",
      success: "Updated successfully!",
      error: "Error updating, please try again.",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleUpload = async () => {
    if (!profilePicture) {
      toast.error("No file selected.");
      return Promise.reject();
    }

    const formData = new FormData();
    formData.append("profileImage", profilePicture);

    try {
      await axios.post(
        `${SERVER_URL}/users/${user?.userId}/profile-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const uploadStatus = () => {
    toast.promise(handleUpload(), {
      loading: "Uploading image...",
      success: "Image uploaded successfully!",
      error: "Error uploading image, please try again.",
    });
  };

  return (
    <>
      <div className="container mx-auto">
        <LinkBack />
        <h1 className="text-3xl font-bold text-text">{t("Edit Profile")}</h1>
      </div>
      <div className="min-w-full mt-4 shadow-xl card">
        <div className="p-6 card-body">
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src={user?.profilePicture} />
              </div>
            </div>
            <div className="flex flex-col ml-4 space-y-2">
              <input
                type="file"
                className="w-full max-w-xs file-input file-input-bordered file-input-xs bg-secondary text-text"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
              <button
                className={`btn-sm w-fit ${CUSTIOM_BUTTON_OUTLINE_CLASS}`}
                onClick={uploadStatus}
              >
                {t("Upload new photo")}
              </button>
            </div>
          </div>
          <div className="w-full p-4 mt-6 text-text bg-secondary/50 rounded-xl">
            <p className="mb-2 text-sm text-text/50">{t("Name")}</p>
            <input
              type="text"
              className="w-auto mb-4 input input-md bg-secondary text-text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
            {/* //TODO: cnx, bkk  */}
            {/* <select className="w-full mt-4 input input-md bg-secondary text-text">
              <option value="th">Thailand</option>
              <option value="en">English</option>
            </select> */}
            <div className="card-actions">
              <button
                onClick={userUpdateStatus}
                className={`btn-sm mt-4 ${CUSTOM_BUTTON_CLASS}`}
              >
                {t("Update")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSetting;
