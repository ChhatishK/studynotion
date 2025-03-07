import React from 'react'
import ContactUsForm from '../components/cores/contactus/ContactUsForm'
import Footer  from '.././components/cores/Footer/Footer'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'
import { BiWorld } from 'react-icons/bi'
import { IoCall } from 'react-icons/io5'
const Contactus = () => {
  return (
    <div className=''>
      <div className='w-11/12 max-w-maxContent mx-auto flex mt-20 gap-12'>
        {/* Section 1 */}
        <div className='flex flex-col gap-10 bg-richblack-800 h-[405px] w-[490px] rounded-[12px] p-8'>
          <div className='flex flex-col'>
            <div className='flex gap-3 text-richlack-100'>
              <HiChatBubbleLeftRight size={25} />
              <span className='text-xl font-bold'>Chat on us</span>
            </div>
            <p className='text-richblack-400'>Our friendly team is here to help.</p>
            <p className='text-richblack-400'>info@studynotion.com</p>
          </div>

          <div className='flex flex-col gap-1'>
            <div className='flex gap-3'>
              <BiWorld size={25} />
              <span className='text-xl font-bold text-richblack-100'>Visit us</span>
            </div>
            <p className='text-richblack-400'>Come and say hello at our office HQ. Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</p>
          </div>

          <div>
            <div className='flex gap-3'>
              <IoCall size={25} />
              <span className='text-xl text-richblack-100 font-bold'>Call us</span>
            </div>

            <p className='text-richblack-400'>Mon - Fri From 8am to 5pm</p>
            <p className='text-richblack-400'>+123 456 7869</p>
          </div>
        </div>

        {/* Section 2 */}

        <div className='border border-richblack-600 rounded-[14px] w-[60%] px-16 p-10'>
            <h1 className='text-4xl font-bold my-5'>Got a Idea? We've got the skills. Let's team up</h1>

            <p className='text-base text-richblack-400 mb-10'>Tell us more about yourself and what you're got in mind.</p>

            <ContactUsForm />
        </div>



      </div>
      <div  className='flex justify-center my-48'>
          <h1 className='text-4xl'>Review from other learners</h1>
      </div>

      <Footer />
    </div>
  )
}

export default Contactus