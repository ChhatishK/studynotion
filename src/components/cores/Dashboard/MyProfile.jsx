import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { RiEditBoxLine } from "react-icons/ri";

const MyProfile = () => {

    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    console.log(user);

  return (
    <>
        
        <h1 className='text-3xl font-medium mb-14'>My Profle</h1>

        {/* Section 1 */}
        <div className='w-full flex items-center justify-between bg-richblack-800 px-12 p-8 rounded-lg border border-richblack-500'>
            <div className='flex items-center gap-4'>
                <img src={`${user?.image}`} alt={`Profile-${user?.firstName}`}
                className='aspect-square w-[78px] rounded-full object-cover'
                />
                <div>
                    <p className='text-[22px] font-medium'>{user?.firstName +" "+ user?.lastName}</p>
                    <p className='text-base text-richblack-300'>{user?.email}</p>
                </div>
            </div>

            <IconBtn
                text="Edit"
                onClick={() => {
                    navigate('/dashboard/settings')
                }}
                >
                <RiEditBoxLine />

            </IconBtn>
        </div>

        {/* Section 2 */}

        <div className='flex flex-col gap-y-10 bg-richblack-800 px-12 p-8 rounded-lg border border-richblack-500 my-10'>
            <div className='flex justify-between'>
                <p className='text-xl font-semibold text-richblack-5'>About</p>
                <IconBtn
                text='Edit'
                onClick={() => {
                    navigate('/dashboard/settings')
                }}>
                    <RiEditBoxLine />
                </IconBtn>
            </div>
            <p className='text-richblack-300 font-medium text-[14px]'>{user?.additionalDetails?.about ?? "Write Something about yourself"}</p>
        </div>

        {/* Section 3 */}

        <div className='flex flex-col gap-y-10 bg-richblack-800 px-12 p-8 rounded-lg border border-richblack-500'>
            <div className='flex justify-between'>
                <p className='text-xl font-semibold text-richblack-5'>Personal Details</p>
                <IconBtn
                text='Edit'
                onClick={() => {
                    navigate("/dashboard/settings")
                }}>
                    <RiEditBoxLine />
                </IconBtn>
            </div>

            <div className='grid grid-cols-2 gap-5 text-richblack-5'>
                <div className='flex flex-col gap-y-2'>
                    <p className='text-richblack-400 text-[14px]'>First Name</p>
                    <p className=''>{user?.firstName}</p>
                </div>
                <div className='flex flex-col gap-y-2'>
                    <p className='text-richblack-400 text-[14px]'>Last Name</p>
                    <p>{user?.lastName}</p>
                </div>
                <div className='flex flex-col gap-y-2'>
                    <p className='text-richblack-400 text-[14px]'>Email</p>
                    <p>{user?.email}</p>
                </div>
                <div className='flex flex-col gap-y-2'>
                    <p className='text-richblack-400 text-[14px]'>Phone Number</p>
                    <p>{user?.additionalDetails?.contactNumber ?? "Yet to be added"}</p>
                </div>
                <div className='flex flex-col gap-y-2'>
                    <p className='text-richblack-400 text-[14px]'>Gender</p>
                    <p>{user?.additionalDetails?.gender ?? "Yet to be added"}</p>
                </div>
                <div className='flex flex-col gap-y-2'>
                    <p className='text-richblack-400 text-[14px]'>Date of Birth</p>
                    <p>{user?.additionalDetails?.dateOfBirth ?? "Yet to be added"}</p>
                </div>
            </div>
        </div>
        
    </>
  )
}

export default MyProfile
