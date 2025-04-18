import React, { useEffect, useState } from 'react'
import {NavbarLinks} from '../../data/navbar-links';
import { Link, matchPath } from 'react-router-dom';
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdMenu, MdOutlineShoppingCart } from "react-icons/md";
import ProfileDropDown from '../cores/Auth/ProfileDropDown';
import { apiConnector } from '../../services/apiconnector';
import { courseEndpoints } from '../../services/api';
import { IoIosArrowDown } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import MenuDropDown from './MenuDropDown';

const Navbar = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);

    // api call for categories
    const [subLinks, setSubLinks] = useState([]);
    const [menuVisibility, setMenuVisibility] = useState(false);

    const fetchSubLinks = async() => {
        try {
            const result = await apiConnector('GET', courseEndpoints.COURSE_CATEGORIES_API);
            setSubLinks(result.data.data);
        } catch (error) {
            console.log("Could not fetch the category list.");
        }
    }

    useEffect(() => {
        fetchSubLinks();
    }, [])

    document.body.addEventListener('click', () => {
        setMenuVisibility((prev) => !prev)
    })

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }
    

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-richblack-700 bg-richblack-800 '>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

            {/* Image/Logo */}
            <Link to={'/'}>
                <img src={Logo} alt="" width={160} height={42} loading='lazy' />
            </Link>

            {/* Nav Links */}

            <nav>
                <ul className='lg:flex hidden gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((navlink, index) => {
                            return (
                                <li key={index}>
                                    {
                                        navlink.title === 'Catalog'? (
                                            <div className='group flex items-center gap-1 relative text-richblack-300 cursor-pointer'>

                                                <p>{navlink.title}</p>
                                                <IoIosArrowDown />

                                                <div className='invisible group-hover:visible absolute left-[50%] top-[50%]
                                                translate-x-[-60%]
                                                translate-y-[15%]                                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 trasnition-all duration-200
                                                group-hover:opacity-100 lg:w-[300px] z-[9999]'>
                                                    
                                                    <div className='absolute right-[32%] top-1 h-6 w-6 
                                                    translate-x-[68%]
                                                    translate-y-[-60%]
                                                    rotate-45 rounded bg-richblack-5'>

                                                    </div>

                                                    <div className='flex flex-col'>

                                                        {subLinks.length === 0 && <span>Loading...</span>}
                                                        {
                                                            subLinks.map((links, index) => (
                                                                <Link key={index} to={`/catalog/${links.name.split(" ").join('-').toLowerCase()}`} className='p-2 hover:bg-richblack-25 rounded'>
                                                                    {links.name}
                                                                </Link>
                                                            ))
                                                        }
                                                    </div>
                                                    
                                                </div>

                                            </div>
                                        ) : (
                                            <Link to={navlink?.path} >
                                                <p className={`${matchRoute(navlink?.path) ? "text-yellow-5" : "text-richblack-300"} hover:text-yellow-5`}>
                                                    {navlink.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>

            {token === null && (
                <div className='w-full flex justify-end md:hidden'>
                    <MdMenu size={25} onClick={(e) => {
                            e.stopPropagation()
                            setMenuVisibility((prev) => !prev)

                        }} />
                    {menuVisibility && <MenuDropDown setMenuVisibility={setMenuVisibility} />}
                </div>
            )}

            {/* Login/Signup/Dashboard */}

            <div className='flex gap-6 items-center'>

                {
                    user && user?.accountType !== "Instructor" &&(
                        <Link to='/dashboard/cart' className='relative'>
                            <MdOutlineShoppingCart size={25} />
                            {
                                totalItems > 0 && (
                                    <span className='absolute top-[-12px] right-[-12px]  w-5 h-5 text-richblack-900 flex justify-center items-center bg-yellow-5 text-base rounded-full'>{totalItems}</span>
                                )
                            }
                        </Link>
                    )
                }

                {
                    token === null && (
                        <Link to='/login' className='lg:flex hidden border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            <button>Log in</button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to='/signup' className='hidden lg:flex border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            <button>Sign Up</button>
                        </Link>
                    )
                }
                {
                    token !== null && <ProfileDropDown />
                    
                }

            </div>

        </div>
    </div>
  )
}

export default Navbar