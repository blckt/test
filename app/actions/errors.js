export function throwError(err) {
  if (err instanceof Error) {
    return {
      type: 'ERROR',
      payload: { error: err }
    }
  }

  if (typeof err === 'string') {
    return {
      type: 'ERROR',
      payload: {
        error: new Error(err)
      }
    }
  }
}
