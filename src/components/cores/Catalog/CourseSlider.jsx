import React from 'react'

import {Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import CourseCard from './CourseCard'

const CourseSlider = ({courses}) => {
  return (
    <>
        {
            courses?.length ? (
                <Swiper
                slidesPreview={1}
                loop={true}
                spaceBetween={25}
                >
                    {
                        courses?.map((course, index) => (
                            <SwiperSlide key={index}>
                                <CourseCard course={course} Height={"h-[250px]"} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            ) : (
                <p>No Course Found</p>
            )
        }
    </>
  )
}

export default CourseSlider