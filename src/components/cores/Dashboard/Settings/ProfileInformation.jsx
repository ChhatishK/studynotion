import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../common/IconBtn'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../../../../services/operations/settingAPI'

const ProfileInformation = () => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const btnRef = useRef(null);

    const btnClick = () => {
        btnRef.current.click();
    }

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const submitFormData = async (data) => {
        try {
            const res = await updateProfile(token, data);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <>
        <div className='border border-richblack-700 rounded-lg px-12 p-8 bg-richblack-800 flex flex-col gap-8'>

            <h1 className='text-2xl text-richblack-5'>Profile Information</h1>

            <form 
            onSubmit={handleSubmit(submitFormData)}
            className='grid grid-cols-2 gap-6'
            >

                <div className='flex flex-col gap-2'>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id='firstName'
                    name='firstName' 
                    defaultValue={user?.firstName} 
                    className='form-style'
                    {...register("firstName", {required: true})}
                    />
                    {
                        errors.firstName && (
                            <span className='text-pink-700'>Please enter your first name</span>
                        )
                    }
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id='lastName' 
                    name='lastName'
                    defaultValue={user?.lastName}  
                    className='form-style'
                    {...register('lastName', {required: true})}
                    />

                    {
                        errors.lastname && (
                            <span className='text-pink-700'>Please enter your last name</span>
                        )
                    }
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="dob">Date Of Birth</label>
                    <input type="date"
                    name='dob'
                    id='dob' 
                    // defaultValue={user?.additionalDetails?.dateOfBirth}
                    className='form-style'
                    {...register('dob', {
                        required: {value: true, message: "Please choose your date of birth"},
                        max: {value: new Date().toISOString().split("T")[0], message: ""}
                    })}

                    defaultValue={user?.additionalDetails?.dateOfBirth}
                    />

                    {errors.dob && (
                        <span className='text-pink-700'>{errors.dob.message}</span>
                    )}
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" 
                    id="gender" 
                    defaultValue={user?.additionalDetails?.gender}
                    className='form-style'
                    {...register('gender')}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-Binary">Non-Binary</option>
                        <option value="Prefer Not to say">Prefer Not to say</option>
                        <option value="Other">Other</option>
                    </select>

                    {errors.gender && (
                        <span className='text-pink-700'>{errors.gender.message}</span>
                    )}
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="contactNumber">Contact Number</label>
                    <input type="number" id='contactNumber' 
                    placeholder='Enter contact number'
                    defaultValue={user?.additionalDetails?.contactNumber}
                    name='contactNumber'
                    className='form-style'
                    {...register('contactNumber', {
                        required: {value: true, message: "Please enter your phone number."},
                        maxLength: {value:10, message: "Invalid phone number."},
                        minLength: {value: 10, message: "Invalid phone number."}
                    })}
                    />

                    {errors.contactNumber && (
                        <span className='text-pink-700'>{errors.contactNumber.message}</span>
                    )}
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="about">About</label>
                    <input type="text" id='about' 
                    name='about'
                    defaultValue={user?.additionalDetails?.about}
                    placeholder='Enter Bio Details'
                    className='form-style'
                    {...register('about')}
                    />

                    {errors.about && (
                        <span className='text-pink-700'>{errors.about.message}</span>
                    )}
                </div>

                <button
                type='Submit'
                ref={btnRef}
                className='hidden'
                >
                    Save
                </button>

            </form>


        </div>
        <div className='flex justify-end gap-x-4 mt-5'>
            <button
            className='px-4 p-2 bg-richblack-500 rounded-lg hover:scale-95'
            onClick={() => navigate('/dashboard/my-profile')}
            >Cancel</button>
            <IconBtn
                onClick={btnClick}
                text={"Save"}
            >
                <span>{""}</span>
            </IconBtn>
        </div>
    </>
  )
}

export default ProfileInformation