import React, { useEffect, useState } from 'react'
import {MdClose} from 'react-icons/md'
import { useSelector } from 'react-redux';
import RequirementField from './RequirementField';
import RequiredField from '../../../../common/RequiredField';

const ChipInput = ({label, name, placeholder, register, errors, setValue, getValues}) => {

    const {editCourse, course} = useSelector((state) => state.course);

    const [tags, setTags] = useState([]);

    const handleKeyDown = (event) => {

        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();

            const tagValue = event.target.value.trim();
            console.log(tagValue)
            
            if (tagValue && !tags.includes(tagValue)) {
                
                const newTags = [...tags, tagValue];
                setTags(newTags);
                event.target.value = ""
            }

            console.log(tags);
        }
    }

    const handleDeleteTag = (tagIndex) => {
        const newTags = tags.filter((_, index) => index !== tagIndex);
        setTags(newTags);
    }

    useEffect(() => {

        if (editCourse) {
            setTags(course?.tag);
        }

        register(name, {required: true, validate: (value) => value.length > 0})
    }, [])

    useEffect(() => {
        setValue(name, tags)
    }, [tags]);

  return (
    <div className='flex flex-col space-y-2 text-sm'>
        <label className='flex' htmlFor={name}>{label} <RequiredField /></label>

        {/* Show input tags */}
        <div className='flex w-full flex-wrap gap-y-2'>
            {
                tags.map((tag, index) => (
                    <div key={index} className='flex gap-2 m-1 text-sm items-center text-richblack-5 bg-yellow-400 rounded-full px-2 py-1'>
                        {tag}

                        <button
                            type='button'
                            className='ml-2 focus:outline-none'
                            onClick={() => handleDeleteTag(index)}
                        >
                            <MdClose />
                        </button>
                    </div>
                ))
            }

            <input 
                type="text"
                id={name}
                placeholder={placeholder}
                name={name}
                onKeyDown={handleKeyDown}
                className='w-full form-style'
            />

        </div>

        {
            errors.tags && (
                <span className='text-pink-500'>{label} is Required</span>
            )
        }
    </div>
  )
}

export default ChipInput