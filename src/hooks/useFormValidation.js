import { validate } from "validate.js";

const useFormValidation = (formEl) => {
    const constraints = {
        name: {
            presence: {
                message: "姓名栏位不得为空",
            },
        },

        tel: {
            presence: {
                message: "电话栏位不得为空",
            },
            format: {
                pattern: "[0-9]+",
                flags: "i",
                message: "电话号码必须为 0-9",
            },
            length: {
                minimum: 10,
                maximum: 11,
                tooShort: "电话号码最短长度为%{count}个号码",
                tooLong: "电话号码最大长度为%{count}个号码",
            },
        },
        email: {
            presence: {
                message: "邮箱栏位不得为空",
            },
            email: {
                message: "请确保邮箱格式正确",
            },
        },
        address: {
            presence: {
                message: "地址栏位不得为空",
            },
        },
    };

    const results = validate(formEl, constraints);

    return results ? Object.entries(results) : results;
};

export default useFormValidation;
