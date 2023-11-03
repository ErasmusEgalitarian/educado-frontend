import axios from "axios";

import { BACKEND_URL } from "../helpers/environment";

const deleteAccount = async () => {
    const creatorId = localStorage.getItem("id");

    if(creatorId == null) {
        throw new Error("No creatorId found in localStorage");
    }

    try {
      const res = await axios.delete(
        `${BACKEND_URL}/profile/delete/${creatorId}`);

      return res.data;

    } catch (error: any) {
        if (error.response?.data != null) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
}

const getPublicProfileInfo = (profileId: string, token: string | null | undefined) => {
    return axios.get(
        `${BACKEND_URL}/api/public/profiles/${profileId}`,
        { headers: { Authorization: `Bearer ${token}` } }
    ).then(res => res.data);
}

const getProfileInfo = (token: string | null | undefined) => {
    return axios.get(
        `${BACKEND_URL}/api/profile/whoami`,
        { headers: { Authorization: `Bearer ${token}` } }
    ).then(res => res.data);
}

const updateProfileInfo = (data: any, token: string | null | undefined) => {
    return axios.put(
        `${BACKEND_URL}/api/profile`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
    ).then(res => res.data);
}

const changePassword = (data: any, token: string) => {
    return axios.put(
        `${BACKEND_URL}/api/profile/changePassword`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
    ).then(res => res.data);
}


const AccountServices = {
    getPublicProfileInfo,
    getProfileInfo,
    updateProfileInfo,
    changePassword,
    deleteAccount
};


export default AccountServices;
