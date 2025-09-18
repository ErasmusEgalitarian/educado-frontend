import { Institution } from "@admin/types/institution-types";
import { BACKEND_URL } from "@common/constants/environment";
import axios from "axios";

export const getInstitutions = async (token: string) => {
    const res = await axios.get<Institution[]>(
        `${BACKEND_URL}/api/institutions`,
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );
    return res.data;
};

export const getSingleInstitution = async (id: string, token: string) => {
    return await axios.get<Institution>(`${BACKEND_URL}/api/institutions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const createInstitution = async (token: string, data: Institution) => {
    return await axios.post(
        `${BACKEND_URL}/api/institutions/`,
        { ...data },
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );
};