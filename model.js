import { initialData } from "./useFetch";

export let state = {
	products: [],
	cart: [],
};

export const getInitialData = async (endpoints) => {
	try {
		const [products, cart] = await initialData(endpoints);
		state = { ...state, products, cart };
	} catch (error) {
		throw new Error(error);
	}
};
