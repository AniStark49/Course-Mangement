// actions.js
export const enrollCourse = (courseId) => ({
    type: 'ENROLL_COURSE',
    payload: { courseId },
  });
  
  export const markCourseCompleted = (courseId) => ({
    type: 'MARK_COURSE_COMPLETED',
    payload: { courseId },
  });
  