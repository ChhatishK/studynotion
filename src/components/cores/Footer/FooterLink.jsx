import React from 'react'
import { Link } from 'react-router-dom'

const FooterLink = ({item}) => {
  return (
    <div className='flex flex-col gap-3'>
        <span className='text-richblack-5'>{item.title}</span>
        {item.links.map((link, index) => {
            return (
                <Link key={index} to={link.link} className='hover:text-richblack-5'>{link.title}</Link>
            )
        })}
    </div>
  )
}

export default FooterLink