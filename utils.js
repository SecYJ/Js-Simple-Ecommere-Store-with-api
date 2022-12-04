import sweetAlert from "sweetalert";

export const showAlert = (text, icon) => sweetAlert({ text, icon });

export const statusAlert = (args) => {
    const { text, icon, status } = args;
    if (status) showAlert(text, icon);
};

export const arrayPair = (arr) => {
    return arr.reduce((accumulator, { products }) => {
        return [...accumulator, ...products]
    }, [])
}