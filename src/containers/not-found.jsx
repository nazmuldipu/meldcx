import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="bg-gray-100 w-screen h-screen flex justify-center items-center">
            <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
                <div className="max-w-md">
                    <div className="text-5xl font-dark font-bold">404</div>
                    <p className="text-2xl md:text-3xl font-light leading-normal">Sorry we couldn't find this page.</p>
                    <p className="mb-8">But dont worry, you can find plenty of other things on our homepage.</p>
                    <Link to="/" className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">Back to Home Page</Link>
                </div>
                <div className="max-w-lg">
                    <img src="/lost.svg" alt="404" />
                </div>
            </div>
        </div>
    );
}

export default NotFound;