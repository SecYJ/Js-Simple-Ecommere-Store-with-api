const useChart = (data, type = "category") => {
    const details = {};
    data.forEach((item) => {
        const { price } = item;
        const itemType = type === "category" ? item.category : item.title;
        details[itemType] = details[itemType] + price || price;
    });

    if (type === "allProduct") {
        const sortedData = Object.entries(details).sort((a, b) => {
            return b[1] - a[1];
        });
        const topSales = sortedData.slice(0, 3);
        const otherSalesTotalPrice = sortedData
            .slice(3)
            .reduce((accumulator, current) => {
                return (accumulator += current[1]);
            }, 0);

        return sortedData.length > 3
            ? [...topSales, ["其他", otherSalesTotalPrice]]
            : [...topSales];
    }

    return Object.entries(details);
};

export default useChart;
