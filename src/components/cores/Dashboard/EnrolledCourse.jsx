import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import ProgressBar from 'react-progressbar';
import { getEnrolledCourses } from '../../../services/operations/profileAPI';
const EnrolledCourse = () => {

    const {token} = useSelector((state) => state.auth);

    // console.log("Token : "+token);

    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourse = async () => {
        try {

            const response = await getEnrolledCourses(token);
            // console.log(response)

            setEnrolledCourses(response);

        } catch (error) {
            console.log("Unable to fetch enrolled courses.")
        }
    }

    useEffect(() => {
        getEnrolledCourse();
    },[])

  return (
    <div>
        <div>Enrolled Courses</div>

        {
            !enrolledCourses ? (
                <div>Loading...</div>
            ) : 
            !enrolledCourses.length? (<p>You have not enrolled in any courses yet!</p>)
            : (
                <div>
                    <div>
                        <p>Course Name</p>
                        <p>Durations</p>
                        <p>Progress</p>
                    </div>

                    {/* Cards will show here */}

                    {
                        enrolledCourses.map((course, index) => (
                            <div>
                                <div>
                                    <img src={course.thumnail} alt="Thumnail" />
                                    <div>
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription}</p>
                                    </div>

                                    <div>
                                        {course?.totalDuration}
                                    </div>

                                    <div>
                                        <p>Progress: {course.progressPercentage || 0}</p>

                                        <ProgressBar
                                        completed={10}
                                        >

                                        </ProgressBar>
                                        
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )
        }
    </div>
  )
}

export default EnrolledCourse