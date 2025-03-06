import React from 'react'

const stats = [
    {count: '5K', label: "Active Students"},
    {count: '10+', label: "Mentors"},
    {count: '200+', label: "Courses"},
    {count: '50+', label: "Awards"},
]

const StatsComponent = () => {
  return (
    <section className='mt-32 w-full '>
        <div className='flex justify-center items-center h-[150px] bg-richblack-700'>
            <div className='flex gap-x-64'>
                {
                    stats.map((data, index) => {
                        return (
                            <div key={index} className='flex flex-col items-center'>
                                <h1 className='text-3xl font-bold'>{data.count}</h1>
                                <h2 className='text-[16px] text-richblack-500 font-semibold'>{data.label}</h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default StatsComponent