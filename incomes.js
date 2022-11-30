import { render, renderChart } from "./view";
import { clearCart, getOrders, updateOrderStatus } from "./useFetch";
import "./style.css";

const orderList = document.querySelector("#order-list");
const clearCartBtn = document.querySelector("#clear-cart");

const markup = (data) => {
    // if (data.length === 0) {
    //     const msg = document.querySelector("#no-order-msg");
    //     const table = document.querySelector("#order-table");
    //     msg.classList.remove("hidden");
    //     table.classList.add("hidden");
    //     return;
    //     // return `
    //     //     <h2 class="text-center text-2xl" id="no-order-msg">
    //     //         目前没有任何订单
    //     //     </h2>
    //     // `;
    // }

    // table.classList.remove("hidden");

    return data
        .map((item) => {
            const { id, products, paid, createdAt, user } = item;
            const { name, tel, address, email } = user;

            return `
            <tr>
                <td>${id}</td>
                <td>${name} ${tel}</td>
                <td>${address}</td>
                <td>${email}</td>
                <td>${products
                    .map((product) => {
                        const { title, quantity } = product;
                        return `<p>${title} : ${quantity}</p>`;
                    })
                    .join("")}</td>
                <td>${createdAt}</td>
                <td>
                    <a
                        href="#"
                        class="update-paid block w-max text-[#0067c2] underline"
                        data-id=${id}
                        data-paid=${paid}
                    >
                        ${paid ? "已處理" : "未處理"}
                    </a>
                </td>
                <td>
                    <button
                        type="button"
                        class="w-max bg-danger p-3 text-white hover:bg-danger/80"
                    >
                        删除
                    </button>
                </td>
            </tr>
        `;
        })
        .join("");
};

const fetchCustomersOrder = async () => {
    const orders = await getOrders();

    if (orders.length === 0) {
        render("#order-content", markup, orders);
        return;
    }

    const customerOrderProducts = orders.reduce((accumulator, { products }) => {
        return [...accumulator, ...products];
    }, []);

    const qtyObj = {};
    customerOrderProducts.forEach((item) => {
        const { title, quantity } = item;
        qtyObj[title] = qtyObj[title] + quantity || quantity;
    });

    renderChart(Object.entries(qtyObj));
    render("#order-list", markup, orders);
};

fetchCustomersOrder();

orderList.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("update-paid")) return;
    const { id, paid } = e.target.dataset;
    console.log(id, !!paid);
    const data = await updateOrderStatus(id, !!paid);
});

clearCartBtn.addEventListener("click", async (e) => {
    const data = await clearCart();
    // render("#order-list", )
});

// const updateOrderStatus = async () => {

// }
