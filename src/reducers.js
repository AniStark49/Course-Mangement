const initialState = {
    enrolledCourses: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ENROLL_COURSE': {
        const courseId = action.payload.courseId;
        if (!state.enrolledCourses.includes(courseId)) {
          return {
            ...state,
            enrolledCourses: [...state.enrolledCourses, courseId],
          };
        }
        return state;
      }
  
      case 'MARK_COURSE_COMPLETED': {
        const completedCourseId = action.payload.courseId;
        return {
          ...state,
          enrolledCourses: state.enrolledCourses.filter(
            (courseId) => courseId !== completedCourseId
          ),
        };
      }
  
      default:
        return state;
    }
  };
  
  export default rootReducer;
  