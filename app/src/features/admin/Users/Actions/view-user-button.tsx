import { FC, useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { toast } from "react-toastify";

import { useApi } from "@common/hooks/use-api";
import { Application } from "@common/unknown/interfaces/Application";
import { ContentCreator } from "@common/unknown/interfaces/ContentCreator";
import { User } from "@user/types/user-types";
import {
  getContentCreator,
  getSingleUserDetails,
} from "@admin/api/admin-queries";
import { GetSingleCCApplication } from "@common/api/auth-queries";
import { getUserToken } from "@user/utilities/get-local-user";
import UserDetailsModal from "../details-modal-user";

interface ViewUserButtonProps {
  applicationId: string;
  onHandleStatus: () => void;
}

const ViewUserButton: FC<ViewUserButtonProps> = ({
  applicationId,
  onHandleStatus,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [userApplication, setUserApplication] = useState<{
    applicator: User;
    application: Application;
  } | null>(null);
  const [contentCreator, setContentCreator] = useState<ContentCreator | null>(
    null
  );

  const { call: fetchUserDetails, isLoading } = useApi(
    async (applicationId: string, token: string) => {
      const userDetails = await getSingleUserDetails(applicationId, token);

      const userApplication = await GetSingleCCApplication(applicationId);

      const contentCreator = await getContentCreator(applicationId, token);
      return {
        userDetails,
        userApplication: userApplication.data,
        contentCreator,
      };
    }
  );

  const handleClick = async () => {
    try {
      const token = getUserToken();
      if (token === "") {
        console.error("No token found");
        return;
      }
      const { userDetails, userApplication, contentCreator } =
        await fetchUserDetails(applicationId, token);
      setUserDetails(userDetails);
      setUserApplication(userApplication);
      setContentCreator(contentCreator);
      setIsModalOpen(true);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const refreshUserDetails = async () => {
    try {
      const token = getUserToken();
      if (token === "") {
        console.error("No token found");
        return;
      }
      const { userDetails, userApplication, contentCreator } =
        await fetchUserDetails(applicationId, token);
      setUserDetails(userDetails);
      setUserApplication(userApplication);
      setContentCreator(contentCreator);
    } catch (error) {
      console.error("Failed to refresh user details:", error);
    }
  };

  return (
    <>
      <button
        id="view-details"
        className="flex items-center justify-center p-4 bg-[#166276] rounded-full font-semibold text-base text-white hover:bg-[#164E63]"
        onClick={() => void handleClick()}
      >
        <MdRemoveRedEye />
      </button>
      {userDetails && userApplication && contentCreator && (
        <UserDetailsModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          userDetails={userDetails}
          userApplication={userApplication}
          contentCreator={contentCreator}
          token={getUserToken()}
          onHandleStatus={() => {
            onHandleStatus();
            void refreshUserDetails();
          }}
          loading={isLoading}
        />
      )}
    </>
  );
};

export default ViewUserButton;
