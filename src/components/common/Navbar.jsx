import React, { useEffect, useState, useCallback, memo } from 'react'
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

// Memoized NavLink component
const NavLink = memo(({ navlink, matchRoute, subLinks }) => {
  if (navlink.title === 'Catalog') {
    return (
      <div className='group flex items-center gap-1 relative text-richblack-300 cursor-pointer'>
        <p>{navlink.title}</p>
        <IoIosArrowDown />
        <div className='invisible group-hover:visible absolute left-[50%] top-[50%]
          translate-x-[-60%] translate-y-[15%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 
          opacity-0 transition-all duration-200 group-hover:opacity-100 lg:w-[300px] z-[9999]'>
          <div className='absolute right-[32%] top-1 h-6 w-6 translate-x-[68%] translate-y-[-60%] rotate-45 rounded bg-richblack-5' />
          <div className='flex flex-col'>
            {subLinks.length === 0 && <span>Loading...</span>}
            {subLinks.map((links, index) => (
              <Link 
                key={index} 
                to={`/catalog/${links.name.split(" ").join('-').toLowerCase()}`} 
                className='p-2 hover:bg-richblack-25 rounded'
              >
                {links.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link to={navlink?.path}>
      <p className={`${matchRoute(navlink?.path) ? "text-yellow-5" : "text-richblack-300"} hover:text-yellow-5`}>
        {navlink.title}
      </p>
    </Link>
  );
});

const Navbar = () => {
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const {totalItems} = useSelector((state) => state.cart);
  const [subLinks, setSubLinks] = useState([]);
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [lastFetch, setLastFetch] = useState(null);
  const location = useLocation();

  const matchRoute = useCallback((route) => {
    return matchPath({path:route}, location.pathname);
  }, [location.pathname]);

  const fetchSubLinks = useCallback(async() => {
    // Only fetch if data is older than 5 minutes
    if (!lastFetch || Date.now() - lastFetch > 300000) {
      try {
        const result = await apiConnector('GET', courseEndpoints.COURSE_CATEGORIES_API);
        setSubLinks(result.data.data);
        setLastFetch(Date.now());
      } catch (error) {
        console.log("Could not fetch the category list.");
      }
    }
  }, [lastFetch]);

  useEffect(() => {
    fetchSubLinks();
  }, [fetchSubLinks]);

  useEffect(() => {
    const handleClick = () => setMenuVisibility(false);
    document.body.addEventListener('click', handleClick);
    return () => document.body.removeEventListener('click', handleClick);
  }, []);

  const handleMenuClick = useCallback((e) => {
    e.stopPropagation();
    setMenuVisibility(prev => !prev);
  }, []);

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-richblack-700 bg-richblack-800'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        <Link to={'/'}>
          <img 
            src={Logo} 
            alt="StudyNotion Logo" 
            width={160} 
            height={42} 
            loading='lazy'
            decoding="async"
            fetchPriority="high"
          />
        </Link>

        <nav>
          <ul className='lg:flex hidden gap-x-6 text-richblack-25'>
            {NavbarLinks.map((navlink, index) => (
              <li key={index}>
                <NavLink 
                  navlink={navlink} 
                  matchRoute={matchRoute} 
                  subLinks={subLinks} 
                />
              </li>
            ))}
          </ul>
        </nav>

        {token === null && (
          <div className='w-full flex justify-end md:hidden'>
            <MdMenu size={25} onClick={handleMenuClick} />
            {menuVisibility && <MenuDropDown setMenuVisibility={setMenuVisibility} />}
          </div>
        )}

        <div className='flex gap-6 items-center'>
          {user && user?.accountType !== "Instructor" && (
            <Link to='/dashboard/cart' className='relative'>
              <MdOutlineShoppingCart size={25} />
              {totalItems > 0 && (
                <span className='absolute top-[-12px] right-[-12px] w-5 h-5 text-richblack-900 flex justify-center items-center bg-yellow-5 text-base rounded-full'>
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <>
              <Link to='/login' className='lg:flex hidden border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                <button>Log in</button>
              </Link>
              <Link to='/signup' className='hidden lg:flex border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                <button>Sign Up</button>
              </Link>
            </>
          )}
          
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default memo(Navbar);