import React, { memo } from 'react'
import Sidebar from '../components/cores/Dashboard/Sidebar'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import LoadingSpinner from '../components/common/LoadingSpinner'

const Dashboard = () => {
  const loadingState = useSelector((state) => ({
    authLoading: state.auth.loading,
    profileLoading: state.profile.loading
  }));

  if (loadingState.authLoading || loadingState.profileLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default memo(Dashboard);