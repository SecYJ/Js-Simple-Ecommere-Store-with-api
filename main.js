import "./style.css";
import {
	deleteAllCartItem,
	fetchInitialData,
	placeOrder,
	addToCart,
	deleteCartItem,
} from "./useFetch";

const placeOrderForm = document.querySelector("#pre-order");
const productsFilterSelect = document.querySelector("#products-filter-select");
const productsList = document.querySelector("#products-list");
const cartList = document.querySelector("#cart-list");
const cartListBottom = document.querySelector("#cart-list-bottom");
const cartListTotalPrice = document.querySelector("#cart-list-total-price");

const state = {
	productsList: [],
	cartList: [],
};

const productMarkup = (productsData) => {
	if (productsData.length === 0) {
		return `<p class="text-center">当前产品列表为空</p>`;
	}

	return productsData
		.map((product) => {
			const { origin_price, price, title, images, category, id } = product;
			return `
                <li class="relative">
                    <div class="absolute top-2 py-2 px-6 bg-black text-white right-0">
                        ${category}
                    </div>
                    <img src=${images} alt=${title} class="h-[300px] w-full object-cover" />
                    <button
                        type="button"
                        class="bg-black text-white w-full py-3 hover:bg-primary-extra-dark transition-colors"
                        data-id=${id}
                    >
                        加入購物車
                    </button>
                    <div class="mt-2">
                        <h3 class="mb-2">${title}</h3>
                        <p class="line-through">NT$${origin_price}</p>
                        <strong class="text-[1.75rem]">NT$${price}</strong>
                    </div>
                </li>            
            `;
			// return `
			//     <li class="relative flex flex-col">
			//         <div class="absolute top-2 py-2 px-6 bg-black text-white right-0">
			//             ${category}
			//         </div>
			//         <div>
			//             <img src=${images} alt="" class="h-full w-full" />
			//             <button
			//                 type="button"
			//                 class="bg-black text-white w-full py-3 hover:bg-black/80 transition-colors"
			//             >
			//                 加入購物車
			//             </button>
			//         </div>
			//         <div class="mt-2 grow grid grid-rows-[1fr_auto_auto]">
			//             <h3 class="mb-2">${title}</h3>
			//             <p class="line-through">NT$${origin_price}</p>
			//             <strong class="text-[1.75rem]">NT$${price}</strong>
			//         </div>
			//     </li>
			// `;
		})
		.join("");
};

const cartHTML = (cartsData) => {
	const cartListBottom = document.querySelector("#cart-list-bottom");
	if (cartsData.length === 0) {
		cartListBottom.classList.remove("flex");
		cartListBottom.classList.add("hidden");
		return `<li class="text-center">当前购物列表为空!</li>`;
	}

	const labelsMarkup = `
        <li class="grid grid-cols-[repeat(6,auto)]">
            <p class="mr-[15px]">品項</p>
            <p class="w-[14ch] mr-[30px]"></p>
            <p class="mr-[90px]">單價</p>
            <p class="mr-[178px]">數量</p>
            <p class="mr-[90px]">金額</p>
        </li>
    `;

	const markup = cartsData.map((cart) => {
		const { id: productId, images, price, title } = cart.product;
		const { id: cartProductId, quantity } = cart;

		return `
        <li
            class="grid grid-cols-[repeat(6,auto)] items-center border-b border-[#bfbfbf] pb-5"
        >
            <img src=${images} class="w-20 h-20 object-cover mr-[15px]" alt=${title} />
            <p class="w-[14ch] mr-[30px]">${title}</p>
            <p class="mr-[90px]">NT$${price}</p>
            <p class="mr-[178px]">${quantity}</p>
            <p class="mr-[90px]">NT$${quantity * price}</p>
            <button type="button" class="material-icons" data-id=${cartProductId}>clear</button>
        </li>
      `;
	});

	cartListBottom.classList.remove("hidden");
	cartListBottom.classList.add("flex");

	return labelsMarkup + markup.join("");
};

const render = (el, htmlMarkup, data) => {
	const domEl = document.querySelector(el);
	const markup = htmlMarkup(data);
	clearMarkup(el);
	domEl.innerHTML = markup;
};

const clearMarkup = (el) => (document.querySelector(el).innerHTML = "");

const init = async () => {
	// try {
	// 	const [productsData, cartsData] = await Promise.allSettled(
	// 		urlEndPoints.map((endpoint) => fetchData(endpoint))
	// 	);

	// 	render("#products-list", productMarkup, productsData.value.products);
	// } catch (error) {
	// 	console.error(error);
	// }
	try {
		const [productsList, cartList] = await fetchInitialData();
		state.productsList = productsList;
		state.cartList = cartList;
		render("#products-list", productMarkup, state.productsList);
		render("#cart-list", cartHTML, state.cartList);
	} catch (error) {
		console.error(error);
	}
};

productsFilterSelect.addEventListener("change", (e) => {
	const { value } = e.target;
	if (value === "全部") {
		render("#products-list", productMarkup, state.productsList);
		return;
	}
	const filteredData = state.productsList.filter(({ category }) => category === value);
	render("#products-list", productMarkup, filteredData);
});

placeOrderForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const t = new FormData(e.target);
	const testing = Object.fromEntries(t);
	await placeOrder(testing);
});

productsList.addEventListener("click", async (e) => {
	if (e.target.nodeName !== "BUTTON") return;
	const productId = e.target.dataset.id;
	const isExistInCart = state.cartList.find((item) => item?.product?.id === productId);
	let quantity = null;
	!isExistInCart ? (quantity = 1) : (quantity = parseInt(isExistInCart.quantity) + 1);
	const { carts, finalTotal } = await addToCart({ quantity, productId });
	state.cartList = carts;
	render("#cart-list", cartHTML, state.cartList);
	cartListTotalPrice.textContent = `NT$${finalTotal}`;
});

cartList.addEventListener("click", async (e) => {
	if (e.target.nodeName !== "BUTTON") return;
	const { carts, finalTotal } = await deleteCartItem(e.target.dataset.id);
	state.cartList = carts;
	render("#cart-list", cartHTML, state.cartList);
	cartListTotalPrice.textContent = `NT$${finalTotal}`;
});

cartListBottom.addEventListener("click", async (e) => {
	if (e.target.nodeName !== "BUTTON") return;
	const { carts, message, finalTotal } = await deleteAllCartItem();
	state.cartList = carts;
	render("#cart-list", cartHTML, state.cartList);
	cartListTotalPrice.textContent = `NT$${finalTotal}`;
	alert(message);
});

init();
