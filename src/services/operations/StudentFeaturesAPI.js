import toast from "react-hot-toast";
import { studentEndpoints } from "../api";
import { apiConnector } from "../apiconnector";
import rzpLogo from '../../assets/Logo/Logo-Small-Dark.png'
import { resetCart } from "../../slices/cartSlice";

const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API
} = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }

        script.onerror = () => {
            reject(true)
        }

        document.body.appendChild(script);
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {

    const toastId = toast.loading("Loading...");

    try {
        // load the script of checkout page

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if (!res) {
            toast.error("Razorpay SDK failed to load")
            return;
        }

        // initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
            {courses},
            {Authorization: `Bearer ${token}`}
        )

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message)
        }

        // console.log("Order Response : ", orderResponse);

        // create options object for modal
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: orderResponse.data.data.amount,
            order_id: orderResponse.data.data.id,
            name: "StudyNotion",
            description: "Thank you for purchasing the course",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email,
            },
            handler: function (response) {
                // send successfull mail
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);
                // verify payment
                verifyPayment({...response, courses}, token, navigate, dispatch)
            }
        }

        console.log("Modal options: ", options)

        const paymentObject = new Razorpay(options);
        paymentObject.open();

        paymentObject.on("payment.failed", function(response) {
            toast.error("oops!, payment failed")
            console.log(error);
        })

        console.log("Modal opened")

    } catch (error) {
        console.log("PAYMENT API ERROR.....", error);
        // toast.error("Could not make payment");
        if (!error.response.data.allowed) {
            toast.error("You can't do this action.");
        }
    }

    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount
        }, {Authorization: `Bearer ${token}`})

        console.log("Email sent")
    } catch (error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error)
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying payment...")
    // dispatch(setPaymentLoading(true))
    console.log("Body DATA from verify payment: ",bodyData);

    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {Authorization: `Bearer ${token}`});

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        toast.success("Payment success")

        navigate('/dashboard/enrolled-courses')

        dispatch(resetCart())
        console.log("Payment verified")
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR....", error)
        toast.error("Payment Failed")
    }

    toast.dismiss(toastId)
    // dispatch(setPaymentLoading(false))
}