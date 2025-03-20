import toast from "react-hot-toast";
import { courseEndpoints } from "../api";
import { apiConnector } from "../apiconnector";

const {
    COURSE_CATEGORIES_API,
    CREATE_COURSE_API,
    DELETE_COURSE_API,
} = courseEndpoints


export async function fetchCourseCategories(token) {
    let result = [];

    try {

        const response = await apiConnector('GET', COURSE_CATEGORIES_API)

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        result = response?.data?.data;

    } catch (error) {
        console.log(error.message);
        toast.error(error.message)
    }

    return result;
}

export async function addCourseDetails(data, token) {
    let result = [];

    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            Authorization: `Bearer ${token}`
        })

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        result = response?.data?.data;
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);

    return result;
}


export async function deleteCourse(data, token) {
    const toastId = toast.loading("Loading...");
    
    try {

        const response = await apiConnector("POST", DELETE_COURSE_API, data, {
            Authorization: `Bearer ${token}`
        })

        if (!response.data.success) {
            throw new Error("Course not deleted!");
        }

        toast.success("Course Deleted.")

    } catch (error) {
        console.log(error);
        toast.error("Unable to delete course.")
    }

    toast.dismiss(toastId);
}