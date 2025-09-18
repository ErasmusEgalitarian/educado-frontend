import { BACKEND_URL } from "@common/constants/environment";
import { ContentCreator } from "@common/unknown/interfaces/ContentCreator";
import { User } from "@user/types/user-types";
import axios from "axios";

export const getSingleUserDetails = async (id: string, token: string) => {
    const res = await axios.get<User>(`${BACKEND_URL}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const getUserApplications = async (token: string) => {
    const res = await axios.get<{ data: (User & ContentCreator)[] }>(
        `${BACKEND_URL}/api/user-info`,
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );
    return res.data.data;
};



export const getContentCreator = async (id: string, token: string) => {
    const res = await axios.get<ContentCreator>(
        `${BACKEND_URL}/api/user-info/${id}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );
    return res.data;
};