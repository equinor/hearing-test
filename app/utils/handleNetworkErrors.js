import { addToast } from './addToastByType';

const invalidRequestMessage = 'Invalid request';
const notAuthorizedMessage = 'User is not authorized to access this';
const notPermissionToViewMessage =
  'Your user does not have permission to view this feed. Please contact support.';
const genericErrorMessage = 'An error happened';
const processingErrorMessage = 'The API is having trouble processing this request.';

export default function handleError(ex) {
  // eslint-disable-next-line no-console
  console.log(ex);
  if (ex.status === 400) {
    addToast({ text: invalidRequestMessage, type: 'ERROR' });
  } else if (ex.status === 401) {
    addToast({ text: notAuthorizedMessage, type: 'ERROR' });
  } else if (ex.status === 403) {
    addToast({ text: notPermissionToViewMessage, type: 'ERROR' });
  } else if (ex.status === 500) {
    addToast({ text: processingErrorMessage, type: 'ERROR' });
  } else {
    addToast({ text: genericErrorMessage, type: 'ERROR' });
  }
}
