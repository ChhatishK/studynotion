import React, {useRef, useState} from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { AiOutlineCaretDown } from 'react-icons/ai';
import { VscDashboard, VscSignOut } from 'react-icons/vsc';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { useNavigate, Link } from 'react-router-dom';
import {logout} from '../../../services/operations/authAPI'

const ProfileDropDown = () => {

  const {user} = useSelector((state) => state.profile);
  const [open, setOpen] = useState(false);
  const ref = useRef(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return;
  // console.log("user: ",user)
  // console.log(user._id)

  return (
    <button className='relative' onClick={() => setOpen(true)}>

      <div className='flex items-center gap-x-1'>
        <img 
        src={user?.image} 
        alt={`profile-${user?.firstName}`}
        className='aspect-square w-[30px] rounded-full object-cover'
        />
        <AiOutlineCaretDown  className="text-sm text-richblack-100" />
      </div>

      {
        open && (
          <div
            onClick={(e) => e.stopPropagation()}
            className='absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800'
            ref={ref}
            >

            <Link to='/dashboard/my-profile' onClick={() => setOpen(false)}>
              <div className='flex gap-x-1 w-full px-3 py-3 text-richblack-100 hover:bg-richblack-300 hover:text-richblack-25 text-sm'>
              <VscDashboard className="text-lg" />
              Dashboard
              </div>
            </Link>

            <div
              onClick={() => {
                dispatch(logout(navigate));
                setOpen(false);
              }}
              className='flex gap-x-1 w-full px-[10px] py-[12px] text-richblack-100 hover:bg-richblack-300 hover:text-richblack-25 text-sm'
            > 

              <VscSignOut className='text-lg' />
              Logout

            </div>
          </div>
        )
      }


    </button>
  )
}

export default ProfileDropDown