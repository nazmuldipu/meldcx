import React from 'react';
import Joi from "joi-browser";
import { useDispatch, useSelector } from "react-redux";
import { login } from './authSlice';
import useForm from "../../components/ui/forms/useForm";

function LoginPage() {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.auth.error);
    const loading = useSelector((state) => state.auth.loading);

    const schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }).required().label("Email"),
        password: Joi.string().min(5).required().label("Password"),
    };

    const { data, renderInput, renderButton, validateSubmit } = useForm({ schema });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateSubmit(e)) {
            dispatch(login(data));
        }
    };
    return (
        <div className='bg-gray-800 w-screen h-screen flex justify-center items-center'>
            <div className="w-80 bg-white p-4 pb-0 shadow sm:rounded-lg">
                <div className='text-center text-4xl font-thin'>
                    Login
                </div>
                <div className="py-4 text-xs font-medium text-red-500">{error}</div>
                <form className="mb-6" onSubmit={handleSubmit}>
                    {renderInput("email", '', 'text', 'MailIcon')}
                    {renderInput("password", '', "password", 'ShieldExclamationIcon')}
                    <div className='flex justify-center'>
                        {renderButton("LOG IN", "primary", "mt-4 md:mt-8", loading)}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;