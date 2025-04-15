import React, { useState, useEffect } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { FreeMode, Pagination, Autoplay}  from 'swiper/modules'
import ReactStars from 'react-rating-stars-component'
import {ratingsEndpoints} from '../../../services/api'
import {apiConnector} from '../../../services/apiconnector'
const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;
    const enableLoop = reviews.length > 3;

    useEffect(() => {
        const fetchAllReviews = async() => {
            const response = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API);

            const {data} = response;
            // console.log(data);

            if (data?.success) {
                setReviews(data?.data)
            }
            // setReviews(response.data.data);
        }

        fetchAllReviews();
    }, [])

    // console.log(reviews)

    return (
        <div className='w-full mb-24'>
            
            <div className='w-full'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={24}
                    loop={enableLoop}
                    autoplay={{
                        delay: 2500
                    }}
                    freeMode={true}
                    modules={[FreeMode, Autoplay, Pagination]}
                    breakpoints={{
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 25
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                    }}
                >
                    {
                        reviews.map((review, index) => (
                            <SwiperSlide key={index}
                            className='w-[400px] bg-richblack-800 p-4 flex flex-col'
                            >
                                <div className='flex gap-2 items-center mb-3'>
                                    <img src={review?.user?.image? review?.user?.image: `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user.firstName} ${review?.user.lastName}`} alt={`Profile-${review?.user?.firstName}`}
                                    className='h-12 w-12 object-cover rounded-full'
                                    />

                                    <div className='flex flex-col gap-1'>
                                        <p className='text-richblack-50'>{review?.user.firstName} {review?.user?.lastName}</p>
                                        <p className='text-xs text-richblack-400'>{review?.course?.courseName}</p>
                                    </div>
                                </div>

                                <p className='mb-3 text-richblack-50'>{review?.review}</p>

                                <div className='flex gap-2 items-center'>
                                    <p>{review?.rating}</p>
                                    <ReactStars
                                        count={5}
                                        value={review.rating}
                                        size={20}
                                        edit={false}
                                        activeColor="#ffd700"
                                    >
                                    </ReactStars>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>

        </div>
    )
}

export default ReviewSlider