import React from 'react'
import { MdPeopleAlt } from 'react-icons/md'
import { TbBinaryTree2Filled } from "react-icons/tb";

const CourseCard = ({course, currentCard, setCurrentCard}) => {
  return (
    <div className='flex justify-between cursor-pointer w-[350px] h-[250px]'>
            
        <div className={`p-5 flex flex-col ${course.heading === currentCard? "bg-white custom-shadow text-richblack-800" : "bg-richblack-800"} gap-3 justify-between`}>
            <div>

                <h2 className='font-bold text-lg'>{course.heading}</h2>
                <p className='text-richblack-200 mb-4'>{course.description}</p>

            </div>

            <div className={` flex flex-col justify-between font-medium ${course.heading === currentCard? "text-blue-600" : "text-white"}`}>
                <hr style={{border: '1px dashed #000', opacity: '30%'}} />

                <div className='flex justify-between mt-2'>
                    <div className='flex gap-2 items-center'>
                        <MdPeopleAlt />
                        <p>{course.level}</p>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <TbBinaryTree2Filled />
                        <p>{course.lessionNumber} Lessons</p>
                    </div>
                </div>

            </div>
        </div>
              
    </div>
  )
}

export default CourseCard