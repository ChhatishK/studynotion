import { useEffect, useState } from 'react'
import VideoDetailsSidebar from '../components/cores/viewCourse/VideoDetailsSidebar';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFullCourseDetails } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, updateTotalNoOfLectures, } from '../slices/viewCourseSlice';
import CourseReviewModal from '../components/cores/viewCourse/CourseReviewModal';

function ViewCourse() {

    const [reviewModal, setReviewModal] = useState(false);

    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const {courseId} = useParams();

    // const {
    //     courseSectionData,
    //     entireCourseData,
    //     completedLectures,
    //     totalNoOfLectures,
    // } = useSelector((state) => state.viewCourse);

    // console.log("ViewCourse : ", entireCourseData, courseSectionData, completedLectures, totalNoOfLectures)

    useEffect(() => {
        ;(async () => {
            const courseData = await fetchFullCourseDetails({courseId}, token);
            console.log("Course Data", courseData)
            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
            dispatch(setEntireCourseData(courseData?.courseDetails));
            dispatch(setCompletedLectures(courseData?.completedVideos));
            
            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((section) => {
                lectures += section.subSection.length;
            })

            dispatch(updateTotalNoOfLectures(lectures));
        })()
    }, [])

  return (
    <div>
        <div className='flex relative min-h-[calc[100vh-3.5rem)] '>
            <VideoDetailsSidebar setReviewModal={setReviewModal} />
            <div className='flex-1 min-h-[calc(100vh-3.5rem)] overflow-auto'>
                <div className='mx-6'>
                    <Outlet />
                </div>
            </div>
        </div>

        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}

    </div>
  )
}

export default ViewCourse