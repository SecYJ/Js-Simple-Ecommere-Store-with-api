import "./style.css";
import { state, getInitialData } from "./model";
import { urlEndPoints } from "./useFetch";
import view from "./views/view";

const productMarkup = (productsData) => {
	return productsData
		.map((product) => {
			const { origin_price, price, title, images, category } = product;
			return `
                <li class="relative flex flex-col">
                    <div class="absolute top-2 py-2 px-6 bg-black text-white right-0">
                        ${category}
                    </div>
                    <div>
                        <img src=${images} alt="" class="h-full w-full" />
                        <button
                            type="button"
                            class="bg-black text-white w-full py-3 hover:bg-black/80 transition-colors"
                        >
                            加入購物車
                        </button>
                    </div>
                    <div class="mt-2 grow grid grid-rows-[1fr_auto_auto]">
                        <h3 class="mb-2">${title}</h3>
                        <p class="line-through">NT$${origin_price}</p>
                        <strong class="text-[1.75rem]">NT$${price}</strong>
                    </div>
                </li>            
            `;
		})
		.join("");
};

// const cartHTML = (cartsData) => {
//     const markup = cartsData.map((cart) => {
//         const { }
//         return `
//         <li
//             class="grid grid-cols-[repeat(6,auto)] items-center border-b border-[#bfbfbf] pb-5"
//         >
//             <img src=${} class="mr-[15px]" alt="" />
//             <p class="w-[14ch] mr-[30px]">Antony 雙人床架／雙人加大</p>
//             <p class="mr-[90px]">NT$12,000</p>
//             <p class="mr-[178px]">1</p>
//             <p class="mr-[90px]">NT$12,000</p>
//             <button type="button" class="material-icons">clear</button>
//         </li>
//       `

//     })

//     render(markup)
// }

// const render = (el, htmlMarkup, data) => {
// 	const domEl = document.querySelector(`${el}`);
// 	const markup = htmlMarkup(data);
// 	console.log(markup);
// 	domEl.innerHTML = "";
// 	domEl.innerHTML = markup;
// };

const init = async () => {
	await getInitialData(urlEndPoints);
	view.render("#products-list", state.products);
	// try {
	// 	const [productsData, cartsData] = await Promise.allSettled(
	// 		urlEndPoints.map((endpoint) => fetchData(endpoint))
	// 	);

	// 	render("#products-list", productMarkup, productsData.value.products);
	// } catch (error) {
	// 	console.error(error);
	// }
};

init();
