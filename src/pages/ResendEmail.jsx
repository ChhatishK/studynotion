import React from 'react'
import { FaArrowLeft, FaClock } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { sendresetlink } from '../services/operations/authAPI'

const ResendEmail = () => {

    const {user} = useSelector((state) => state.profile);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = () => {
        dispatch(sendresetlink(user.email, navigate));
    }

  return (
    <div className='w-11/12 mt-36 flex justify-center items-center '>
        <div className='flex flex-col justify-start w-[30%] gap-5'>
            <h2 className='text-3xl font-medium'>Reset Your password</h2>
            <p className='text-base text-richblack-300'>We have sent the reset password link to {user?.email}</p>

            <button 
            className='py-2 bg-yellow-100 text-richblack-800 transition-all duration-200 scale-95 rounded-lg'
            onClick={handleSubmit}
            >
                Resend Email
            </button>

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

export default ResendEmail