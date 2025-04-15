import React, { useState } from 'react'
import {sidebarLinks} from '../../../data/dashboard-links';
import SidebarLinks from './SidebarLinks';

import {logout} from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc';
import ConfirmModal from '../../common/ConfirmModal';


const Sidebar = () => {

  const {user, loading: profileLoading} = useSelector((state) => state.profile);

  const {loading: authLoading} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate= useNavigate();

  const [confirmModal, setConfirmModal] = useState(null);

  if (profileLoading || authLoading) {
    return (
      <div className='mt-10'>
        Loading...
      </div>
    )
  }
  
  return (
    <div>
        <div className='relative lg:flex hidden flex-col min-w-[222px] h-[calc(100vh-3.5rem)] pt-10 border-r border-richblack-700 text-richblack-300  bg-richblack-800'>
            {/* Sidebar */}

            <div className='flex flex-col'>
                {
                  sidebarLinks.map((link) => {
                    if (link.type && user?.accountType !== link.type) return null;

                    return (
                      <SidebarLinks link={link} iconName={link.icon} key={link.id}/>
                    )
                  })
                }
            </div>

            <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>

            <div className='flex flex-col'>
                <SidebarLinks link={{name: "Settings", path: "dashboard/settings"}} iconName="VscSettingsGear" />

                <button
                  onClick={() => setConfirmModal({
                    text1: "Are Your Sure?",
                    text2: "You will be logged out of your Account",
                    btn1Text: "Logout",
                    btn2Text: "Cancel",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmModal(null)
                  })}

                >
                  
                  <div className='absolute left-0 right-0 flex items-center gap-x-2 pl-8 py-2 hover:bg-richblack-700'>
                    <VscSignOut className='text-lg' />
                    <span>Logout</span>
                  </div>

                </button>
            </div>
        </div>

        {
        confirmModal && <ConfirmModal modalData={confirmModal} />
        }

    </div>
  )
}

export default Sidebar