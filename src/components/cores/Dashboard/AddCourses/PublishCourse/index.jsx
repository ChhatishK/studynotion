import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import { resetCourseSteps, setStep } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';

const PublishCourse = () => {

    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit, setValue, getValues} = useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (course.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true)
        }
    })

    const goBack = () => {
        dispatch(setStep(2));
    }

    const goToCourses = () => {
        dispatch(resetCourseSteps())
        navigate('/dashboard/my-courses');
    }

    const handleCoursePublish = async () => {
        if (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true ||
        (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)
        ) {
            goToCourses();
            return;
        }

        // if form updated
        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;

        formData.append("status", courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formData, token);

        if (result) {
            goToCourses();
        }

        setLoading(false);
    }

  return (
    <div className='rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700'>
        <p className='text-2xl mb-6'>Publish Course</p>

        <form 
            onSubmit={handleSubmit(handleCoursePublish)}
        >
            <div className='flex gap-x-2 mb-8'>
                <input 
                    type="checkbox"
                    id='public'
                    {...register("public")}
                    className='cursor-pointer text-lg w-4'
                />

                <label htmlFor="public" className='text-lg text-richblack-500 cursor-pointer'>Make this course as public</label>

            </div>

            <div className='flex justify-end gap-x-4'>
                <button
                    disabled={loading}
                    type='button'
                    onClick={goBack}
                    className='flex items-center rounded-md px-7 p-1 bg-richblack-400 text-richblack-900 text-lg'
                >
                    Back
                </button>

                <IconBtn type='Submit' text="Save Changes" disabled={loading} >
                    {" "}
                </IconBtn>
            </div>
        </form>
    </div>
  )
}

export default PublishCourse