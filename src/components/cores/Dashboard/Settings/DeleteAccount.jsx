import React from 'react'
import { FiTrash2 } from "react-icons/fi"
import {deleteAccount} from '../../../../services/operations/settingAPI'
import { useDispatch, useSelector } from 'react-redux'

const DeleteAccount = () => {

    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);

  return (
    <>
        <div className='my-20 bg-pink-900 rounded-lg px-12 p-8 flex gap-5 border-pink-700 border'>
            <div className='flex aspect-square justify-center items-center w-14 h-14 bg-pink-700 rounded-full'>
                <FiTrash2 className='text-3xl text-pink-200' />
            </div>

            <div className='flex flex-col'>
                <h2 className='text-lg font-semibol mb-4'>Delete Account</h2>
                <div className="w-3/5 text-pink-25">
                    <p>Would you like to delete account?</p>
                    <p>
                    This account may contain Paid Courses. Deleting your account is
                    permanent and will remove all the contain associated with it.
                    </p>
                </div>

                <span 
                onClick={() => dispatch(deleteAccount(token))}
                className='text-pink-300 italic underline cursor-pointer mt-5'>I want to delete my account</span>
            </div>
        </div>
    </>
  )
}

export default DeleteAccount