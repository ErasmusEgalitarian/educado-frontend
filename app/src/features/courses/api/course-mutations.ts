import axios from "axios";

import { BACKEND_URL } from "@common/constants/environment";
import { Course, NewCourse } from "@courses/types/Course";

export const createCourse = async (data: NewCourse, token: string) => {
    return await axios.put<Course>(
        `${BACKEND_URL}/api/courses`,
        {
            title: data.title,
            description: data.description,
            category: data.category,
            difficulty: data.difficulty,
            creator: data.creator,
            status: data.status,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                token: localStorage.getItem("token") ?? "",
            },
        },
    );
};



/**
 * Update a specific course
 * @param data the data of the course to be updated
 * @param id The id of the course
 * @param token The token of the user
 * @returns Confirmation of the update
 */
export const updateCourseDetail = async (
    data: Partial<Course>,
    id: string | undefined,
    token: string,
) => {
    const res = await axios.patch(`${BACKEND_URL}/api/courses/${String(id)}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
};

export const updateCourseSectionOrder = async (
    sections: string[],
    id: string | undefined,
    token: string,
) => {
    const res = await axios.patch(
        `${BACKEND_URL}/api/courses/${String(id)}/sections`,
        { sections },
        { headers: { Authorization: `Bearer ${token}` } },
    );
    return res.data;
};

export const updateCourseStatus = async (
    course_id: string | undefined,
    status: string,
    token: string,
) => {
    const res = await axios.patch(
        `${BACKEND_URL}/api/courses/${String(course_id)}/updateStatus`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } },
    );
    return res.data;
};

/**
 * Delete a specific course
 * @param id the id of the course that will be deleted
 * @param token token of the user
 * @returns Delete data
 */
export const deleteCourse = async (id: string | undefined, token: string) => {
    return await axios.delete(`${BACKEND_URL}/api/courses/${String(id)}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Get in name, but POST?
export const getAverageRatingOfCC = async (
    userid: string,
    period?: string,
): Promise<number> => {
    try {
        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${BACKEND_URL}/api/rating/getOverallRatingOfCC/?userid=${userid}${period ? `&period=${period}` : ""}`,
            headers: {},
        };
        const response = await axios.request(config);
        return response.data.averageRating;
    } catch (error) {
        console.log(error);
        return 0;
    }
};