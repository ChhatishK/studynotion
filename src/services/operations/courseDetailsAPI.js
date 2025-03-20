import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { courseEndpoints } from "../api";
import { COURSE_STATUS } from "../../utils/constants";

const {
    EDIT_COURSE_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_SECTION_API,
    UPDATE_SECTION_API,
    DELETE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SUBSECTION_API,
} = courseEndpoints

export async function fetchFullCourseDetails (data, token) {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {

        const response = await apiConnector("POST", GET_FULL_COURSE_DETAILS_AUTHENTICATED, data, {
            Authorization: `Bearer ${token}`
        })

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        result = response?.data?.data;

    } catch (error) {
        console.log(error);
        toast.error("Failed to retrive course details");
    }

    toast.dismiss(toastId);
    return result;
}

export async function fetchInstructorCourses(token) {
    let result = null;
    const toastId = toast.loading("Loading...");

    try {

        const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null, {
            Authorization: `Bearer ${token}`
        })

        if (!response.data.success) {
            throw new Error("Courses Not Found!")
        }

        // console.log("RESPONSE_INSTRUCTOR_COURSES: ", response);

        result = response?.data?.data;

    } catch (error) {
        console.log(error);
        toast.error("Failed to retrive courses")
    }

    toast.dismiss(toastId);
    return result;
}

export async function editCourseDetails(data, token) {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector("POST", EDIT_COURSE_API, data, {
            Authorization: `Bearer ${token}`
        })

        if (!response.data.success) {
            throw new Error("Could not edit the course")
        }

        result = response?.data?.data;
        toast.success(`Course ${data.status === COURSE_STATUS.DRAFT ? "Drafted!" : "Published!" }`)
    } catch (error) {
        console.log(error);
        toast.error("Course not publish!")
    }

    toast.dismiss(toastId);
    return result;
}

export async function createSection(data, token) {
    const toastId = toast.loading("Loading...");

    let result = [];

    try {
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        })

        if (!response?.data?.success) {
            throw new Error(response.data.message);
        }

        result = response?.data?.data;
    } catch (error) {   
        console.log(error.message);
        toast.error("Failed");
    }
    toast.dismiss(toastId);
    return result;
}

export async function updateSection(data, token) {
    let result = [];
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        })

        if (!response?.data.success) {
            throw new Error(response.data.message);
        }

        result = response?.data?.data;
       
    } catch (error) {
        console.log(error);
        toast.error("Failed");
    }
    toast.dismiss(toastId);
    return result;
}

export async function deleteSection(data) {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {

        const response = await apiConnector("POST", DELETE_SECTION_API, data);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        result = response?.data?.data;

    } catch (error) {
        console.log(error);
        toast.error("Failed!");
    }

    toast.dismiss(toastId);
    return result;
}

export async function createSubSection(data, token) {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {

        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        })

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Lecture Added.");
        result = response?.data?.data;

    } catch (error) {
        console.log(error);
        toast.error("Failed")
    }

    toast.dismiss(toastId)
    return result;
}

export async function updateSubSection(data, token) {
    const toastId = toast.loading("Loading...");
    let result = [];
    console.log("Upating Subsection : ");
    console.log(data);

    try {
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        })

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        result = response?.data?.data;

    } catch (error) {
        console.log(error);
        toast.error("Failed!")
    }

    toast.dismiss(toastId);
    return result;
}

export async function deleteSubSection(data) {
    const toastId = toast.loading("Loading...")
    let result = null;

    try {

        const response = await apiConnector("POST", DELETE_SUBSECTION_API, data);

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        result = response?.data?.data

    } catch (error) {
        console.log(error);
        toast.error("Failed!")
    }

    toast.dismiss(toastId)
    return result;
}