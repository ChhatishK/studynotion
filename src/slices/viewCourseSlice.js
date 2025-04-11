import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    courseSectionData: [],
    entireCourseData: [],
    completedLectures: [],
    totalNoOfLectures: 0,
}

const viewCourseSlice = createSlice({
    name: 'viewCourse',
    initialState,
    reducers: {
        setCourseSectionData: (state, action) => {
            state.courseSectionData = action.payload
        },

        setEntireCourseData: (state, action) => {
            state.entireCourseData = action.payload
        },

        setCompletedLectures : (state, action) => {
            state.completedLectures = action.payload;
        },

        updateCompletedLectures: (state, action) => {
            state.completedLectures = [...state.completedLectures, action.payload]
        },

        updateTotalNoOfLectures: (state, action) => {
            state.totalNoOfLectures = action.payload
        }

    }
})

export const {setCourseSectionData, setEntireCourseData, setCompletedLectures, updateCompletedLectures, updateTotalNoOfLectures} = viewCourseSlice.actions;
export default viewCourseSlice.reducer;