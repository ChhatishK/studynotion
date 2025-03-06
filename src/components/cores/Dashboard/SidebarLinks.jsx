import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { matchPath, NavLink, useLocation } from 'react-router-dom'
import * as Icons from 'react-icons/vsc'

const SidebarLinks = ({link, iconName}) => {

    const {user} = useSelector((state) => state.profile);
    // console.log(user);
    console.log(user.accountType);
    console.log(link.type);

    const Icon = Icons[iconName]
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path: route}, location.pathname)
    }

  return (
    <NavLink
    to={link.path}
    // onClick={}
    className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0"}`}
    >

        <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}>

        </span>
        <div className={`flex items-center gap-x-2 ${matchRoute(link.path) ? "text-yellow-50" : ""}`}>
            <Icon className='text-lg' />
            <span>{link.name}</span>

        </div>


    </NavLink>
  )
}

export default SidebarLinks