import axios from "axios";

// Backend URL from enviroment
import { CERT_URL } from '../helpers/environment';
import { BACKEND_URL } from "../helpers/environment";
import { getUserInfo, getUserToken } from "../helpers/userInfo";
import { Certificate, CertificateIds } from "../interfaces/Certificate";

// Interface for posting course content
export interface CourseInterface {
  creatorId: string;
  courseId: string;
}

const client = axios.create({
  baseURL: CERT_URL,
  headers: {
    "Content-Type": "application/json",
    token: getUserToken(),
  },
});

const getAllCetificateIds = async () => {
  const res = await client.get(
    "/api/creator-certificates", {
    params: {
      admin: true
    }
  }
  );

  return res;
};

const getCertificateInfo = async (idObj: any) => {
  const token = getUserToken();
  let certificates: any[] = [];
  for (let i = 0; i < idObj.data.length; i++) {
    const user = await axios.get(`${BACKEND_URL}/api/users/${idObj.data[i].creatorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        token: token,
      },
    });

    const course = await axios.get(`${BACKEND_URL}/api/courses/${idObj.data[i].courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        token: token,
      },
    });

    if(course?.data?.dateCreated) {
      course.data.dateCreated = new Date(course.data.dateCreated);
    }

    certificates.push({
      course: course.data,
      creator: user.data,
    });

  }

  return certificates;
}

const getAllCertificates = async () => {
  const idObj = await getAllCetificateIds();

  const certificates = await getCertificateInfo(idObj);

  return certificates;

}



const deleteCertificate = async (creatorId: string, courseId: string) => {
  return await axios.delete(
    `${CERT_URL}/api/creator-certificates`,
    {
      data: {
        creatorId: creatorId,
        courseId: courseId,
      },
      headers: {
        Authorization: `Bearer ${getUserToken()}`,
        token: getUserToken(),
      },
    }
  );

}

// Export all methods
const CourseServices = Object.freeze({
  getAllCertificates,
  /*updateCoverImage,*/
  deleteCertificate,
});

export default CourseServices;

