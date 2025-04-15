import React from 'react'

import {Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import 'swiper/css/bundle';
import { FreeMode, Pagination, Autoplay}  from 'swiper/modules'
import Course_Card from './Course_Card'

const CourseSlider = ({courses}) => {
    const enableLoop = courses.length > 2;
  return (
    <>
        {
            courses?.length ? (
                <Swiper
                slidesPerView='auto'
                spaceBetween={10}
                loop={enableLoop}
                // centeredSlides={true}
                modules={[FreeMode, Pagination, Autoplay]}
                autoplay={true}
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
                        courses?.map((course, index) => (
                            <SwiperSlide key={index}>
                                <Course_Card course={course} Height={"h-[220px]"} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            ) : (
                <p className='text-base text-richblack-300'>No Course Found</p>
            )
        }
    </>
  )
}

export default CourseSlider