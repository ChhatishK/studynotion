import React from 'react'
import IconBtn from './IconBtn'

const ConfirmModal = ({modalData}) => {
  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className='w-11/12 max-w-[350px] bg-richblack-800 rounded-lg border border-richblack-400 p-6'>
            <p className='text-2xl font-medium mb-4'>
                {modalData.text1}
            </p>
            <p className='text-base font-medium text-richblack-400 mb-4'>
                {modalData.text2}
            </p>

            <div className='flex gap-x-5'>
                <IconBtn
                    onClick={modalData?.btn1Handler}
                    text={modalData?.btn1Text}
                >
                    <span>{""}</span>
                </IconBtn>

                <button
                onClick={modalData?.btn2Handler}
                className='px-6 p-2 rounded-lg bg-richblack-400 text-richblack-900 text-[18px]'
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmModal