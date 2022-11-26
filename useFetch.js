import axios from "axios";

const instance = axios.create({
	baseURL: "https://livejs-api.hexschool.io/api/livejs/v1/customer/sentiments",
});

export const fetchData = async (endpoint) => {
	const controller = new AbortController();

	try {
		const { status, data } = await instance.get(endpoint, { signal: controller.signal });
		if (status < 200 || status > 299) {
			throw new Error("An error occurred, please refresh or try again later!");
		}

		return data;
	} catch (error) {
		if (controller.error) return "Request aborted!";
	}
};

export const urlEndPoints = ["products", "carts"];
