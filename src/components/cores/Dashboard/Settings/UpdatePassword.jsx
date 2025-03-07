import React, { useRef, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

import IconBtn from '../../../common/IconBtn';

const UpdatePassword = () => {

    const btnRef = useRef(null);

    const btnClick = () => {
        btnRef.current.click();
    }

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <>
        <div className='bg-richblack-800 px-12 p-8 mt-14 rounded-lg border border-richblack-700'>
            <h1 className='text-2xl mb-8'>Password</h1>

            <form action=""
            className='grid grid-cols-2 gap-8'
            >
                <div className='relative flex flex-col gap-2'>
                    <label htmlFor="currpassword">Current Password</label>
                    <input type={`${showOldPassword? "text" : "password"}`}
                    id='currpassword'
                    placeholder='Enter Current Password'
                    className='form-style' />

                    <span 
                    onClick={() => setShowOldPassword((prev) => !prev)}
                    className='absolute right-3 top-[50%] translate-y-[50%] cursor-pointer'>
                        {
                            showOldPassword? (
                                <AiOutlineEyeInvisible />
                            ) : (
                                <AiOutlineEye />
                            )
                        }
                    </span>
                </div>

                <div className='relative flex flex-col gap-2'>
                    <label htmlFor="newpassword">New Password</label>
                    <input type={`${showNewPassword? "text" : "password"}`}
                    id='newpassword' 
                    placeholder='Enter New Password'
                    className='form-style' />

                    <span 
                        onClick={() => setShowNewPassword((prev) => !prev)}
                        className='absolute right-3 top-[50%] translate-y-[50%] cursor-pointer'>
                            {
                                showOldPassword? (
                                    <AiOutlineEyeInvisible />
                                ) : (
                                    <AiOutlineEye />
                                )
                            }
                    </span>
                </div>

                <button
                type='submit'
                className='hidden'
                ref={btnRef}
                >
                    Update
                </button>
            </form>
        </div>

        <div className='flex justify-end gap-x-4 mt-5'>
            <button
            className='px-4 p-2 bg-richblack-500 rounded-lg'
            >Cancel</button>
            <IconBtn
                onClick={btnClick}
                text={"Update"}
            >
                <span>{""}</span>
            </IconBtn>
        </div>
    </>
  )
}

export default UpdatePassword