import React, { useState } from 'react'

import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2'

Chart.register(...registerables);

const InstructorChart = ({courses}) => {

    const [currChart, setCurrChart] = useState("students");;

    function getRandomColor(numColors) {
        let colors = [];

        for (let i = 0; i < numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`

            colors.push(color)
        }

        return colors;

    }

    // create data for chart displaying students info
    const chartDataFroStudent = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor: getRandomColor(courses.length)
            }
        ]
    }

    // create data for chart displaying income info
    const chartDataForIncome = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalAmountEarned),
                backgroundColor: getRandomColor(courses.length)
            }
        ]
    }

    // create options
    const options = {

    }

  return (
    <div className='lg:w-[750px] h-[600px] bg-richblack-800 p-6 rounded-lg'>
        <div className='flex flex-col gap-4'>
            <h1 className='text-xl font-semibold'>Visualize</h1>

            <div className='flex gap-2'>
                <button onClick={() => setCurrChart("students")} className={`px-3 p-1 font-bold transition-all duration-400 ${currChart === 'students' ? "text-yellow-50 bg-richblack-700 rounded-sm" : "hover:bg-richblack-700 text-yellow-400"}`}>Students</button>
                <button onClick={() => setCurrChart('income')} className={`px-3 p-1 font-bold transition-all duration-400 ${currChart === 'income' ? "text-yellow-50 bg-richblack-700 rounded-sm" : "hover:bg-richblack-700 text-yellow-400"}`}>Income</button>
            </div>
            
            <div className='w-[400px] h-[400px] mx-auto'>
                <Pie 
                    data={currChart === 'students' ? chartDataFroStudent : chartDataForIncome}
                    options={options}
                    className='w-[400px] h-[400px]'
                />
            </div>

        </div>
    </div>
  )
}

export default InstructorChart