import React, { useEffect, useState } from 'react'
import Footer from '../components/cores/Footer/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/api';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import CourseSlider from '../components/cores/Catalog/CourseSlider';
import CourseCard from '../components/cores/Catalog/CourseCard';

const Catalog = () => {

    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    const [selectedTab, setSelectedTab] = useState(true)

    // Fetch all categories
    useEffect(() => {
        const getCategories = async () => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            // console.log("PRINTING RES: ", res.data.data);
            const category = res?.data?.data?.filter((ct) => ct.name.split(" ").join('-').toLowerCase() === catalogName);
            console.log("CATEGORY: ", category)
            console.log("CATALOG: ", catalogName);
            setCategoryId(category[0]._id)
        }
        getCategories()
    },[catalogName])

    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                const res = await getCatalogPageData(categoryId)
                setCatalogPageData(res);
                console.log("CATALOGPAGE_DATA: ",res)
            } catch (error) {
                console.log(error);
            }
        }

        if (categoryId) getCategoryDetails()
    }, [categoryId])

  return (
    <div className=''>


        {/* Section 1 */}
        <div className='mx-auto max-w-maxContentTab'>
            <p>{`Home / Catalog / `}
                <span className='text-yellow-50'>{catalogPageData?.selectedCategory?.name}</span>
            </p>
            <p className='text-xl'>{catalogPageData?.selectedCategory?.name}</p>
            <p>{catalogPageData?.selectedCategory?.description}</p>
        </div>

        <div>
            {/* Sectino 1 */}
            <h2 className='text-2xl'>Courses to get you started</h2>
            <div>
                <div className='flex gap-x-3 border-b-[1px] border-richblack-600'>

                    <p className={`cursor-pointer px-3 p-1 ${selectedTab ? "text-yellow-50 border-b-[2px]" : "text-richblack-5"}`}  onClick={() => setSelectedTab(prev => !prev)}>Most Popular</p>

                    <p className={`cursor-pointer px-3 p-1 ${!selectedTab ? "text-yellow-50 border-b-[2px]" : "text-richblack-5"}`} onClick={() => setSelectedTab(prev => !prev)}>New</p>

                </div>

                {/* <CourseSlider /> */}
                <div>
                    <CourseSlider courses={catalogPageData?.selectedCategory?.courses} />
                </div>
            </div>

            {/* Section 2 */}
            <div>
                <div>Top Courses in {catalogPageData?.selectedCategory?.name}</div>
                <div>
                    {/* <CourseSlider /> */}
                    <CourseSlider courses={catalogPageData?.data?.differentCategory?.courses} />
                </div>
            </div>

            {/* Section 3 */}
            <div>
                <div>Frequently Bought</div>

                <div className='py-8'>

                    <div className='grid grid-cols-1 lg:grid-cols-2'>

                        {
                            catalogPageData?.data?.mostSellingCourses?.slice(0,4).map((course, index) => (
                                <CourseCard course={course} key={index} Height={"h-[400px]"} />
                            ))
                        }

                    </div>

                </div>
            </div>

        </div>

        <Footer />

    </div>
  )
}

export default Catalog