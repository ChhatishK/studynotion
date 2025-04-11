import React from 'react'
import ReactStars from "react-stars"
import { useDispatch, useSelector } from 'react-redux'
import {FaStar} from 'react-icons/fa'
import { RiDeleteBinLine } from "react-icons/ri";
import { removeFromCart } from '../../../../slices/cartSlice';

const RenderCartCourses = () => {

    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

  return (
    <div className='flex flex-col flex-1'>
        {
            cart.map((course, index) => (
                <div key={index} className={`w-full flex flex-wrap items-start gap-6 justify-between ${index !== cart.length-1 && "border-b border-b-richblack-400 pb-6"} ${index !== 0 && "mt-6"}`}>

                    <div className='flex flex-1 flex-col gap-4 xl:flex-row'>
                        <img src={course?.thumbnail} alt="" className='w-[220px] h-[148px] rounded-lg object-cover border  border-richblack-700' />
                        <div className='flex flex-col space-y-1'>
                            <p className='text-lg font-medium text-richblack-5'>{course?.courseName}</p>
                            <p className='text-sm text-richblack-300'>{course?.category?.name}</p>
                            <div className='flex items-center gap-2'>
                                <span>{course?.ratingAndReviews?.length}</span>
                                <ReactStars
                                    count={5}
                                    value={course?.ratingAndReviews?.length}
                                    size={20}
                                    edit={false}
                                    color2={'#ffd700'}
                                />

                                <span className='text-richblack-400'>{course?.ratingAndReviews?.length} Ratings</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col items-end space-y-2'>
                        <button
                        onClick={() => dispatch(removeFromCart(course))}
                        className='flex items-center text-pink-200 gap-x-1 py-3 px-[12px] bg-richblack-700 border border-richblack-600 rounded-md hover:scale-95 transition-all duration-200'
                        >
                            <RiDeleteBinLine />
                            <span>Remove</span>
                        </button>

                        <p className='mb-6 text-3xl font-medium text-yellow-100'>₹ {course?.price}</p>
                    </div>

                </div>
            ))
        }
    </div>
  )
}

export default RenderCartCourses