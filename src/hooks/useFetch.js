import axios from "axios";
import { urlEndPoints, ADMIN_TOKEN, ADMIN_URL, CUSTOMER_URL } from "../helpers";

export const fetchInitialData = async () => {
    const controller = new AbortController();

    try {
        const data = await Promise.allSettled(
            urlEndPoints.map((ep) =>
                instance.get(ep, { signal: controller.signal })
            )
        );

        const isRequestsSuccess = data.every((item) => {
            const { status } = item.value.data;
            return status >= 200 || status <= 299;
        });

        if (!isRequestsSuccess) {
            throw new Error(
                "An error occurred, please refresh or try again later!"
            );
        }

        return data.map((item) => {
            const { data } = item.value;
            return data.products || data.carts;
        });
    } catch (error) {
        if (controller.error) return "Request aborted!";
        return "Something went wrong please try again later!";
    }
};

const useFetch = async (args = {}, isAdmin = false) => {
    const controller = new AbortController();

    try {
        const data = await axios.request({
            baseURL: isAdmin ? ADMIN_URL : CUSTOMER_URL,
            url: typeof args === "string" && args,
            headers: {
                authorization: isAdmin && ADMIN_TOKEN,
            },
            signal: controller.signal,
            ...args,
        });

        return data.data;
    } catch (error) {
        if (controller.error) return "Request aborted!";
        return "Something went wrong please try again later!";
    }
};

export default useFetch;
