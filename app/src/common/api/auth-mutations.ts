import axios from "axios";

import { Institution } from "@admin/types/institution-types";
import { BACKEND_URL } from "@common/constants/environment";
import { UserCredentials } from "@common/types/auth-types";
import { CreateUserPayload } from "@login/types/login-types";

export const postUserLogin = async (credentials: UserCredentials) => {
    return await axios.post(`${BACKEND_URL}/api/auth/login`, credentials);
};

export const postUserSignup = async (formData: CreateUserPayload) => {
    return await axios.post(`${BACKEND_URL}/api/auth/signup`, formData);
};

export const postUserVerification = async (formData: CreateUserPayload) => {
    return await axios.post(`${BACKEND_URL}/api/auth/verify-email`, formData);
};

export const AcceptApplication = async (id: string): Promise<unknown> => {
    return await axios.put(`${BACKEND_URL}/api/applications/${id}approve`);
};

export const RejectApplication = async (
    id: string,
    rejectionReason: string,
): Promise<unknown> => {
    return await axios.put(`${BACKEND_URL}/api/applications/${id}reject`, {
        rejectionReason,
    });
};

export const postNewApplication = async (data: {
    baseUser: string | undefined;
    motivation: string;

    academicLevel: string[];
    academicStatus: string[];
    major: string[];
    institution: string[];
    educationStartDate: string[];
    educationEndDate: string[];

    company: string[];
    position: string[];
    workStartDate: string[];
    workEndDate: string[];
    isCurrentJob: boolean[];
    workActivities: string[];
}) => {
    return await axios.post(
        `${BACKEND_URL}/api/applications/newapplication`,
        data,
    );
};

export const addInstitution = async (data: Institution) => {
    const res = await axios.post<Institution>(
        `${BACKEND_URL}/api/applications/newinstitution`,
        data,
    );
    return res.data;
};