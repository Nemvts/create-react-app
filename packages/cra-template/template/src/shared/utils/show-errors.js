// @flow
import { toastr } from 'react-redux-toastr';

export function showReason(reason: any) {
  showError(reason);
}

export function showError(error: any) {
  let logTitle = 'Error';
  let msgObj = error;
  if (error.response && error.response.data) {
    msgObj = error.response.data;
    logTitle = error.toString();
  }
  const msg = msgObj.message ? msgObj.message : msgObj.toString();
  toastr.error(msg);
  // eslint-disable-next-line no-console
  console.error(logTitle, '-', msg);
}

export function showErrors(promise: any) {
  return promise.catch(reason => {
    showError(reason);
    // Return new rejected promise
    return Promise.reject(reason);
  });
}
