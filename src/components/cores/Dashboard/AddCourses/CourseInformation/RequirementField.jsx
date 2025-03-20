import React, { useEffect, useState } from 'react'
import InputError from '../../../../common/InputError'
import { useSelector } from 'react-redux';

const RequirementField = ({name, label, register, errors, setValue, getValues}) => {

    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);
    const { course, editCourse } = useSelector((state) => state.course);

    const handleAddRequirement = () => {

        if (requirement) {
            if (requirementList.includes(requirement)) {
                setRequirement("");
            }

            if (requirement && !requirementList.includes(requirement)) {
                setRequirementList([...requirementList, requirement])
                setRequirement("");
            }
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList]
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    }

    useEffect(() => {
        if (editCourse) {
            setRequirementList(course?.instructions);
        }

        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
    }, [])

    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList])

  return (
    <div>
        
        <label htmlFor={name}>{label} <sup>*</sup></label>

        <div className='flex flex-col items-start'>
            <input 
                type="text"
                id={name}
                name={name}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className='w-full form-style'    
            />

            {
                errors[name] && (
                    <InputError
                    label={label}
                    />
                )
            }

            <button
                type='button'
                onClick={handleAddRequirement}
                className='font-semibold text-yellow-50'
            >
                Add

            </button>
        </div>

        {
            requirementList.map((item, index) => (
                <div key={index} className='flex gap-1'>
                    {item}
                    <button
                        type='button'
                        onClick={() => handleRemoveRequirement(index)}
                        className='text-xs text-pure-greys-300'
                    >
                        clear
                    </button>
                </div>
            ))
        }

    </div>
  )
}

export default RequirementField