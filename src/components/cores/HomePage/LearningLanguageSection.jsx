import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from '../HomePage/Button'

const LearningLanguageSection = () => {
  return (
    <div className='lg:mt-[150px] mb-32'>
      <div className='flex flex-col items-center'>

        <div className='text-4xl font-semibold lg:text-center flex lg:flex-row flex-col lg:justify-center justify-start gap-2'>
            <h2>Your Swiss knife for</h2>
            <HighlightText text={" learning any language"} />
        </div>

        <div className='text-base lg:text-center text-start text-richblack-600 mx-auto mt-6 lg:w-[65%] font-medium'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex lg:flex-row flex-col items-center justify-center mt-5'>
          <img src={know_your_progress} 
          alt="know your progress"
          className='object-contain lg:-mr-28 -mb-12' />
          <img src={compare_with_others} 
          alt="compare with others"
          className='object-contain' />
          <img src={plan_your_lessons} 
          alt="plan your lessions"
          className='object-contain lg:-ml-36 -mt-20' />
        </div>

        <div className='w-fit'>
          <CTAButton active={true} linkto={'/signup'}>
            Learn More
          </CTAButton>
        </div>
      </div>

    </div>
  )
}

export default LearningLanguageSection