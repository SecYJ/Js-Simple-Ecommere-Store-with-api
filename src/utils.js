export const arrayPair = (arr) => {
    return arr.reduce((accumulator, { products }) => {
        return [...accumulator, ...products];
    }, []);
};

export const render = (el, markup, data) => {
    const element = document.querySelector(el);
    element.innerHTML = "";
    const htmlMarkup = markup(data);
    element.innerHTML = htmlMarkup;
};

export const renderChart = (data) => {
    if (data.length === 0) {
        document.querySelector("#chart").innerHTML = "";
        return;
    }

    c3.generate({
        bindto: "#chart",
        data: {
            columns: data,
            type: "pie",
        },
        color: {
            pattern: ["#dacbff", "#9D7FEA", "#5434A7", "#301e5f"],
        },
    });
};

export const thousands = (num) => {
    return num
        .toString()
        .split("")
        .reverse()
        .map((item, index) => {
            if (index === 0 || index === num.length - 1) return item;
            if (index % 3 === 0) {
                return `${item},`;
            }
            return item;
        })
        .reverse()
        .join("");
};
