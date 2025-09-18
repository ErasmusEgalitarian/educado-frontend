import { CertificateIds } from "@certificates/types/certificate-types";
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

const createCertificate = async (certificate: CertificateIds) => {
    return await client.put(
        `/api/creator-certificates`,
        {
            creatorId: certificate.creatorId,
            courseId: certificate.courseId,
        },
        {
            headers: {
                Authorization: `Bearer ${getUserToken()}`,
                token: getUserToken(),
            },
        },
    );
};



const deleteCertificate = async (creatorId: string, courseId: string) => {
    return await axios.delete(`${CERT_URL}/api/creator-certificates`, {
        data: {
            creatorId: creatorId,
            courseId: courseId,
        },
        headers: {
            Authorization: `Bearer ${getUserToken()}`,
            token: getUserToken(),
        },
    });
};