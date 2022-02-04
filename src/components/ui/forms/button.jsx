import React from "react";

const Button = ({ label, btnType = "button", btnBase, className, loading, ...props }) => {
    let btnClass = '';
    switch (btnBase) {
        case 'primary':
            btnClass = 'text-white font-semibold bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700';
            break;
        case 'secondary':
            btnClass = 'text-white font-semibold bg-gray-500 hover:bg-gray-600 focus:bg-gray-600';
            break;
        case 'success':
            btnClass = 'text-white font-semibold bg-green-600 hover:bg-green-700 focus:bg-green-700';
            break;
        case 'danger':
            btnClass = 'text-white font-semibold bg-red-500 hover:bg-red-700 focus:bg-red-700';
            break;
        case 'warning':
            btnClass = 'text-black font-semiboldbg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-500';
            break;
        case 'info':
            btnClass = 'text-black font-semiboldbg-purple-200 hover:bg-purple-300 focus:bg-purple-300';
            break;
        case 'light':
            btnClass = 'text-black font-semiboldbg-gray-50 hover:bg-gray-100 focus:bg-gray-100';
            break;
        case 'dark':
            btnClass = 'text-white font-semibold bg-black hover:bg-gray-700 focus:bg-gray-700';
            break;
        default:
            btnClass = 'text-white font-semibold bg-purple-600 focus:ring-purple-500 hover:bg-purple-700 focus:bg-purple-600 focus:ring-offset-purple-200';
    }

    return (
        <button type={btnType} className={'px-2 py-1 tracking-wide transition-colors duration-200 transform shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ' + btnClass + ' ' + className} {...props}>
            {loading && <svg className="animate-spin mx-2 h-5 w-5 text-white font-semibold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>}

            {!loading && label}
        </button>
    );
};

export default Button;
