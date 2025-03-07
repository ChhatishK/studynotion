import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';
import { FiUpload } from "react-icons/fi";
import {updateDisplayPicture} from '../../../../services/operations/settingAPI';
import toast from 'react-hot-toast';

const UploadPicture = () => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);

    const [ImageFile, setImageFile] = useState(null);
    const [prevFile, setPrevFile] = useState(null);
    const dispatch = useDispatch();

    const inputFileRef = useRef(null);

    const handleClick = () => {
        inputFileRef.current.click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // console.log(file);
        if (file) {
            setImageFile(file);
            prevfile(file);
        }
    } 

    const prevfile = (file) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPrevFile(reader.result);
        }
    }

    const handleSubmit = () => {
        const toastId = toast.loading("Loading...");
        try {
            const formData = new FormData();
            formData.append('profilePicture', ImageFile);
            dispatch(updateDisplayPicture(token, formData));
        } catch (error) {
            console.log(error);
        }
        toast.dismiss(toastId);
    }
    

  return (
    <div className='flex gap-x-4 bg-richblack-800 rounded-md border-[1px] mb-14 border-richblack-700 px-12 p-8 items-center'>
        <img src={prevFile || user?.image} alt={`Profile-${user?.firstName}`}
        className='aspect-square w-[78px] rounded-full object-cover'
        />
        <div className='flex flex-col gap-2'>
            <p>Change Profile Picture</p>
            <div className='flex gap-3'>
                <input type="file" className='hidden' 
                ref={inputFileRef}
                onChange={handleFileChange}
                accept='image/png, image/gif, image/jpeg'
                />
                <button className='cursor-pointer px-5 py-2 bg-richblack-700 text-richblack-50 text-[16px] font-medium rounded-md'
                onClick={handleClick}
                >Select</button>
                <IconBtn
                onClick={() => handleSubmit()}
                text="Upload">
                    <FiUpload />
                </IconBtn>
            </div>
        </div>
    </div>
  )
}

export default UploadPicture