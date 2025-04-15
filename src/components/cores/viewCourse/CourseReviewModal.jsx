import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import ReactStars from 'react-rating-stars-component'
import { createRating } from '../../../services/operations/courseDetailsAPI';
import IconBtn from '../../common/IconBtn'
import {RxCross2} from 'react-icons/rx'
import { useParams } from 'react-router-dom';
const CourseReviewModal = ({setReviewModal}) => {

  const {user} = useSelector((state) => state.profile);
  const {courseId} = useParams();
  const {token} = useSelector((state) => state.auth);

  const {
    register,
    setValue,
    handleSubmit,
    formState: {errors}
  } = useForm();

  useEffect(() => {
    setValue("experience", "");
    setValue("courseRating", 0)
  })

  function updateRating(newRating) {
    setValue("courseRating", newRating)
  }

  async function submitReview(data) {
    await createRating({
      courseId: courseId,
      review: data.experience,
      rating: data.courseRating
    }, token)

    setReviewModal(false)
  }

  return (
    <div className='fixed inset-0 flex w-full !mt-0 h-full justify-center items-center bg-white backdrop-blur-sm bg-opacity-10'>
        
        <div className='w-11/12 max-w-[700px] my-10 border border-richblack-400 rounded-lg bg-richblack-800'>

          <div className='flex justify-between items-center bg-richblack-700 rounded-t-lg p-2 px-3'>
            <h1 className='text-xl font-semibold text-richblack-5'>Add Review</h1>
            <button
            onClick={() => setReviewModal(false)}
            className='w-14 h-14 hover:bg-richblack-600 grid place-items-center rounded-full transition-all duration-200'
            >
              <RxCross2 size={24} />
            </button>
          </div>

          <div className='p-6'>
            <div className='flex items-center justify-center gap-x-4'>
              <img src={user?.image} alt={`Profile-${user.firstName}`} className='w-[50px] aspect-square rounded-full' />
              <div className='flex flex-col'>
                <span>{user?.firstName} {user?.lastName}</span>
                <span className='text-richblack-100 text-sm'>Posting Publicly</span>
              </div>
            </div>

            <form className='flex flex-col mt-6 items-center' onSubmit={handleSubmit(submitReview)}>

              <ReactStars
                count={5}
                onChange={updateRating}
                size={24}
              />

              <div className='w-11/12 flex flex-col space-y-2'>
                <label htmlFor="experience" className='text-sm text-richblack-25'>
                    Add Your Experience <span className='text-pink-300'>*</span>
                </label>
                <textarea name="experience" id="experience" className='form-style min-h-[130px]'
                  {...register("experience", {required: true})}
                  placeholder='Write your experience'
                ></textarea>
                {errors.experience && (
                  <span className='text-[12px] text-pink-300'>Write Something</span>
                )}
              </div>

              <div className='w-11/12 flex justify-end gap-3 mt-5'>
                <button 
                  className='bg-richblack-500 px-3 rounded-lg hover:scale-95'
                  onClick={() => setReviewModal(false)}
                >
                  Cancel
                </button>
                <IconBtn
                  text="Add Review"
                  type="Submit"
                >
                  {" "}
                </IconBtn>
              </div>
            </form>
          </div>
        </div>

    </div>
  )
}

export default CourseReviewModal