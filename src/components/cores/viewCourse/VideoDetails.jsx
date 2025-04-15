import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { BigPlayButton, Player } from 'video-react';
import IconBtn from '../../common/IconBtn';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import toast from 'react-hot-toast';

const VideoDetails = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef(null);
  const {courseId, sectionId, subSectionId} = useParams();
  const {token} = useSelector((state) => state.auth);

  const {courseSectionData, entireCourseData, completedLectures} = useSelector((state) => state.viewCourse);
  const [videoData, setVideoData] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  // console.log("Section Data: ", courseSectionData);
  // console.log("Course Data: ", entireCourseData)

  useEffect(() => {
    ;(() => {
      setLoading(true);
      if (courseSectionData.length === 0) return;
      else if (!courseId && !sectionId && !subSectionId) {
        navigate('/dashboard/enrolled-courses');
      } else {

        // current Section
        const currentSection = courseSectionData.filter((section) => section._id === sectionId)
        // console.log("Current Section: ", currentSection)

        // current Lecture
        const currentLecture = currentSection?.[0]?.subSection.filter((subsection) => subsection._id === subSectionId);

        // console.log("Current Lecture: ", currentLecture);

        // set video to play
        setVideoData(currentLecture[0]);
        setPreviewSource(entireCourseData.thumbnail);
        setVideoEnded(false);
      }
      setLoading(false)

    })()
  }, [courseSectionData, entireCourseData, location.pathname]);

  function isFirstVideo() {
    const currentSectionIdx = courseSectionData.findIndex((data) => data._id === sectionId);
    const currentLectureIdx = courseSectionData[currentSectionIdx]?.subSection.findIndex((data) => data._id === subSectionId);

    if (currentSectionIdx === 0 && currentLectureIdx === 0) return true;
    
    return false;
    
  }

  function isLastVideo() {
    const currentSectionIdx = courseSectionData.findIndex((data) => data._id === sectionId);
    const currentLectureIdx = courseSectionData[currentSectionIdx]?.subSection.findIndex((data) => data._id === subSectionId);

    // total lectures in current section
    const totalLectures = courseSectionData[currentSectionIdx].subSection.length;

    if (currentSectionIdx === courseSectionData.length-1 && currentLectureIdx === totalLectures-1) return true;
    
    return false;
  }

  function nextVideo() {
    const currentSectionIdx = courseSectionData.findIndex((data) => data._id === sectionId);

    const currentLectureIdx = courseSectionData[currentSectionIdx].subSection.findIndex((data) => data._id === subSectionId);

    const totalLectures = courseSectionData[currentSectionIdx].subSection.length;

    if (currentLectureIdx !== totalLectures - 1) {
      const nextLectureId = courseSectionData[currentSectionIdx].subSection[currentLectureIdx+1]._id;

      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextLectureId}`);
    } else {
      const nextSectionId = courseSectionData[currentSectionIdx + 1]._id;

      const nextLectureId = courseSectionData[currentSectionIdx + 1].subSection[0]._id;

      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextLectureId}`);
    }
  }

  function previousVideo() {
    const currentSectionIdx = courseSectionData.findIndex((data) => data._id === sectionId);

    const currentLectureIdx = courseSectionData[currentSectionIdx].subSection.findIndex((data) => data._id === subSectionId);

    if (currentLectureIdx !== 0) {
      const previousLectureId = courseSectionData[currentSectionIdx].subSection[currentLectureIdx-1]._id;

      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${previousLectureId}`);
    } else {
      const previousSectionId = courseSectionData[currentSectionIdx-1]._id;

      const previousSectionLength = courseSectionData[currentSectionIdx-1].subSection.length;

      const previousLectureId = courseSectionData[currentSectionIdx-1].subSection[previousSectionLength-1]._id;

      navigate(`/view-course/${courseId}/section/${previousSectionId}/sub-section/${previousLectureId}`);
    }
  }

  // console.log("Video Data: ", videoData);

  async function handleLectureCompletion() {
    setLoading(true)
    const res = await markLectureAsComplete({courseId: courseId, subSectionId: subSectionId}, token);
    // console.log("Res after completing lecture",res)

    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }

    setLoading(false);
  }

  return (
    <div className='flex flex-col text-white'>

      <div className='flex justify-between mt-5 mb-4 gap-3'>
        <button onClick={() => navigate('/dashboard/enrolled-courses')}
          className='blackButton'
          >
          Back
        </button>
        <div className='flex gap-4'>
          <button
          className={`blackButton`}
          onClick={() => {
            !isFirstVideo && previousVideo
            toast.error("You are on first Lecture.")
          }}
          disabled={loading}
          >
            Prev
          </button>

          <button
            className={`yellowButton ${isLastVideo ? "cursor-not-allowed" : "cursor-pointer"}`}
            disabled={loading}
            onClick={() => {
              !isLastVideo && nextVideo
              toast.error("You are on last video.")
            }}
          >
            Next
          </button>
        </div>
          
      </div>
      
      {!videoData ? (
        <img 
          src={previewSource} 
          alt='Preview' 
          className='h-full w-full rounded-md object-cover'
        />

      ): (
        <Player 
          src={videoData.videoUrl}
          onEnded={() => setVideoEnded(true)}
          aspectRatio="16:9"
          ref={playerRef}
          playsInline
         >
          <source src={videoData?.videoUrl}/>
          <BigPlayButton position='center' />

          {videoEnded && (
            <div
             style={{backgroundImage: "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",}}
             className='full absolute inset-0 z-[100] h-full flex flex-col gap-3 justify-center items-center font-inter'
            >
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onClick={() => handleLectureCompletion()}
                  text={!loading? "Mark As Complete" : "Loading"}
                >{" "}</IconBtn>
              )}

              <IconBtn
                disabled={loading}
                text="Rewatch"
                onClick={() => {
                  if (playerRef?.current) {
                    playerRef?.current?.seek(0);
                    setVideoEnded(false)
                  }
                }}
              >{" "}</IconBtn>

              <div>
                {!isFirstVideo() && (
                  <button
                  className='blackButton'
                  onClick={previousVideo}
                  disabled={loading}
                  >
                    Prev
                  </button>
                )}

                {!isLastVideo() && (
                  <button
                   className='blackButton'
                   disabled={loading}
                   onClick={nextVideo}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
         </Player>
      )}

      <h1 className='text-3xl mt-4 font-semibold'>{videoData?.title}</h1>
      <span className='text-sm text-richblack-300 pb-6 pt-2'>{videoData?.description}</span>
      
    </div>
  )
}

export default VideoDetails