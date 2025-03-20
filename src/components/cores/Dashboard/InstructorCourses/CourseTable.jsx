import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formateDate } from '../../../../services/formateDate';
import { COURSE_STATUS } from '../../../../utils/constants';
import { FiCheck, FiClock } from 'react-icons/fi';
import { MdDelete, MdEdit } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import ConfirmModal from '../../../common/ConfirmModal';
import { deleteCourse } from '../../../../services/operations/courseAPI';
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';

const Courses = ({courses, setCourses}) => {

    const [confirmationModal, setConfirmationModal] = useState(null);
    const [loading, setLoading] = useState(false)
    const {token} = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const TRUNCATE_LENGTH = 20;

    const handleDeleteCourse = async (courseId) => {
        setLoading(true);
        await deleteCourse({courseId: courseId}, token);

        const result = await fetchInstructorCourses(token);

        if (result) {
            setCourses(result);
        }

        setLoading(false)
        setConfirmationModal(null)
    }

  return (
    <> 
        <div className='border-t border-richblack-800'>
            {courses?.length == 0? (
                <div className='text-3xl text-richblack-400 grid place-items-center py-8'>
                    No Courses Found!
                </div>
            ) : (
                
                courses?.map((course) => (
                    <div key={course._id}
                    className='flex justify-between items-start px-6 py-7 text-sm text-richblack-200'
                    >
                        
                        <div className='flex flex-1 gap-x-4'>
                            <img src={course?.thumbnail} alt={course?.courseName} className='rounded-lg object-cover h-[148px] w-[220px]' />
                            <div className='flex flex-col gap-y-3'>

                                <h2 className='text-xl text-richblack-5'>{course.courseName}</h2>
                                <p className='text-[12px]'>
                                    {course.courseDescription.split(" ").length > TRUNCATE_LENGTH ? 
                                        course.courseDescription.split(" ").slice(0, TRUNCATE_LENGTH).join(" ") + "..."
                                    : 
                                        course.courseDescription
                                    }
                                </p>
                                
                                <p className='text-richblack-50 text-[13px]'>Created: {formateDate(course.createdAt)}</p>

                                {course.status === COURSE_STATUS.DRAFT ? (
                                    <p
                                     className='flex w-fit px-2 py-[2px] bg-richblack-700 rounded-full justify-center items-center text-[11px] gap-2 text-pink-200'
                                    >
                                        <FiClock />
                                        <p>{COURSE_STATUS.DRAFT}</p>
                                    </p>
                                ) : (
                                    <p className='flex w-fit px-2 py-[2px] bg-richblack-700 rounded-full justify-center items-center text-[11px] gap-2 text-yellow-50'>
                                        <div className='w-3 h-3 rounded-full bg-yellow-50 text-richblack-900 flex justify-center items-center'>
                                            <FiCheck size={10} />
                                        </div>
                                        <p>{COURSE_STATUS.PUBLISHED}</p>
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className='flex gap-x-8'>
                            {/* Course Duration */}
                            <p>2hr 30min</p>
                            {/* Price */}
                            <p>₹{course.price}</p>
                            {/* Actions */}

                            <div className='flex'>
                                <button
                                    disabled={loading}
                                    onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                                    title='Edit'
                                    className='px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300 text-xl'
                                >
                                    <MdEdit />
                                </button>

                                <button
                                    disabled={loading}
                                    onClick={() => setConfirmationModal({
                                        text1: "Delete Course",
                                        text2: "All Data associated it will be deleted permanently.",
                                        btn1Text: !loading? "Delete" : "Deleting",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => !loading? handleDeleteCourse(course._id) : {},
                                        btn2Handler: () => !loading? setConfirmationModal(null) : {},

                                    })}
                                    title='Delete'
                                    className='text-xl px-2 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]'
                                >
                                    <RiDeleteBinLine  />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
                
            )}
        </div>

        {confirmationModal && <ConfirmModal modalData={confirmationModal} />}
    </>
  )
}

export default Courses