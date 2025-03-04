import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { resetPassword } from "../services/operations/authAPI";

const ChooseNewPassword = () => {

    const url = (window.location.href).split('/');
   
    const token = url[url.length-1];

    const [newPassword, setNewPassword] = useState({
        password:"",
        confirmPassword: ""
    });

    const [color, setColor] = useState({
        lowercase: false,
        uppercase: false,
        number: false,
        special: false,
        length: false,
    })

    let {lowercase, uppercase, number, special, length} = color;

    const changeHandler = (e) => {
        setNewPassword((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        
        // newPassword.includes(/\d/)? color.number = true : color.number = false;
        // newPassword.includes(/[A-Z]/)? color.uppercase = true: color.uppercase = false;
        // newPassword.includes(/[a-z]/)? color.lowercase = true : color.lowercase = false;
        // newPassword.includes(/[^A-Za-z0-9]/)? color.special = true : color.special = false
        // newPassword.length >= 8 ? color.length = true : color.length = false;
    }

    const {password, confirmPassword} = newPassword;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            dispatch(resetPassword(password, confirmPassword, token, navigate))
        } else {
            toast.error("confirm password not matched!")
        }
    }

    return (
        <div className="mx-auto w-11/12 mt-24 flex justify-center items-center ">
            <div className="flex flex-col justify-start w-[30%] gap-5">
                <h2 className="text-3xl font-medium">Choose New Password</h2>
                <p className="text-base text-richblack-300">
                    Almost done! Enter your new password and you're all set.
                </p>

                <form
                onSubmit={handleSubmit}
                 className="flex  flex-col gap-3 justify-between">
                    <p className="relative">
                        New Password{" "}
                        <sup className="absolute top-2 text-pink-300">*</sup>
                    </p>
                    <input
                        type="text"
                        value={newPassword.password}
                        onChange={changeHandler}
                        name="password"
                        className="px-3 py-3 rounded-lg bg-richblack-800"
                        placeholder="enter new password"
                    />
                    <p className="relative">
                        Confirm New Password{" "}
                        <sup className="absolute top-2 text-pink-300">*</sup>
                    </p>
                    <input
                        type="text"
                        value={newPassword.confirmPassword}
                        name="confirmPassword"
                        onChange={changeHandler}
                        className="px-3 py-3 rounded-lg bg-richblack-800"
                        placeholder="enter confirm password"
                    />
                </form>

                <div className="flex flex-wrap gap-4">
                    <div className={`flex items-center gap-3`}>
                        <div
                            className={`text-richblack-900 w-[20px] h-[20px] rounded-full ${lowercase? "bg-caribbeangreen-100": "bg-white"} flex justify-center items-center`}
                        >
                            <TiTick />
                        </div>
                        <p>One lowercasae character</p>
                    </div>
                    <div className={`flex items-center gap-3`}>
                        <div
                            className={`text-richblack-900 w-[20px] h-[20px] rounded-full ${special? "bg-caribbeangreen-100": "bg-white"} flex justify-center items-center`}
                        >
                            <TiTick />
                        </div>
                        <p>One special character</p>
                    </div>
                    <div className={`flex items-center gap-3`}>
                        <div
                            className={`text-richblack-900 w-[20px] h-[20px] rounded-full ${uppercase? "bg-caribbeangreen-100": "bg-white"} flex justify-center items-center`}
                        >
                            <TiTick />
                        </div>
                        <p>One uppercase character</p>
                    </div>
                    <div className={`flex items-center gap-3`}>
                        <div
                            className={`text-richblack-900 w-[20px] h-[20px] rounded-full ${length? "bg-caribbeangreen-100": "bg-white"} flex justify-center items-center`}
                        >
                            <TiTick />
                        </div>
                        <p>8 character minimum</p>
                    </div>
                    <div className={`flex items-center gap-3`}>
                        <div
                            className={`text-richblack-900 w-[20px] h-[20px] rounded-full ${number? "bg-caribbeangreen-100": "bg-white"} flex justify-center items-center`}
                        >
                            <TiTick />
                        </div>
                        <p>One number</p>
                    </div>
                </div>

                <button
                onClick={handleSubmit}
                className="py-2 bg-yellow-100 text-richblack-800 w-full rounded-lg transition-all duration-200 scale-95"
                >
                    Reset Password
                </button>

                <div className="flex justify-between">
                    <Link to={"/login"} className="flex items-center gap-2">
                        <FaArrowLeft />
                        <p>Back to Login</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ChooseNewPassword;
