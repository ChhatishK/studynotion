import React, { useEffect, useState } from 'react'
import { GetAvgRating } from '../../../utils/avgRating';
import { Link } from 'react-router-dom';
import RatingStars from '../../common/RatingStars';
const CourseCard = ({course, Height}) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    }, [course])

  return (
    <div>
        <Link to={`/courses/${course._id}`}>
            <div>
                <div className='w-[400px]'>
                    <img src={course?.thumbnail} alt="Course Thumbnail"
                    className={`${Height} w-full rounded-xl object-cover`} 
                    />

                    <div>
                        <p>{course?.courseName}</p>
                        <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>

                        <div>
                            <span></span>
                            <RatingStars Review_count = {avgReviewCount} />
                            <span>{course?.ratingAndReviews?.length} Ratings</span>
                        </div>
                        <p>{course?.price}</p>
                    </div>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default CourseCard