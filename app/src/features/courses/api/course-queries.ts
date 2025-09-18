/* eslint-disable @typescript-eslint/naming-convention */
import axios from "axios";

import { BACKEND_URL } from "@common/constants/environment";
import { Course, CreatorPopulatedCourse } from "@courses/types/Course";
import { getUserInfo, getUserToken } from "@user/utilities/get-local-user";

/**
 * Get all courses from specific creator
 * @param token The token of the user
 * @returns A list of all courses for the creator
 */
export const getAllCreatorCourses = async (token: string) => {
    const { id } = getUserInfo();

    const res = await axios.get<Course[]>(
        `${BACKEND_URL}/api/courses/creator/${id}`,
        {
            headers: { Authorization: `Bearer ${token}`, token: token },
        },
    );

    // Convert dates in course data to Date objects
    res.data.forEach((course) => {
        if (course.dateCreated) course.dateCreated = new Date(course.dateCreated);
        if (course.dateUpdated) course.dateUpdated = new Date(course.dateUpdated);
    });

    return res.data;
};

/**
 * Get all courses
 * @returns A list of all courses
 */
export const getAllCourses = async () => {
    const token = getUserToken();
    const res = await axios.get<CreatorPopulatedCourse[]>(
        `${BACKEND_URL}/api/courses/`,
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );

    // Convert dates in course data to Date objects
    res.data.forEach((course) => {
        if (course.dateCreated) course.dateCreated = new Date(course.dateCreated);
        if (course.dateUpdated) course.dateUpdated = new Date(course.dateUpdated);
    });

    return res.data;
};

/**
 * Get course detail
 * @param url The route to get the course detail
 * @returns The course detail
 */
export const getCourseDetail = async (url: string, token: string) => {
    const res = await axios.get<Course>(url, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
};

// Get course categories - FROM LAST YEAR, NOT IMPLEMENTED, CATEGORIES ARE HARDCODED RN
export const getCourseCategories = async (url: string, token: string) => {
    const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
};

export const getAverageRatingOfCourse = async (
    courseid?: string,
): Promise<number> => {
    try {
        if (!courseid) {
            throw new Error("Course ID is required");
        }
        const config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${BACKEND_URL}/api/rating/getOverallRatingOfCourse/${courseid}`,
            headers: {},
        };
        const response = await axios.request(config);
        return response.data.averageRating;
    } catch (error) {
        console.log(error);
        return 0;
    }
};

export const getTotalGrantedCertificates = async (
    userid: string,
): Promise<number> => {
    try {
        const config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${BACKEND_URL}/api/certificates/getTotalGrantedCertificates/${userid}`,
        };

        const response = await axios.request(config);
        return response.data.totalCertificates;
    } catch (error) {
        console.log(error);
        return 0;
    }
};
