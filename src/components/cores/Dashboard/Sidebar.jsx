import React from 'react'
import {sidebarLinks} from '../../../data/dashboard-links';
import SidebarLinks from './SidebarLinks';
import { Link } from 'react-router-dom';
import { CiSettings } from 'react-icons/ci';
import { VscSignOut } from 'react-icons/vsc';
import { CgProfile } from 'react-icons/cg';


const Sidebar = () => {

    console.log(SidebarLinks)
  return (
    <div>
        <div className='w-[220px] h-[685px] border-r border-richblack-700 pl-10 text-[14px] text-richblack-300 flex-col gap-4 bg-richblack-800'>
            {/* Sidebar */}
            <div className='flex flex-col gap-3 pt-10'>
              <Link to='/dashboard/my-profile' className='flex gap-2'>
                <CgProfile />
                <span>My Profile</span>
              </Link>
              {sidebarLinks.map((link, index) => (
                <SidebarLinks key={index} link={link} />
              ))}
            </div>
            
            <div className='h-[1px] w-full bg-richblack-700 mt-4'></div>

            <div className='flex flex-col gap-3 mt-5 '>
              <Link className='flex gap-3 items-center'>
                <CiSettings size={20} />
                <span>Settings</span>
              </Link>

              <Link className='flex gap-3 items-center'>
                <VscSignOut size={20} />
                <span>Logout</span>
              </Link>
            </div>

        </div>
    </div>
  )
}

export default Sidebar