import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';
import { useEffect, useState } from 'react';
import Recommendation from '../../../common/Recommendation';
import { useNavigate } from 'react-router-dom';

export default function Cart() {

    const {totalItems} = useSelector((state) => state.cart);

    const [recommendation, setRecommendation] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        if (totalItems === 0) {
            setRecommendation({
                text: "You have not enrolled courses",
                btnText: "Explore Courses",
                btnHandler: () => navigate('/catalog/web-development'),
                cancel: () => setRecommendation(null),
                setRecommendation: setRecommendation
            })
        }
    }, [])

    return (
        <>
            <div>
                <h1 className='text-3xl text-richblack-5 font-inter mb-14'>Cart</h1>
                <p className='text-richblack-300 py-2 border-b border-richblack-500'>{totalItems} Courses in  Cart</p>

                <div className='grid'>
                    {
                        totalItems > 0 ? 
                        (
                            <div className='mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row'>
                                <RenderCartCourses />
                                <RenderTotalAmount />
                            </div>
                        ) : 
                        (
                            <p className='text-3xl text-center text-richblack-200 mt-14'>Your Cart is Empty</p>
                        )
                    }
                </div>

                
            </div>

            {recommendation && <Recommendation Recommendation={recommendation} />}
        </>
    )
}