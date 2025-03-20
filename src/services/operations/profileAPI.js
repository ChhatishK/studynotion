import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector";
import { courseEndpoints, profileEndpoints } from "../api";

const {
    GET_USER_ENROLLED_COURSES_API
} = profileEndpoints

export const getEnrolledCourses = async (token) => {

        const toastId = toast.loading('Loading...'); 
        let result = [];
        
        try {

            const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null, {
                Authorization: `Bearer ${token}`
            })

            console.log("Response" + response);
            console.log("After calling backend for enrolled courses.")
            if (!response.data.success) {
                toast.error(response.data.message);
                throw new Error(response.data.message);
            }

            result = response.data.data;

            toast.success("Enrolled Courses fetched!")

        } catch (error) {
            console.log(error);
            toast.error("Fetching enrolled courses error!");
        }

        toast.dismiss(toastId);

        return result;
}