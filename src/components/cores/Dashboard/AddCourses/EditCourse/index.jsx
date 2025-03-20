import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { setCourse, setEditCourse } from '../../../../../slices/courseSlice';
import { fetchFullCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import RederSteps from '../RenderSteps';
const EditCourse = () => {

    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const {token} = useSelector((state) => state.auth);

    useEffect(() => {
        const populateCourseDetails = async () => {
            setLoading(true);
            const result = await fetchFullCourseDetails({courseId}, token);
            console.log(result);
            if (result?.courseDetails) {
                dispatch(setEditCourse(true))
                dispatch(setCourse(result?.courseDetails))
            }
            setLoading(false)
        }

        populateCourseDetails();
    }, [])

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

  return (
    <div className='flex flex-col gap-x-5'>
        <h1 className='text-2xl text-richblack-50'>Edit Course</h1>
        <div>
            {
                course? (<RederSteps />) : (<p>Course Not Found</p>)
            }
        </div>
    </div>
  )
}

export default EditCourse