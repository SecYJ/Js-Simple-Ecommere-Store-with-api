import { render, renderChart } from "./view";
import { useFetch } from "./useFetch";
import "./style.css";
import { arrayPair, statusAlert } from "./utils";
import useChart from "./useChart";

const orderList = document.querySelector("#order-list");
const clearCartBtn = document.querySelector("#clear-cart");
const table = document.querySelector("#order-table");
const msg = document.querySelector("#no-order-msg");
const toggleChartBtn = document.querySelector("#toggle-chart");
const functionBar = document.querySelector("#function-bar");

const state = {
    chartData: [],
    chartType: "category",
};

const markup = (data) => {
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
                <td>${new Intl.DateTimeFormat(navigator.language).format(
                    new Date(createdAt * 1000)
                )}</td>
                <td>
                    <a
                        href="javascript:;"
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
                        class="delete-order w-max bg-danger p-3 text-white hover:bg-danger/80"
                        data-id=${id}
                    >
                        删除
                    </button>
                </td>
            </tr>
        `;
        })
        .join("");
};

const initialDOM = () => {
    table.classList.add("hidden");
    functionBar.classList.add("hidden");
    msg.classList.remove("hidden");
    title.textContent = "";
};

const fetchCustomersOrder = async () => {
    const { orders } = await useFetch("/orders", true);

    if (orders.length === 0) return initialDOM();

    table.classList.remove("hidden");
    clearCartBtn.classList.remove("hidden");
    functionBar.classList.remove("hidden");
    title.textContent = "全產品類別營收比重";

    const customerOrderProducts = orders.reduce((accumulator, { products }) => {
        return [...accumulator, ...products];
    }, []);

    state.chartData = customerOrderProducts;
    renderChart(useChart(customerOrderProducts));
    renderOrderList(orders);
};

orderList.addEventListener("click", async (e) => {
    if (e.target.classList.contains("update-paid")) {
        e.preventDefault();
        const { id, paid } = e.target.dataset;
        const config = {
            method: "put",
            url: "orders",
            data: {
                data: { id, paid: paid === "true" ? false : true },
            },
        };
        const { status, orders } = await useFetch(config, true);
        statusAlert({ status, text: "订单状态已更新", icon: "success" });
        renderOrderList(orders);
    }

    if (e.target.classList.contains("delete-order")) {
        const config = {
            url: `/orders/${e.target.dataset.id}`,
            method: "delete",
        };

        const { status, orders } = await useFetch(config, true);
        const data = arrayPair(orders);
        state.chartData = data;
        if (orders.length === 0) initialDOM();
        renderChart(useChart(data, state.chartType));
        renderOrderList(orders);
        statusAlert({ status, text: "删除成功", icon: "error" });
    }
});

clearCartBtn.addEventListener("click", async () => {
    const config = { method: "delete", url: "/orders" };
    const { status, orders, message: text } = await useFetch(config, true);
    if (status) initialDOM();
    statusAlert({ text, status });
    renderChart(orders);
});

toggleChartBtn.addEventListener("click", (e) => {
    const { chartType, chartData: data } = state;
    state.chartType = chartType === "category" ? "allProduct" : "category";
    e.target.textContent = chartType === "category" ? "品項" : "类别";
    renderChart(useChart(data, state.chartType));
});

const renderOrderList = (data) => render("#order-list", markup, data);

fetchCustomersOrder();
