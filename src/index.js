import sweetAlert from "sweetalert";
import "../style.css";
import { fetchInitialData, useFetch } from "./useFetch";
import { showAlert, statusAlert } from "./utils";
import { render } from "./view";

const placeOrderForm = document.querySelector("#pre-order");
const productsFilterSelect = document.querySelector("#products-filter-select");
const productsList = document.querySelector("#products-list");
const cartList = document.querySelector("#cart-list");
const cartListBottom = document.querySelector("#cart-list-bottom");
const cartListTotalPrice = document.querySelector("#cart-list-total-price");
const cartHeader = document.querySelector("#cart-header");

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
            const { origin_price, price, title, images, category, id } =
                product;
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
        cartHeader.classList.add("hidden");
        cartListBottom.classList.remove("flex");
        cartListBottom.classList.add("hidden");
        return `<td class="text-center">当前购物列表为空!</td>`;
    }

    const markup = cartsData.map((cart) => {
        const { id: productId, images, price, title } = cart.product;
        const { id: cartProductId, quantity } = cart;

        return `
            <tr>
                <td width="300">
                    <img src=${images} class="inline-block w-20 h-20" />
                    <p class="w-[14ch] inline-block align-middle ml-4">
                        ${title}
                    </p>
                </td>
                <td></td>
                <td><p>NT$${price}</p></td>
                <td><p>${quantity}</p></td>
                <td><p>NT$${quantity * price}</p></td>
                <td>
                    <button type="button" class="material-icons" data-id=${cartProductId}>clear</button>
                </td>
            </tr>
      `;
    });

    cartHeader.classList.remove("hidden");
    cartListBottom.classList.remove("hidden");
    cartListBottom.classList.add("flex");

    return markup.join("");
};

const init = async () => {
    try {
        const [productsList, cartList] = await fetchInitialData("products");
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
    const filteredData = state.productsList.filter(
        ({ category }) => category === value
    );
    render("#products-list", productMarkup, filteredData);
});

placeOrderForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (state.cartList.length === 0) {
        showAlert("目前购物车为空", "error");
        return;
    }
    const formDetails = new FormData(e.target);

    [...formDetails].forEach((input) => {
        const [key, val] = input;
        if (key === "payment") return;

        const nextSibling = e.target[key].nextElementSibling.classList;
        if (val.trim() === "") nextSibling.remove("hidden");
        else nextSibling.add("hidden");
    });

    const isAllInputsValid = [...formDetails].every(
        ([, val]) => val.trim() !== ""
    );
    if (!isAllInputsValid) return;

    const { status } = await useFetch({
        method: "post",
        url: "/orders",
        data: { data: { user: Object.fromEntries(formDetails) } },
    });

    if (status) {
        sweetAlert({
            text: "订单成功送出😀",
            icon: "success",
        });
    }

    render("#cart-list", cartHTML, []);
    state.cartList = [];
    e.target.reset();
});

productsList.addEventListener("click", async (e) => {
    if (e.target.nodeName !== "BUTTON") return;
    const productId = e.target.dataset.id;
    const isExistInCart = state.cartList.find(
        (item) => item?.product?.id === productId
    );
    let quantity = null;
    !isExistInCart
        ? (quantity = 1)
        : (quantity = parseInt(isExistInCart.quantity) + 1);
    // const { carts, finalTotal } = await addToCart({ quantity, productId });

    const { carts, finalTotal, status, total } = await useFetch({
        method: "post",
        url: "/carts",
        data: {
            data: { quantity, productId },
        },
    });

    // statusAlert({ status, text: "加入购物车成功"})

    state.cartList = carts;
    render("#cart-list", cartHTML, state.cartList);
    cartListTotalPrice.textContent = `NT$${finalTotal}`;
});

cartList.addEventListener("click", async (e) => {
    if (e.target.nodeName !== "BUTTON") return;
    const { carts, finalTotal, total, status } = await useFetch({
        method: "delete",
        url: `/carts/${e.target.dataset.id}`,
    });

    state.cartList = carts;
    cartListTotalPrice.textContent = `NT$${finalTotal}`;
    statusAlert({ status, text: "删除成功", icon: "warning" });
    render("#cart-list", cartHTML, state.cartList);
});

cartListBottom.addEventListener("click", async (e) => {
    if (e.target.nodeName !== "BUTTON") return;
    const {
        carts,
        finalTotal,
        message: text,
        status,
        total,
    } = await useFetch({ method: "delete", url: "/carts" });

    state.cartList = carts;
    cartListTotalPrice.textContent = `NT$${finalTotal}`;
    statusAlert({ status, text, icon: "warning" });
    render("#cart-list", cartHTML, state.cartList);
});

init();
