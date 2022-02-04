import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loggedOut } from '../features/auth/authSlice';
import '../styles/circular.scss';
import { countDevice, loadDevices } from './../store/devicesSlice';
import { sendNotification } from './../store/notifySlice';

function HomePage() {
    const dispatch = useDispatch();
    const count = useSelector((state) => countDevice(dispatch, state));

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(loadDevices());
        }, 5000);
        return () => clearInterval(interval);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleLogout = () => {
        dispatch(loggedOut());
    };

    const handleNotify = () => {
        const data = {
            name: 'Nazmul Alam',
            email: 'nazmul_dipu@yahoo.com',
            repoUrl: 'https://github.com/nazmuldipu/meldcx.git',
            message: "All my years of training were a bonus when I got a job in software industry"
        }
        dispatch(sendNotification(data));
    };

    const getBall = (c, i) => {
        const xPx = (360 / c) * (i - 1);
        return <div key={i} style={
            {
                transform: `rotateZ(${xPx}deg)`
            }
        } ></div>
    }
    return (
        <div className='bg-orange-400 w-screen h-screen flex flex-col'>
            <div className="text-white grow flex justify-center items-center relative">
                <div className="text-center w-20">
                    <div className='text-7xl font-thin'>{count}</div>
                    <div>DEVICES ONLINE</div>
                </div>
                <div className="holder">
                    <div className="preloader">
                        {[...Array(count)].map((elementInArray, index) => (
                            getBall(count, index)
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Navbar */}
            <div className="text-white grow-0 flex justify-center space-x-4 py-4 bg-orange-600 text-sm">
                <button className="bg-slate-50 hover:bg-slate-200 text-black px-4 py-2 rounded-md" onClick={handleNotify} >NOTIFY</button>
                <button className='bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-900' onClick={handleLogout}>
                    LOG OUT
                </button>
            </div>
        </div>
    );
}

export default HomePage;