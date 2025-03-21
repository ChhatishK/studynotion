import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { BiSolidDownArrow } from "react-icons/bi";
import SubSectionModal from './SubSectionModal';
import ConfirmModal from '../../../../common/ConfirmModal'
import { setCourse } from '../../../../../slices/courseSlice';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';

const NestedView = ({handleChangeEditSectionName}) => {

    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id,
            token
        })

        console.log(result);

        if (result) {
            dispatch(setCourse(result));
        }

        setConfirmationModal(null)
        
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({subSectionId, sectionId, token})

        if (result) {

            const updatedCourseContent = course.courseContent.map((section) => 
                section._id === sectionId ? result : section
            )

            const updatedCourse = {...course, courseContent: updatedCourseContent};

            dispatch(setCourse(updatedCourse));
        }

        setConfirmationModal(null);
    }

  return (
    <div className='mt-10'>
        
        <div className='rounded-lg bg-richblack-700 p-6 px-8'>
            {course?.courseContent?.map((section) => (
                <details key={section?._id} open>
                    <summary className='flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2 text-richblack-50'>
                        <div className='flex gap-x-2 items-center'>
                            <RxDropdownMenu size={20} />
                            <p className='font-semibold'>{section?.sectionName}</p>
                        </div>

                        <div className='flex gap-x-2 items-center text-richblack-300'>
                            <button
                                className='text-xl'
                                onClick={() => handleChangeEditSectionName(section?._id, section?.sectionName)}
                            >
                                <MdEdit />
                            </button>

                            <button
                            className='text-xl'
                                onClick={() => {
                                    setConfirmationModal({
                                        text1: "Delete this Section",
                                        text2: "All the lecture in this section will be deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => handleDeleteSection(section._id),
                                        btn2Handler: () => setConfirmationModal(null)
                                    })
                                }}

                            >
                                <RiDeleteBin6Line />
                            </button>
                            <span>|</span>
                            <BiSolidDownArrow className={`text-base text-richblack-300`} />

                        </div>
                    </summary>

                    <div
                        className='px-6 pb-4'
                    >
                        {section?.subSection.map((subsection) => (
                            
                            <div key={subsection?._id}
                            onClick={() => setViewSubSection(subsection)}
                                className='flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2 text-richblack-50'
                            >
                                <div                           
                                className='flex gap-x-3 items-center py-2'>
                                    <RxDropdownMenu className='text-2xl' />
                                    <p className='font-semibold'>{subsection.title}</p>
                                </div>

                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    className='flex items-center gap-x-3'
                                >
                                    <button
                                        onClick={() => setEditSubSection({...subsection, sectionId: section._id})}
                                    >
                                        <MdEdit className='text-xl text-richblack-300' />
                                    </button>

                                    <button
                                        onClick={() => {
                                            setConfirmationModal({
                                                text1: "Delete Lecture.",
                                                text2: "Selected lecture will be deleted.",
                                                btn1Text: "Delete",
                                                btn2Text: "Cancel",
                                                btn1Handler: () => handleDeleteSubSection(subsection.
                                                    _id, section._id),
                                                btn2Handler: () => setConfirmationModal(null)
                                            })
                                        }}

                                    >
                                        <RiDeleteBin6Line className='text-xl text-richblack-300' />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button 
                        onClick={() => setAddSubSection(section._id)}
                        className='flex gap-x-1 text-yellow-50 items-center mt-3 ml-5'

                        >
                            <FaPlus />
                            <p>Add Lecture</p>
                        </button>
                    </div>
                </details>
            ))}
        </div>

        {addSubSection? 
        (<SubSectionModal
            modalData={addSubSection}
            setModalData={setAddSubSection}
            add={true}
        />)
         : viewSubSection? 
         (<SubSectionModal
            modalData={viewSubSection}
            setModalData={setViewSubSection}
            view={true}
        />) 
         : editSubSection ? 
         (<SubSectionModal
            modalData={editSubSection}
            setModalData={setEditSubSection}
            edit={true}
        />) 
         : 
        (<div></div>)}

        {confirmationModal &&
        (
            <ConfirmModal modalData={confirmationModal} />
        )}

    </div>
  )
}

export default NestedView