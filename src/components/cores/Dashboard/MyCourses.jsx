import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import CourseTable from '../Dashboard/InstructorCourses/CourseTable'
import IconBtn from '../../common/IconBtn';
import {VscAdd} from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {

    const {token} = useSelector((state) => state.auth);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const instructorCourses = async () => {
        setLoading(true)
        const result = await fetchInstructorCourses(token);
        console.log(result)

        if (result) {
            setCourses(result.data);
        }

        setLoading(false)
    }

    useEffect(() => {
        instructorCourses();
    },[])

  return (
    <>
        <div className='flex justify-between'>
            <h2 className='text-3xl text-richblack-50'>My Courses</h2>
            <IconBtn onClick={() => navigate('/dashboard/add-course')} text="Add Course" >< VscAdd /></IconBtn>
        </div>
    
        <div className='flex flex-col border-[1px] border-richblack-800 mt-14'>
            
            <div className='flex justify-between px-6 py-2 text-sm text-richblack-200'>
                <p>COURSES</p>
                <div className='flex gap-x-12'>
                    <p>DURATION</p>
                    <p>PRICE</p>
                    <p>ACTIONS</p>
                </div>
            </div>

            {courses && <CourseTable courses={courses} setCourses={setCourses} />}
            
        </div>
    </>
  )
}

export default MyCourses