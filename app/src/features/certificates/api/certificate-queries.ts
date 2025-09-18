import { CERT_URL } from "@common/constants/environment";
import { getUserToken } from "@user/utilities/get-local-user";
import axios from "axios";

const client = axios.create({
    baseURL: CERT_URL,
    headers: {
        "Content-Type": "application/json",
        token: getUserToken(),
    },
});

export const getUserCertificates = async (id: string) => {
    const certificates = await client.get(
        "/api/creator-certificates/creator/" + id,
        {
            headers: {
                token: getUserToken(),
            },
        },
    );

    return certificates.data;
};