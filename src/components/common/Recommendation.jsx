import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
const Recommendation = ({Recommendation}) => {

    const [visibility, setVisibility] = useState(false);

    useEffect(() => {

        setTimeout(() => {
            setVisibility(true)
        }, 1000)

        const timer = setTimeout(() => {
            setVisibility(false)
        }, 10000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

  return (
    <div className={`fixed bottom-10 right-10 flex gap-x-4 px-4 py-2 items-center bg-richblack-5 text-richblack-900 shadow-lg rounded-lg transition-all duration-700 ease-in-out transform ${ visibility ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <span>{Recommendation.text}</span>
        
        <button onClick={Recommendation?.btnHandler} className='bg-caribbeangreen-100 px-2 py-1 rounded-lg'>{Recommendation.btnText}</button>
        <span onClick={Recommendation?.cancel} className='w-[40px] h-[40px] flex justify-center items-center hover:bg-richblack-200 rounded-full cursor-pointer'><IoClose size={25} /></span>
    </div>
  )
}

export default Recommendation