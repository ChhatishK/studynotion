import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProfileDropDown from '../cores/Auth/ProfileDropDown'
import { IoArrowForward } from 'react-icons/io5'
const MenuDropDown = ({setMenuVisibility}) => {

    const {token} = useSelector((state) => state.auth)
  return (
    <div className={`w-full absolute top-0 bg-richblack-800 p-6 right-0 transition-all duration-700 ease-out`}>
        <ul className='text-xl text-richblack-25 flex flex-col gap-3 z-[1000]'>
            <li>
                <Link to='/'>
                    <div onClick={() => setMenuVisibility(false)} className='flex justify-between border-b pb-2 border-richblack-500 items-center hover:scale-95'>
                        <span>Home</span>
                        <IoArrowForward size={25} />
                    </div>
                </Link>
            </li>
            <li>
                <Link to='/about'>
                    <div onClick={() => setMenuVisibility(false)} className='flex justify-between border-b pb-2 border-richblack-500 items-center hover:scale-95'>
                        <span>About us</span>
                        <IoArrowForward size={25} />
                    </div>
                </Link>
            </li>
            <li>
                <Link to='/contact'>
                    <div onClick={() => setMenuVisibility(false)} className='flex justify-between border-b pb-2 border-richblack-500 items-center hover:scale-95'>
                        <span>Contact us</span>
                        <IoArrowForward size={25} />
                    </div>
                </Link>
            </li>
            <div>
            <div className='flex gap-6 items-center mt-2'>

                {
                    token === null && (
                        <Link to='/login' className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            <button>Log in</button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to='/signup' className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            <button>Sign Up</button>
                        </Link>
                    )
                }
                {
                    token !== null && <ProfileDropDown />
                    
                }

                </div>
            </div>
        </ul>
    </div>
  )
}

export default MenuDropDown