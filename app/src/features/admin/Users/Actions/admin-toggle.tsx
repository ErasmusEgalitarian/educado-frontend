import { FC, useEffect, useState } from "react";

import { changeUserRole } from "@admin/api/admin-mutations";
import { getSingleUserDetails } from "@admin/api/admin-queries";
import { getUserToken } from "@user/utilities/get-local-user";

interface AdminToggleButtonProps {
  applicationId: string;
  applicationApproved: boolean;
}

const AdminToggleButton: FC<AdminToggleButtonProps> = ({
  applicationId,
  applicationApproved,
}) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const token = getUserToken();

  // Fetch the user's current role when the component mounts
  useEffect(() => {
    const fetchUserRole = async () => {
      if (token === "") return;
      try {
        setLoading(true);
        const userDetails = await getSingleUserDetails(applicationId, token);
        const role = userDetails.role;
        setIsAdmin(role === "admin");
        applicationApproved = true;
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchUserRole();
  }, [applicationId, token]);

  if (token === "") {
    console.error("No token found");
    return null;
  }

  const handleToggleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    try {
      if (isChecked) {
        await changeUserRole(applicationId, token, "admin");
        setIsAdmin(true); // Update local state
      } else {
        await changeUserRole(applicationId, token, "creator");
        setIsAdmin(false); // Update local state
      }
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching the role
  }

  if (!applicationApproved) {
    return null;
  }

  return (
    <div
      className="toggle-switch text-gray-900 whitespace-no-wrap ml-7"
      id="admin"
    >
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="hidden peer"
          checked={isAdmin}
          onChange={() => handleToggleChange}
        />
        <div className="relative w-10 h-3.5 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[-3.5px] after:start-[2px] after:bg-gray-400 peer-checked:after:bg-cyan-800  after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-toggleChecked" />
      </label>
    </div>
  );
};

export default AdminToggleButton;
