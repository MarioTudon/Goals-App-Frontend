class APIError extends Error {
  constructor(message, error) {
    super(message)
    this.name = 'APIError'
    this.error = error
    Error.captureStackTrace(this, this.constructor)
  }
}

export default { APIError }