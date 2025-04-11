import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProgressBar from '@ramonak/react-progress-bar'
import { getEnrolledCourses } from '../../../services/operations/profileAPI';
import Recommendation from '../../common/Recommendation';
import { useNavigate } from 'react-router-dom';
const EnrolledCourse = () => {

    const {token} = useSelector((state) => state.auth);

    // console.log("Token : "+token);

    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const navigate = useNavigate();
    const [recommendation, setRecommendation] = useState(null);

    const getEnrolledCourse = async () => {
        try {

            const response = await getEnrolledCourses(token);
            console.log(response)

            setEnrolledCourses(response);

            if (response.length === 0) {
                setRecommendation({
                    text: "You have not enrolled courses",
                    btnText: "Explore Courses",
                    btnHandler: () => navigate('/catalog/web-development'),
                    cancel: () => setRecommendation(null),
                    setRecommendation: setRecommendation
                })
            }

        } catch (error) {
            console.log("Unable to fetch enrolled courses.")
        }
    }

    useEffect(() => {
        getEnrolledCourse();
    },[])

    

  return (
    <div className='relative'>
        <div className='text-3xl text-richblack-100 font-normal mb-8'>Enrolled Courses</div>

        {
            !enrolledCourses ? (
                <div className='grid h-[10vh] w-full place-items-center text-richblack-5'>Loading...</div>
            ) : 
            !enrolledCourses.length? (<p className='text-center text-richblack-100'>You have not enrolled in any courses yet!</p>)
            : (
                <div className='my-8'>
                    <div className='grid grid-cols-3 bg-richblack-500 rounded-t-lg p-3 text-richblack-25'>
                        <p>Course Name</p>
                        <p>Durations</p>
                        <p>Progress</p>
                    </div>

                    {/* Cards will show here */}

                    {
                        enrolledCourses.map((course, index, arr) => (
                            <div key={index} className={`flex items-center border border-richblack-800 ${index === arr.length?  "border-b-lg": "rounded-none"}`}>
                                <div 
                                onClick={() => navigate(`/view-course/${course._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`)}
                                className='flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3'>
                                    <div className='flex gap-4'>
                                        <img src={course.thumbnail} alt="Thumnail" className='w-14 h-14 rounded-lg object-cover' />
                                        <div className='flex max-w-xs flex-col gap-2'>
                                            <p className='font-semibold'>{course.courseName}</p>
                                            <p className='text-xs text-richblack-300'>{course.courseDescription.length > 50 ? `${course.courseDescription.slice(0, 50)}...` : course.courseDescription}</p>
                                        </div>
                                    </div>
                                </div>

                                    <div className='w-1/4 px-2 py-3'>
                                        {course?.totalDuration}
                                    </div>

                                    <div className='flex flex-col gap-2 px-2 py-3'>
                                        <p>Progress: {course.progressPercentage || 0}%</p>

                                        <ProgressBar
                                            completed={course.progressPercentage || 0}
                                            height='8px'
                                            width='170px'
                                            isLabelVisible={false}
                                        />
                                        
                                    </div>
                            </div>
                            
                        ))
                    }
                </div>
            )
        }

        {recommendation && <Recommendation Recommendation={recommendation} />}
    </div>
  )
}

export default EnrolledCourse