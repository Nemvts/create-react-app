// @flow
import { axiosResult } from '@dealersocket/react-common';
import globToRe from 'glob-to-regexp';
import defaultQuizzes from './quizzes.json';

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

let quizzes = clone(defaultQuizzes);

function createQuiz(operation) {
  let operand1;
  const operand2 = Math.floor(Math.random() * 9) + 1;
  switch (operation) {
    case '/':
    case ':':
      operand1 = operand2 ** 4;
      break;
    case '-':
      operand1 = operand2 * 9;
      break;
    default:
      operand1 = Math.floor(Math.random() * 4) + 1;
      break;
  }

  return {
    id: new Date().valueOf().toString(),
    operand1,
    operation,
    operand2,
  };
}

function deleteQuiz(quizId) {
  const indexToDelete = quizzes.findIndex(quiz => quiz.id === quizId);
  if (indexToDelete !== -1) {
    quizzes.splice(indexToDelete, 1);
  }
  return axiosResult();
}

export function mockApi(axiosMock: any) {
  axiosMock.onAny('https://ds-apis.net/training9/quizzes/reset').reply(() => {
    quizzes = clone(defaultQuizzes);
    return axiosResult(quizzes);
  });

  axiosMock.onAny('https://ds-apis.net/training9/quizzes').reply(config => {
    console.log('mock', config.url, config.method, config.data); // eslint-disable-line no-console
    switch (config.method) {
      case 'get':
        return axiosResult(quizzes);
      // return axiosResult(null, 'my error!');
      case 'put': {
        const newQuiz = createQuiz(config.data);
        quizzes.push(newQuiz);
        return axiosResult(newQuiz);
      }
      case 'delete': {
        quizzes = [];
        return axiosResult(null);
      }
      default:
        return axiosResult(null, `Method ${config.method} not supported`, 501);
    }
  });

  axiosMock
    .onDelete(globToRe('https://ds-apis.net/training9/quizzes/*'))
    .reply(config => {
      const id = config.url.substr(config.url.lastIndexOf('/') + 1);
      return deleteQuiz(id);
    });

  axiosMock
    .onPost('https://ds-apis.net/training9/quiz/compute')
    .reply(config => {
      const data = JSON.parse(config.data);
      const { operand1, operand2, operation } = data;
      let result;
      switch (operation) {
        case '+':
          result = operand1 + operand2;
          break;
        case '-':
          result = operand1 - operand2;
          break;
        case '*':
          result = operand1 * operand2;
          break;
        case ':':
        case '/':
          if (operand2 === 0) {
            return axiosResult(null, `Cannot divide by Zero`, 500);
          }
          result = operand1 / operand2;
          break;
        default:
          return axiosResult(null, `Operation ${operation} not supported`, 501);
      }
      return axiosResult({ value: result });
    });
}
