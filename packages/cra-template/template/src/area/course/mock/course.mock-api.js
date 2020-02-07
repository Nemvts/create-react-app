// @flow
import { axiosResult, getAppSettings } from '@dealersocket/react-common';
import globToRe from 'glob-to-regexp';
import courses from './courses.json';

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

// This would be performed on the server in a real app. Just stubbing in.
const generateId = course => replaceAll(course.title, ' ', '-');

function saveCourse(courseToSave) {
  const course = { ...courseToSave }; // to avoid manipulating object passed in.

  // Simulate server-side validation
  const minCourseTitleLength = 1;
  if (course.title.length < minCourseTitleLength) {
    return axiosResult(
      null,
      `Title must be at least ${minCourseTitleLength} characters.`
    );
  }

  if (course.id) {
    const existingCourseIndex = courses.findIndex(c => c.id === course.id);
    courses.splice(existingCourseIndex, 1, course);
    return axiosResult(course);
  }
  // Just simulating creation here.
  // The server would generate ids and watchHref's for new courses in a real app.
  // Cloning so copy returned is passed by value rather than by reference.
  course.id = generateId(course);
  course.watchHref = `http://www.pluralsight.com/courses/${course.id}`;
  courses.push(course);
  return axiosResult(course, null, 201);
}

function deleteCourse(courseId) {
  const indexOfCourseToDelete = courses.findIndex(
    course => course.id === courseId
  );
  if (indexOfCourseToDelete !== -1) {
    courses.splice(indexOfCourseToDelete, 1);
  }
  return axiosResult();
}

export function mockApi(axiosMock: any) {
  axiosMock
    .onGet(`${getAppSettings().globalApiUrl}/sandbox/courses`)
    .reply(() => {
      return axiosResult(courses);
      // return axiosResult(null, 'my error!');
    });

  axiosMock
    .onAny(globToRe(`${getAppSettings().globalApiUrl}/sandbox/courses/*`))
    .reply(config => {
      switch (config.method) {
        case 'post':
        case 'put': {
          return saveCourse(JSON.parse(config.data));
        }
        case 'delete': {
          const id = config.url.substr(config.url.lastIndexOf('/') + 1);
          return deleteCourse(id);
        }
        default:
          return axiosResult(null, 'Mock API not implemented', 501);
      }
    });
}
