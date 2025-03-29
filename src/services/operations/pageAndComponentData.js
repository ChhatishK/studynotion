import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { catalogData } from "../api";

const {
    CATALOGPAGEDATA_API
} = catalogData

export async function getCatalogPageData(categoryId) {
    let result = [];
    const toastId = toast.loading("Loading...");
    console.log("Category ID: ",categoryId)

    try {

        const response = await apiConnector("POST", CATALOGPAGEDATA_API, {
            categoryId: `${categoryId}`
        })

        if (!response.data.success) {
            throw new Error("Could not fetch category page data")
        }

        result = response?.data?.data;

    } catch (error) {
        console.log("CATA PAGEDATA API ERROR: ", error);
        toast.error("No Course Found");
        result = error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}