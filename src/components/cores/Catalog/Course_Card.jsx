import React, { useEffect, useState } from 'react'
import { GetAvgRating } from '../../../utils/avgRating';
import { Link } from 'react-router-dom';
import RatingStars from '../../common/RatingStars';
const Course_Card = ({course, Height}) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    }, [course])

    // console.log("AVERAGE RATING: ", avgReviewCount)

  return (
    <div>
        <Link to={`/courses/${course._id}`}>
            <div className='w-[400px] border rounded-xl border-richblack-700 hover:scale-105 transition-all duration-200'>
                <div className='w-[400px]'>
                    <img src={course?.thumbnail} alt="Course Thumbnail"
                    className={`${Height} w-full rounded-xl object-cover`} 
                    />

                    <div className='flex flex-col gap-2 p-3'>
                        <div className='flex justify-between items-center'>
                            <p className='text-xl'>{course?.courseName}</p>
                            <p className='text-xs text-richblack-300'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                        </div>

                        <div className='flex gap-2'>
                            <span>{avgReviewCount}</span>
                            <RatingStars Review_count = {avgReviewCount} />
                            <span>{course?.ratingAndReviews?.length} Ratings</span>
                        </div>
                        <p>RS. {course?.price}</p>
                    </div>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Course_Card