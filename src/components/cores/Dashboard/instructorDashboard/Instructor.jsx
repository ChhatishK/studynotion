import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';

const Instructor = () => {

  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);

  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourseDataWithStats = async() => {
      setLoading(true);

      const instructorApiData = await getInstructorData(token);
      const result = await fetchInstructorCourses(token);

      // console.log(instructorApiData);
      // console.log(result)

      if (instructorApiData.length) {
        setInstructorData(instructorApiData)
      }

      if (result) {
        setCourses(result.data);
      }

      setLoading(false)
    }

    getCourseDataWithStats()
  }, []);

  const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountEarned, 0);
  const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);

  return (
    <div className='flex flex-col'>
      
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl text-richblack-25'>Hi {user?.firstName} 👋</h1>
        <p className='text-xm text-richblack-300'>Let's start something new</p>
      </div>

      {loading? (<div className='spinner'></div>) : courses.length > 0 ? (
        <div className='flex flex-col gap-5'>
          <div>
            <div className='flex flex-col-reverse lg:flex-row gap-5 mt-5'>
              <InstructorChart courses={instructorData} />

              <div className='flex flex-col gap-4 bg-richblack-800 p-6 rounded-lg lg:w-[250px] w-full'>
                <p className='text-xl text-richblack-5 font-bold'>Statistics</p>
                <div className='flex flex-col gap-2'>
                  <p className='text-xl text-richblack-200'>Total Courses</p>
                  <p className='text-2xl text-richblack-50'>{courses.length}</p>
                </div>

                <div className='flex flex-col gap-2'>
                  <p className='text-xl text-richblack-200'>Total Students</p>
                  <p className='text-2xl text-richblack-50'>{totalStudents}</p>
                </div>

                <div className='flex flex-col gap-2'>
                  <p className='text-xl text-richblack-200'>total Income</p>
                  <p className='text-2xl text-richblack-50'>{totalAmount}</p>
                </div>

              </div>
            </div>


          </div>

          <div className='w-full bg-richblack-800 rounded-lg flex flex-col p-6 gap-5'>
            {/* // Render Courses */}
            <div className='flex justify-between'>
              <p className='text-xl font-bold text-richblack-25'>Your Courses</p>
              <Link to='/dashboard/my-courses'>
                  <p className='underline text-yellow-100'>View all</p>
              </Link>
            </div>

            {courses.slice(0, 3).map((course, index) => (
              <Link to={`/courses/${course._id}`} key={index}>
                <div className='flex flex-col gap-2 rounded-lg'>
                  <img src={course.thumbnail} alt="" className='w-[300px] h-[200px] rounded-lg' />
                  <div className='flex flex-col gap-1'>
                    <p>{course.courseName}</p>
                    <div className='flex gap-2 text-sm text-richblack-300'>
                      <p>{course.studentsEnrolled.length} Students</p>
                      <p>|</p>
                      <p>Rs. {course.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      ) : (<div>
        <p>You have not created any courses yet</p>
        <Link to='/dashboard/add-course'>Creater a course</Link>
      </div>)}
      
    </div>
  )
}

export default Instructor