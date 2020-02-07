// @flow
/* eslint-disable global-require */
export function mock(appAxios: any) {
  const MockAdapter = require('axios-mock-adapter');
  const axiosMock = new MockAdapter(appAxios, { delayResponse: 800 });

  require('area/author/mock/author.mock-api').mockApi(axiosMock);
  require('area/course/mock/course.mock-api').mockApi(axiosMock);
  require('area/dallas-class/mock/dallas-students.mock-api').mockApi(axiosMock);
  require('area/dnd-demo/mock/dnd-demo.mock-api').mockApi(axiosMock);
  require('area/playground/andrea/mock/andrea.mock-api').mockApi(axiosMock);
  require('area/playground/leo/mock/todo.mock-api').mockApi(axiosMock);
  require('area/training/lessons/8-remote-and-mock-api/mock/quiz.mock-api').mockApi(
    axiosMock
  );
  require('area/training/lessons/9-add-features/mock/quiz.mock-api').mockApi(
    axiosMock
  );

  // require('area/github-explorer/mock/github.mock-api').mockApi(axiosMock);
  axiosMock.onAny().passThrough();
}
/* eslint-enable global-require */
