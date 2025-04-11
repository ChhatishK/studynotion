import React from 'react'

import {Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { FreeMode, Pagination, Autoplay}  from 'swiper/modules'
import Course_Card from './Course_Card'

const CourseSlider = ({courses}) => {
  return (
    <>
        {
            courses?.length ? (
                <Swiper
                slidesPerView={3}
                spaceBetween={25}
                loop={true}
                modules={[FreeMode, Pagination, Autoplay]}
                autoplay={true}
                breakpoints={{
                    1024: {
                    slidesPerView: 3,
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