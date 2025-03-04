import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className='text-4xl font-semibold text-center mt-40'>
        We are passionate about revolutionizing the way we learn. Our <br /> innovative platform
        <span className='text-gradient'>{" "}Combine Technology</span>
        <span className='yellow-gradient text-yellow-5'>
            {", "}
            expertise
        </span>
        , and community to <br /> create an
        <span className='yellow-gradient'>
            {" "}
            unparalleled educational experience.
        </span>
    </div>
  )
}

export default Quote