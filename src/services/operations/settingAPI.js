import toast from "react-hot-toast";
import { settingsEndpoints } from "../api";
import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../slices/profileSlice";

const {
    UPDATE_DISPLAY_PICTURE_API,
    DELETE_PROFILE_API,
    UPDATE_PROFILE_API
} = settingsEndpoints;

export const updateDisplayPicture = async (token, formData, dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {

            const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            })

            console.log(response);

            if (!response.data.success) {
                toast.error(response.data.message);
                throw new Error(response.data.message);
            }

            toast.success("Profile picture updated!");
            console.log("Picture uploading: ",response.data.data);
            localStorage.setItem('user', JSON.stringify(response.data.data));
            dispatch(setUser(JSON.stringify(response.data.data)));

        } catch (error) {
            console.log(error.message);
            toast.error("Picture not uploaded")
        }

        toast.dismiss(toastId);
        dispatch(setLoading(false));
}

export const deleteAccount = (token) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector('DELETE', DELETE_PROFILE_API, token);

            if (!response.data.success) {
                toast.error(response.data.message);
                throw new Error(response.data.message);
            }

            toast.success(response.data.message);

            console.log("Response: "+response);
        } catch (error) {
            console.log(error.message);
            toast.error("Error in deleting profile.");
        }

        toast.dismiss(toastId);
    }
}

export const updateProfile = async (token, data, dispatch) => {
        const toastId = toast.loading('Loading...');

        try {
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, data, {
                Authorization: `Bearer ${token}`
            });

            console.log(response);

            if (!response.data.success) {
                toast.error(response.data.message);
                throw new Error(response.data.message);
            }

            toast.success("Profile updated!");

            localStorage.setItem('user', JSON.stringify(response.data.data));
            dispatch(setUser(JSON.stringify(response.data.data)));
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!")
        }

        toast.dismiss(toastId);
}