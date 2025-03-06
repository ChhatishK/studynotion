import React from 'react'

const IconBtn = ({
    text, onClick,children, disabled, outline=false,
    customClasses,type
}) => {
  return (
    <button
    disabled={disabled}
    onClick={onClick}
    type={type}
    className={`flex px-4 py-5 h-[22px] text-black rounded-md font-semibold gap-x-2 items-center bg-[#FFD60A]`}
    >
        {
            children ? (
            <>
                <span>
                    {text} 
                </span>
                {children}
            </>
            ) : (
                {children}
            )
        }
    </button>
  )
}

export default IconBtn