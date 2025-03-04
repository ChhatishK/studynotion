import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png';
import HighlightText from './HighlightText';
import { FaArrowRight } from 'react-icons/fa';
import CTAButton from '../HomePage/Button'
const InstructorSection = () => {
  return (
    <div className='mt-16'>
        <div className='flex lg:flex-row flex-col-reverse lg:gap-20 gap-5 items-center'>

            <div className='lg:w-[50%] lg:flex hidden'>
                <img
                    src={Instructor}
                    alt='Instructor image'
                    className='shadow-white'
                />
            
            </div>

            <div className='lg:w-[50%] flex flex-col lg:gap-10 gap-4 items-start'>

                <div className='text-4xl font-semibold w-[50%]'>
                    Become an 
                    <HighlightText text={"Instructor"} />
                </div>

                <p className='text-richblack-300 font-medium w-[80%]'>
                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>

                <div className='lg:w-[50%] lg:hidden flex'>
                    <img
                        src={Instructor}
                        alt='Instructor image'
                        className='shadow-white'
                    />
                
                </div>

                <CTAButton active={true} linkto={'/signup'}>
                    <div className='flex flex-row gap-2 items-center'>
                    Start Teaching Today
                    <FaArrowRight />

                    </div>
                </CTAButton>

            </div>


        </div>
    </div>
  )
}

export default InstructorSection