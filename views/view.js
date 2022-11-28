class View {
	#productsList = document.querySelector("#products-list");
	#data = [];

	render(el, data) {
		this.#data = data;
		this.clearHTML(this.#productsList);
		const markup = this.#productMarkup();
		document.querySelector(el).innerHTML = markup;
	}

	#productMarkup() {
		console.log(this.#data);
		return this.#data
			.map((item) => {
				const { origin_price, price, title, images, category } = item;
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
	}

	clearHTML(el) {
		el.innerHTML = "";
	}
}

export default new View();
