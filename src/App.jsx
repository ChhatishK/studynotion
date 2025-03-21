import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Verify from './pages/Verify'
import ResetPassword from './pages/ResetPassword'
import ResendEmail from './pages/ResendEmail'
import ChooseNewPassword from './pages/ChooseNewPassword'
import ResetComplete from './pages/ResetComplete'
import Navbar from './components/common/Navbar'
import OpenRoute from './components/cores/Auth/openRoute'

import Dashboard from './pages/Dashboard'
import MyProfile from './components/cores/Dashboard/MyProfile'

import About from './pages/About';

import PrivateRoute from './components/cores/Auth/PrivateRoute'

import Error from './pages/Error'
import Settings from './components/cores/Dashboard/Settings'
import Contactus from './pages/Contactus'
import EnrolledCourse from './components/cores/Dashboard/EnrolledCourse' 
import Cart from './components/cores/Dashboard/Cart/Cart'

import { ACCOUNT_TYPE } from './utils/constants'
import { useSelector } from 'react-redux'
import {AddCourse} from './components/cores/Dashboard/AddCourses/index'
import MyCourses from './components/cores/Dashboard/MyCourses'
import EditCourse from './components/cores/Dashboard/AddCourses/EditCourse'

const App = () => {

  const {user} = useSelector((state) => state.profile);

  return (
    <div className="relative w-screen min-h-screen bg-richblack-900 flex flex-col font-medium text-richblack-5">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route 
          path='/login' 
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route 
          path='/signup' 
          element={<OpenRoute><Signup /></OpenRoute> }>
        </Route>

        <Route path='/verify' element={<Verify />}></Route>
        <Route path='reset-password' element={<ResetPassword />}></Route>
        <Route path='/resend-email' element={<ResendEmail />}></Route>

        <Route path='/update-password/:id' element={
          <OpenRoute>
            <ChooseNewPassword />
          </OpenRoute>}>
        </Route>

        <Route path='/reset-complete' element={<ResetComplete />}></Route>

        <Route path='/about' element={<About />}></Route>

        <Route
        
         element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
         } 
         >

          <Route path='/dashboard/my-profile' 
          element={
            <MyProfile />
          } />

          <Route path='/dashboard/settings' 
          element={
            <Settings />
          } />

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT &&
            <>
              <Route path='/dashboard/enrolled-courses' element={<EnrolledCourse />} />

              <Route path='/dashboard/cart' element={<Cart />} />
            </>
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR &&
            <>
              <Route path='/dashboard/add-course' element={<AddCourse />} />
              <Route path='/dashboard/my-courses' element={<MyCourses /> } />
              <Route path='/dashboard/edit-course/:courseId' element={<EditCourse />} />
            </>
          }

          <Route path='/dashboard/*' element={<Error />} />


         </Route>

      <Route path='*' element={<Error />} />

       <Route path='/contact' element={<Contactus />} />

      </Routes>

    </div>
  )
}

export default App
