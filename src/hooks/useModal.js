import sweetAlert from "sweetalert";

const useModal = async ({ text, type = "", icon = "success" }) => {
    if (type === "decision") {
        const userSelectOption = await sweetAlert({
            text,
            dangerMode: true,
            icon,
            buttons: {
                confirm: {
                    text: "Delete",
                    icon: "error",
                },
                cancel: true,
            },
        });

        return userSelectOption;
    }

    sweetAlert({ text, icon });
};

export default useModal;
