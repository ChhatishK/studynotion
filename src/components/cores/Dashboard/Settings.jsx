import React from 'react'
import UploadPicture from './Settings/UploadPicture'
import ProfileInformation from './Settings/ProfileInformation'
import UpdatePassword from './Settings/UpdatePassword'
import DeleteAccount from './Settings/DeleteAccount'

const Settings = () => {
  return (
    <>

    <h1 className='text-3xl text-richblack-5 mb-14'>Edit Profile</h1>

    <UploadPicture />

    <ProfileInformation />

    <UpdatePassword />

    <DeleteAccount />
        
    </>
  )
}

export default Settings