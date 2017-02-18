export function throwError(err) {
  let error;
  if (typeof err === 'string') {
    error = new Error(err);
  }

  let notification = new Notification('ERROR', {
    body: error.message
  });
  return {
    type: 'ERROR',
    payload: { error }
  };
}
