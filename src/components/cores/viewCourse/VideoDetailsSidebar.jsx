import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { IoIosArrowBack } from 'react-icons/io';
import { BsChevronDown } from 'react-icons/bs';

const VideoDetailsSidebar = ({setReviewModal}) => {

    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const {sectionId, subSectionId} = useParams();
    const location = useLocation();

    const {
        courseSectionData,
        entireCourseData,
        totalNoOfLectures,
        completedLectures
    } = useSelector((state) => state.viewCourse);

    // console.log("Completed Lectures: ", completedLectures)

    useEffect(() => {

        ;(() => {
            if (!courseSectionData.length) {
                return;
            }

            const currentSectionIdx = courseSectionData.findIndex((data) => data._id === sectionId);

            const currentSubsectionIdx = courseSectionData?.[currentSectionIdx]?.subSection.findIndex((data) => data._id === subSectionId)

            const activeSubsectionId = courseSectionData[currentSectionIdx]?.subSection?.[currentSubsectionIdx]?._id;

            setActiveStatus(courseSectionData?.[currentSectionIdx]?._id);
            setVideoBarActive(activeSubsectionId);
        })()

    }, [courseSectionData, entireCourseData, location.pathname])

  return (
    <>
        <div className='flex flex-col w-[320px] max-w-[350px] h-[calc(100vh-3.5rem)] border-r-[1px] border-r-richblack-700 bg-richblack-800'>

            <div className='flex flex-col mx-5 items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25'>

                <div className='w-full flex items-center justify-between'>
                    <div
                        onClick={() => navigate('/dashboard/enrolled-courses')}
                        className='flex h-[35px] w-[35px] bg-richblack-100 items-center justify-center rounded-full p-1 text-richblack-700 hover:scale-95 cursor-pointer' title='Back'
                    >
                        <IoIosArrowBack size={30} />
                    </div>
                    <div>
                        <IconBtn text="Add Review"
                            onClick={() => setReviewModal(true)}
                        >{" "}</IconBtn>
                    </div>
                </div>

                <div className='flex flex-col'>
                    <p>{entireCourseData?.courseName}</p>
                    <p className='text-sm font-semibold text-richblack-500'>{completedLectures?.length} /  {totalNoOfLectures}</p>
                </div>
            </div>

            <div className='h-[calc(100vh-5rem) overflow-y-auto]'>
                {
                    courseSectionData.map((section, index) => (
                        <div
                        onClick={() => setActiveStatus(section._id)}
                        key={index}
                        className='mt-2 cursor-pointer'
                        >

                            {/* Section */}
                            <div className='flex justify-between bg-richblack-600 px-5 py-4'>
                                <div className='w-[70%] font-semibold'>
                                    {section?.sectionName}
                                </div>
                                {/* HW - Add arrow icon here and handle rotate logic */}
                                <div className='flex items-center gap-3'>
                                    <span className={`${activeStatus === section?._id? "rotate-180" : "rotate-0"} transition-all duration-500`}>
                                        <BsChevronDown />
                                    </span>
                                </div>
                            </div>

                            {/* Subsections */}
                            <div>
                                {
                                    activeStatus === section?._id && (
                                        <div
                                        className={`transition-[height] duration-500 ease-in-out`}
                                        >
                                            {
                                                section.subSection.map((topic, index) => (
                                                    <div 
                                                    className={`flex gap-3 px-5 py-2 ${videoBarActive === topic?._id ? "bg-yellow-200 font-semibold text-richblack-900" : "hover:bg-richblack-900"}`}
                                                    key={index}
                                                    onClick={() =>{
                                                        navigate(`/view-course/${entireCourseData._id}/section/${section?._id}/sub-section/${topic._id}`)
                                                        setVideoBarActive(topic?._id)
                                                    }}       
                                                    
                                                    >
                                                        <input 
                                                            type="checkbox"
                                                            checked={completedLectures?.includes(topic?._id)}
                                                            readOnly
                                                         />
                                                         <span>{topic.title}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>


                        </div>
                    ))
                }
            </div>

        </div>
    </>
  )
}

export default VideoDetailsSidebar