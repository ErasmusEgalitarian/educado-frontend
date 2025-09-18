import axios from "axios";

import { Institution } from "@admin/types/institution-types";
import { BACKEND_URL } from "@common/constants/environment";

export const updateInstitution = async (
    id: string,
    token: string,
    data: Institution,
) => {
    const res = await axios.patch<{ message: string; institution: Institution }>(
        `${BACKEND_URL}/api/institutions/${id}`,
        { ...data },
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );
    return res.data;
};

export const deleteInstitution = async (id: string, token: string) => {
    const res = await axios.delete<Institution>(
        `${BACKEND_URL}/api/institutions/${id}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );
    return res.data;
};