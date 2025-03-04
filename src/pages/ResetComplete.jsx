import React from 'react'
import CTAButton from '../components/cores/HomePage/Button'
import { FaArrowLeft, FaClock } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ResetComplete = () => {
  return (
    <div className='w-11/12 mt-36 flex justify-center items-center '>
        <div className='flex flex-col justify-start w-[30%] gap-5'>
            <h2 className='text-3xl font-medium'>Reset Complete</h2>
            <p className='text-base text-richblack-300'>All done! We have sent an email to yourmailaccount@gmail.com</p>

            <CTAButton active={true} linkto={'/login'}>
                Return to login
            </CTAButton>

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

export default ResetComplete