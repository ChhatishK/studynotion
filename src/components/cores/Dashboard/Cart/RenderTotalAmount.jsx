import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';
import { buyCourse } from '../../../../services/operations/StudentFeaturesAPI';
import { useNavigate } from 'react-router-dom';

const RenderTotalAmount = () => {

    const {total, cart} = useSelector((state) => state.cart);
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        console.log("Bought these courses: ", courses);
        // TODO: Update with payment gateway.
        if (courses) {
          purchaseCourses(courses);
        }
    }

    async function purchaseCourses(courses) {
      const res = await buyCourse(token, courses, user, navigate, dispatch)
    }

  return (
    <div className='p-6 h-[170px] w-[280px] bg-richblack-800 border border-richblack-700 rounded-lg flex flex-col gap-2'>
        <p className='text-base text-richblack-300'>Total: </p>
        <p className='text-2xl text-yellow-50 mb-4'>₹ {total}</p>

        <button
          onClick={handleBuyCourse}
          className='wf-full flex justify-center items-center py-2 rounded-lg bg-yellow-50 text-richblack-900 hover:scale-95 transition-all duration-200'
        >
          Buy Now
        </button>
    </div>
  )
}

export default RenderTotalAmount