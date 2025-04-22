import {setLoading, setToken} from '../../slices/authSlice'
import toast from 'react-hot-toast'
import { apiConnector } from '../apiconnector';
import {endpoints} from '../api'
import {setUser} from '../../slices/profileSlice'
import { resetCart } from '../../slices/cartSlice';

const {
    LOGIN_API,
    SENDOTP_API,
    SIGNUP_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API
} = endpoints;

export const sendOtp = async (email, navigate, dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresend: true,
            })
            
            console.log("OTP send response : ", response);

            // console.log(response.data.message);

            if (!response.data.success) {
                toast.error(response.data.message);
                return false;
                // throw new Error (response.data.message)
            }
            const toastId = toast.loading("Loading...")

            toast.success("OTP sent to your email");
            navigate('/verify');

            toast.dismiss(toastId);

        } catch (error) {
            console.log("Error to send otp : ", error);
            toast.error('OTP could not sent');
        }

        toast.dismiss(toastId);
        dispatch(setLoading(false));
        return true;
}

// signup handler
export const signup = (
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    accountType,
    otp,
    navigate
) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {

            const response = await apiConnector("POST", SIGNUP_API, {
                firstName, lastName, email, password, confirmPassword, accountType, otp
            });

            console.log("Response from signing up: ", response);

            console.log(response.data.success);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Signup successfully");
            navigate('/login');

        } catch (error) {
            console.log("Signup failed, ", error);
            console.log(error.message);
            toast.error('Could not signed up');
            navigate('/signup');
        }

        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }

}

export const login = async (email, password, navigate, dispatch) => {
        // dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email, password
            });

            console.log("Login Response.....: ", response);

            if (!response.data.success) {
                toast.error(response.data.message);
                return;
            }

            toast.success("Login Successfully!");;

            dispatch(setToken(response.data.token));

            const userImg = response.data.user?.image? response.data.user.image : 
            `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            dispatch(setUser({...response.data.user, image: userImg}));

            localStorage.setItem('token', JSON.stringify(response.data.token));
            localStorage.setItem('user', JSON.stringify({...response.data.user, image: userImg}));

            navigate('/');

        } catch(error) {
            console.log("Login Failed Response...", error);
            toast.error(error.response.data.message);
        }

        // dispatch(setLoading(false));
}

export const logout = (navigate) => {
    
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        dispatch(setUser(null));
        dispatch(setToken(null));
        dispatch(resetCart(0));
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success("Logout successfully!");
        toast.dismiss(toastId);
        dispatch(setLoading(false));
        navigate('/')
    }

}

export const sendresetlink = (email, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        
        try {

            const response = await apiConnector("POST", RESETPASSTOKEN_API, {
                email
            });

            console.log(response);
    
            if (!response.data.success) {
                toast.error(response.data.message);
                throw new Error(response.data.message);
            }

            dispatch(setUser(response.data));

            toast.success("Reset mail sent");
            navigate('/resend-email');

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const resetPassword = (password, confirmPassword, token, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, {
                password, confirmPassword, token
            });

            if (!response.data.success) {
                toast.error(response.data.message);
                throw new Error(response.data.error);
            }
            
            toast.success("Password reset successfully!");
            navigate('/login');
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.message);
        }

        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

