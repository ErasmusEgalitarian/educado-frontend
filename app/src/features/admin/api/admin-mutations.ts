import { BACKEND_URL } from "@common/constants/environment";
import axios from "axios";

export const deleteUser = async (id: string, token: string) => {
    const res = await axios.delete(`${BACKEND_URL}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const changeUserRole = async (id: string, token: string, newRole: string) => {
    const res = await axios.patch(
        `${BACKEND_URL}/api/users/${id}/role`,
        { newRole },
        { headers: { Authorization: `Bearer ${token}` } },
    );
    return res.data;
};