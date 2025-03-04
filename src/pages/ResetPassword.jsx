import React, { useState } from 'react'
import CTAButton from '../components/cores/HomePage/Button'
import { FaArrowLeft, FaClock } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { sendresetlink } from '../services/operations/authAPI'

const ResetPassword = () => {


    // email validation
    function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateEmail(email)) {
            dispatch(sendresetlink(email, navigate));
        } else {
            toast.error("Invalid email");
        }
    }

  return (
    <div className='w-11/12 mt-36 flex justify-center items-center '>
        <div className='flex flex-col justify-start w-[30%] gap-5'>
            <h2 className='text-3xl font-medium'>Reset Your password</h2>
            <p className='text-base text-richblack-300'>Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery</p>

            <form 
            onSubmit={handleSubmit}
            className='flex  flex-col gap-3 justify-between'>
                <p className='relative'>Email Address <sup className='absolute top-2 text-pink-300'>*</sup></p>
                <input 
                    type="email" 
                    required
                    onChange={handleChange}
                    className='px-3 py-3 rounded-lg bg-richblack-800' 
                    placeholder='enter email address' />

                <button
                className='bg-yellow-200 w-full text-richblack-800 py-2 rounded-lg transition-all duration-200 hover:scale-95'
                >
                    Reset Password
                </button>
            </form>

            

            <div className='flex justify-between'>
               
                <Link to={'/login'}  className='flex items-center gap-2'>
                    <FaArrowLeft />
                    <p>Back to Login</p>
                </Link>
               
            </div>
        </div>
    </div>
  )
}

export default ResetPassword