import React from 'react'

const InputError = ({label}) => {
  return (
    <span className='text-[12px] text-pink-300'>{label} is Required.</span>
  )
}

export default InputError