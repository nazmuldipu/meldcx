import React from "react";
import DynamicHeroIcon from "./DynamicHeroIcon";

const Input = ({ name, label, error, icon, ...rest }) => {
    let iconEle;
    if (icon && icon.length > 0) {
        iconEle = <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DynamicHeroIcon icon={icon} />
        </div>;
    }
    return (
        <div className="mt-1 relative">
            {iconEle}
            <input {...rest} name={name} id={name} className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
    );
};

export default Input;
