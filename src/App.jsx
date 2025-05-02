import React, { lazy, Suspense } from 'react'
import {Routes, Route} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from './utils/constants'
import Navbar from './components/common/Navbar'
import OpenRoute from './components/cores/Auth/openRoute'
import PrivateRoute from './components/cores/Auth/PrivateRoute'
import LoadingSpinner from './components/common/LoadingSpinner'
import useDocumentTitle from './hooks/useDocumentTitle'

// Lazy load all route components
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Verify = lazy(() => import('./pages/Verify'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))
const ResendEmail = lazy(() => import('./pages/ResendEmail'))
const ChooseNewPassword = lazy(() => import('./pages/ChooseNewPassword'))
const ResetComplete = lazy(() => import('./pages/ResetComplete'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const MyProfile = lazy(() => import('./components/cores/Dashboard/MyProfile'))
const About = lazy(() => import('./pages/About'))
const Error = lazy(() => import('./pages/Error'))
const Settings = lazy(() => import('./components/cores/Dashboard/Settings'))
const Contactus = lazy(() => import('./pages/Contactus'))
const EnrolledCourse = lazy(() => import('./components/cores/Dashboard/EnrolledCourse'))
const Cart = lazy(() => import('./components/cores/Dashboard/Cart/Cart'))
const AddCourse = lazy(() => import('./components/cores/Dashboard/AddCourses').then(module => ({ default: module.AddCourse })))
const MyCourses = lazy(() => import('./components/cores/Dashboard/MyCourses'))
const EditCourse = lazy(() => import('./components/cores/Dashboard/AddCourses/EditCourse'))
const Catalog = lazy(() => import('./pages/Catalog'))
const CourseDetails = lazy(() => import('./pages/CourseDetails'))
const ViewCourse = lazy(() => import('./pages/ViewCourse'))
const VideoDetails = lazy(() => import('./components/cores/viewCourse/VideoDetails'))
const Instructor = lazy(() => import('./components/cores/Dashboard/instructorDashboard/Instructor'))

const App = () => {
  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  
  // Add the document title hook
  useDocumentTitle();

  return (
    <div className="relative w-screen min-h-screen bg-richblack-900 flex flex-col font-medium text-richblack-50">
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog/:catalogName" element={<Catalog />} />
          <Route path='/courses/:courseId' element={<CourseDetails />} />

          <Route path='/login' element={<OpenRoute><Login /></OpenRoute>} />
          <Route path='/signup' element={<OpenRoute><Signup /></OpenRoute>} />
          <Route path='/verify' element={<Verify />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='/resend-email' element={<ResendEmail />} />
          <Route path='/update-password/:id' element={<OpenRoute><ChooseNewPassword /></OpenRoute>} />
          <Route path='/reset-complete' element={<ResetComplete />} />
          <Route path='/about' element={<About />} />

          <Route element={<PrivateRoute><Dashboard /></PrivateRoute>}>
            <Route path='/dashboard/my-profile' element={<MyProfile />} />
            <Route path='/dashboard/settings' element={<Settings />} />

            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path='/dashboard/enrolled-courses' element={<EnrolledCourse />} />
                <Route path='/dashboard/cart' element={<Cart />} />
              </>
            )}

            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path='/dashboard/add-course' element={<AddCourse />} />
                <Route path='/dashboard/my-courses' element={<MyCourses />} />
                <Route path='/dashboard/instructor' element={<Instructor />} />
                <Route path='/dashboard/edit-course/:courseId' element={<EditCourse />} />
              </>
            )}

            <Route path='/dashboard/*' element={<Error />} />
          </Route>

          <Route element={<PrivateRoute><ViewCourse /></PrivateRoute>}>
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <Route 
                path='view-course/:courseId/section/:sectionId/sub-section/:subSectionId' 
                element={<VideoDetails />} 
              />
            )}
          </Route>

          <Route path='*' element={<Error />} />
          <Route path='/contact' element={<Contactus />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
