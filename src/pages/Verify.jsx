import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaClock } from 'react-icons/fa'
import { FaClockRotateLeft } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { signup } from '../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import OTPInput from 'react-otp-input';

const Verify = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {signupData} = useSelector((state) => state.auth);
    // const {firstName, lastName, email, password, confirmPassword, accountType} = signupData;

    const [otp, setOtp] = useState("");

    // useEffect(() => {
    //     if (!signupData) {
    //         navigate('/signup');
    //     }
    // }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup(firstName, lastName, email, password, confirmPassword, accountType, otp, navigate))
    }

  return (
    <div className='lg:w-11/12 w-screen mt-36 flex justify-center items-center'>
        <div className='flex flex-col justify-start w-[30%] gap-5'>
            <h2 className='text-3xl font-medium'>Verify Email</h2>
            <p className='text-base text-richblack-300'>A Verification code has been sent to your email. Enter the code below.</p>

            <form
             onSubmit={handleSubmit}
             className='flex flex-col'>
                <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    inputType='tel'
                    renderInput={(props) => (
                        <input
                        {...props}
                        
                        placeholder="-"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-[40px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                        />
                    )}
                    containerStyle={{
                        justifyContent: "space-between",
                        gap: "0 6px",
                    }}
                    />

                <button
                type='submit'
                className='w-full bg-yellow-25 px-4 py-2 text-richblack-800 rounded-md mt-5'
                >
                    Verify OTP
                </button>
            </form>

            

            <div className='flex justify-between'>
               
                <Link to={'/login'}  className='flex items-center gap-2'>
                    <FaArrowLeft />
                    <p>Back to Login</p>
                </Link>
               
                <div className='flex items-center gap-2 text-blue-300 cursor-pointer'>
                    <FaClockRotateLeft />
                    <p>Resend it</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Verify