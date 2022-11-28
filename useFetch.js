import axios from "axios";
import { urlEndPoints } from "./helpers";

const instance = axios.create({
	baseURL: "https://livejs-api.hexschool.io/api/livejs/v1/customer/sentiments",
});

export const fetchInitialData = async () => {
	const controller = new AbortController();

	try {
		const data = await Promise.allSettled(
			urlEndPoints.map((ep) => instance.get(ep, { signal: controller.signal }))
		);

		const isRequestsSuccess = data.every((item) => {
			const { status } = item.value.data;
			return status >= 200 || status <= 299;
		});

		if (!isRequestsSuccess) {
			throw new Error("An error occurred, please refresh or try again later!");
		}

		return data.map((item) => {
			const { data } = item.value;
			return data.products || data.carts;
		});
	} catch (error) {
		if (controller.error) return "Request aborted!";
		console.log(error);
	}
};

export const placeOrder = async (formEl) => {
	const data = await instance.post("orders", {
		data: {
			user: formEl,
		},
	});
	console.log(data);
};

export const addToCart = async (productInfo) => {
	try {
		// const { finalTotal, carts } = await instance.post("carts", { data: productInfo });
		const data = await instance.post("carts", { data: productInfo });
		const { finalTotal, carts, status } = data.data;
		return { finalTotal, carts };
	} catch (error) {
		console.error(error);
	}
};

export const deleteCartItem = async (id) => {
	try {
		const data = await instance.delete(`carts/${id}`);
		const { finalTotal, carts, status } = data.data;
		console.log(data);
		return { finalTotal, carts };
		// return d
	} catch (error) {
		console.error(error);
	}
};

export const deleteAllCartItem = async () => {
	try {
		const data = await instance.delete("carts");
		const { carts, finalTotal, message } = data.data;
		console.log(data);
		return { carts, finalTotal, message };
	} catch (error) {
		console.error();
	}
};
