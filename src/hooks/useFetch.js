import axios from "axios";
import { ADMIN_TOKEN, ADMIN_URL, CUSTOMER_URL } from "../helpers";

const useFetch = async (args = {}, isAdmin = false) => {
    const controller = new AbortController();

    let configs = {
        baseURL: isAdmin ? ADMIN_URL : CUSTOMER_URL,
        headers: {
            authorization: isAdmin && ADMIN_TOKEN,
        },
        signal: controller.signal,
    };

    try {
        if (Array.isArray(args)) {
            const data = await Promise.allSettled(
                args.map((url) => {
                    return axios({
                        ...configs,
                        url: `/${url}`,
                    });
                })
            );

            return data.map((item) => {
                const { data } = item.value;
                return data.products || data.carts;
            });
        }

        if (typeof args === "string") configs["url"] = args;
        if (typeof args === "object") configs = { ...configs, ...args };
        const data = await axios.request(configs);
        return data.data;
    } catch (error) {
        if (controller.error) return "请求被终止!";
        return "发生错误! 请稍后重试.";
    }
};

export default useFetch;
