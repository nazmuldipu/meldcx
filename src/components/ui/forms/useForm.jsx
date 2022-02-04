import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Button from './button';

const useForm = ({ schema }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const initForm = (obj) => {
        const formData = {};
        Object.keys(schema).forEach((key) => {
            formData[key] = obj[key];
        });
        setData(formData);
    };

    const handleChange = ({ currentTarget: input }) => {
        if (input.type === "checkbox") input.value = input.checked;

        const faults = { ...errors };
        const errorMessage = validateProperty(input);
        if (errorMessage) faults[input.name] = errorMessage;
        else delete faults[input.name];
        setErrors(faults);

        const formData = { ...data };
        switch (input.type) {
            case "checkbox":
                formData[input.name] = JSON.parse(input.value);
                break;
            case "number":
                formData[input.name] = Number(input.value);
                break;
            case "textarea":
                let value = input.value;
                if (JSON.parse(input.dataset.ascii)) {
                    console.log("optimizing");
                    value = value.replace(
                        /[^A-Za-z 0-9 .,?""!@#$%^&*()-_=+;:<>/\\|}{[\]`~]*/g,
                        ""
                    );
                    value = value.replace(/ +(?= )/g, "");
                }
                formData[input.name] = value;
                break;

            default:
                formData[input.name] = input.value;
        }
        setData(formData);
    };

    const validateSubmit = (e) => {
        e.preventDefault();
        const fErrors = validateForm();
        setErrors(fErrors || {});
        if (fErrors) return false;
        return true;
    };

    const validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schemaP = { [name]: schema[name] };
        const { error } = Joi.validate(obj, schemaP);
        if (!error) return null;
        return error ? error.details[0].message : null;
    };

    const validateForm = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(data, schema, options);
        if (!error) return null;

        const formErrors = {};
        for (let item of error.details) {
            formErrors[item.path[0]] = item.message;
        }
        return formErrors;
    };

    const renderInput = (name, label, type = "text", icon = null) => {
        return (
            <Input
                type={type}
                name={name}
                value={data[name] || ""}
                label={label}
                icon={icon}
                onChange={handleChange}
                error={errors[name]}
            />
        );
    };

    const renderButton = (label, btnBase = 'primary', className = '', loading = false, btnType = 'submit') => {
        return (
            <Button label={label} btnType={btnType} btnBase={btnBase} className={className} loading={loading} />
        );
    };



    return {
        data,
        initForm,
        validateSubmit,
        validateForm,
        renderInput,
        renderButton
    };
};

export default useForm;
