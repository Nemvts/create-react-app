// @flow
import { axiosResult, getAppSettings } from '@dealersocket/react-common';
import globToRe from 'glob-to-regexp';
import students from './dallas-students.json';

function deleteStudent(studentId) {
  const indexOfStudentToDelete = students.findIndex(
    student => student.id === studentId
  );
  if (indexOfStudentToDelete !== -1) {
    students.splice(indexOfStudentToDelete, 1);
  }
  return axiosResult();
}

function deleteStudents(studentIds: number[]) {
  studentIds.forEach(studentId => {
    deleteStudent(studentId);
  });
  return axiosResult();
}

export function mockApi(axiosMock: any) {
  axiosMock
    .onGet(`${getAppSettings().globalApiUrl}/sandbox/students`)
    .reply(() => {
      return axiosResult(students);
      // return axiosResult(null, 'my error!');
    })
    .onDelete(`${getAppSettings().globalApiUrl}/sandbox/students`)
    .reply(config => {
      // console.log('data', config.data, typeof config.data);
      return deleteStudents(JSON.parse(config.data));
      // return axiosResult(null, 'my error!');
    });

  axiosMock
    .onAny(globToRe(`${getAppSettings().globalApiUrl}/sandbox/students/*`))
    .reply(config => {
      switch (config.method) {
        case 'delete': {
          const id = config.url.substr(config.url.lastIndexOf('/') + 1);
          return deleteStudent(parseInt(id, 10));
        }
        default:
          return axiosResult(null, 'Mock API not implemented', 501);
      }
    });
}
