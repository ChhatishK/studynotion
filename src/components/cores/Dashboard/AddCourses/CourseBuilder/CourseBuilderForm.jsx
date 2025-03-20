import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import InputError from '../../../../common/InputError';
import IconBtn from '../../../../common/IconBtn';
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import NestedView from './NestedView';
import { MdNavigateNext } from "react-icons/md";
import toast from 'react-hot-toast';
import {
    setCourse,
    setEditCourse,
    setStep,
  } from "../../../../../slices/courseSlice"
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import RequiredField from '../../../../common/RequiredField';

const CourseBuilderForm = () => {

    const {course } = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm();

    const [editSectionName, setEditSectionName] = useState(null);
    const [loading, setLoading] = useState(false);

    const cancelEdit = () => {
        setEditSectionName(false);
        setValue("sectionName", "");
    }

    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true))
    }

    const goNext = () => {
        if (course.courseContent.length === 0) {
            toast.error("Please add atleat one section.");
            return;
        }

        if (course.courseContent.some((section) => section.subSection.length === 0)) {
            toast.error("Minimum one lecture required.");
            return;
        }

        dispatch(setStep(3));
    }

    const onSubmit = async (data) => {
        setLoading(true);
        let result;

        if (editSectionName) {
            result = await updateSection({
                sectionName: data.sectionName,
                sectionId: editSectionName,
                courseId: course._id
            }, token)
        } else {
            result = await createSection({
                sectionName: data.sectionName,
                courseId: course._id
            }, token)
        }

        // update values
        if (result) {
            dispatch(setCourse(result));
            setEditSectionName(false);
            setValue("sectionName", "");
        }

        setLoading(false);
    }

    const handleChangeEditSectionName = (sectionId, sectionName) => {

        if (editSectionName === sectionId) {
            cancelEdit();
            return;
        }
        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
    }

  return (
    <div className='p-6 bg-richblack-800 border border-richblack-700 rounded-lg'>
        <p className='text-2xl mb-8'>Course Builder</p>

        <form className='flex flex-col gap-y-5'
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className='flex flex-col gap-y-1'>
                <label className='flex' htmlFor="sectionName">Section Name <RequiredField /></label>
                <input 
                    type="text"
                    id='sectionName'
                    placeholder='Add section name'
                    {...register("sectionName", {required: true})}
                    className='w-full form-style'
                
                />

                {
                    errors.sectionName && (
                        <InputError label="Section Name " />
                    )
                }
            </div>

            <div className='flex gap-x-3'>
                <IconBtn
                    type='submit'
                    text={editSectionName? "Edit Section Name" : "Section Name"}
                    outline={true}
                ><IoAddCircleOutline size={20} /></IconBtn>

                {editSectionName && (
                    <button
                        type='button'
                        onClick={cancelEdit}
                        className='text-richblack-400 underline'
                    >
                        Cancel Edit
                    </button>
                )}
                
            </div>
        </form>

        {course?.courseContent?.length > 0 && (
            <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
        )}

        <div className='flex justify-end gap-x-3 mt-10'>
            <button
                onClick={goBack}
                className='rounded-md flex items-center px-6 bg-richblack-300'
            >
                Back
            </button>

            <IconBtn
                text="Next"
                onClick={goNext}
            >
                <MdNavigateNext />
            </IconBtn>
        </div>
    </div>
  )
}

export default CourseBuilderForm