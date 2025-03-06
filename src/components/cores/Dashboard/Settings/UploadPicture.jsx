import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';
import { FiUpload } from "react-icons/fi";

const UploadPicture = () => {

    const {user} = useSelector((state) => state.profile);

    const inputFileRef = useRef(null);

    const handleClick = () => {
        inputFileRef.current.click();
    }

  return (
    <div className='flex gap-x-4 bg-richblack-800 rounded-md border-[1px] border-richblack-700 px-12 p-8 items-center'>
        <img src={user?.image} alt={`Profile-${user?.firstName}`}
        className='aspect-square w-[78px] rounded-full object-cover'
        />
        <div className='flex flex-col gap-2'>
            <p>Change Profile Picture</p>
            <div className='flex gap-3'>
                <input type="file" className='hidden' 
                ref={inputFileRef}
                accept='image/png, image/gif, image/jpeg'
                />
                <button className='cursor-pointer px-5 py-2 bg-richblack-700 text-richblack-50 text-[16px] font-medium rounded-md'
                onClick={handleClick}
                >Select</button>
                <IconBtn text="Upload">
                    <FiUpload />
                </IconBtn>
            </div>
        </div>
    </div>
  )
}

export default UploadPicture