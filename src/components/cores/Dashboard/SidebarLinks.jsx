import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SidebarLinks = ({link}) => {

    const {user} = useSelector((state) => state.profile);
    // console.log(user);
    console.log(user.accountType);
    console.log(link.type);
  return (
    <div className='flex flex-col'>
        {user?.accountType === link.type ? (
            <div>
                <Link to={link.path}>
                    {link.name}
                </Link>
            </div>
        ) : (<div></div>)}
    </div>
  )
}

export default SidebarLinks