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
    className={`${outline ? "border-[2px] text-yellow-50 border-yellow-500" : "bg-[#FFD60A] text-black"} flex px-4 py-5 h-[22px]  rounded-md font-semibold gap-x-2 items-center `}
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