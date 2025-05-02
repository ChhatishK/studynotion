import { useEffect, useState, memo } from 'react'
import VideoDetailsSidebar from '../components/cores/viewCourse/VideoDetailsSidebar';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFullCourseDetails } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, updateTotalNoOfLectures } from '../slices/viewCourseSlice';
import CourseReviewModal from '../components/cores/viewCourse/CourseReviewModal';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ViewCourse = memo(() => {
    const [reviewModal, setReviewModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

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
        const fetchCourseData = async () => {
            try {
                setIsLoading(true);
                const courseData = await fetchFullCourseDetails({courseId}, token);
                
                if (courseData) {
                    dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
                    dispatch(setEntireCourseData(courseData?.courseDetails));
                    dispatch(setCompletedLectures(courseData?.completedVideos));
                    
                    let lectures = 0;
                    courseData?.courseDetails?.courseContent?.forEach((section) => {
                        lectures += section.subSection.length;
                    });
                    dispatch(updateTotalNoOfLectures(lectures));
                }
            } catch (error) {
                console.error("Error fetching course data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourseData();
    }, [courseId, token, dispatch]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-richblack-900">
            <div className='relative flex items-center h-[calc(100vh - 3.5rem)]'>
                <VideoDetailsSidebar setReviewModal={setReviewModal} />
                <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                    <div className="mx-auto w-11/12 py-10">
                        <Outlet />
                    </div>
                </div>
            </div>

            {reviewModal && (
                <CourseReviewModal 
                    setReviewModal={setReviewModal} 
                />
            )}
        </div>
    );
});

export default ViewCourse;