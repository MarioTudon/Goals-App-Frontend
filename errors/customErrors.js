class APIError extends Error {
  constructor(message, error) {
    super(message)
    this.error = error
    Error.captureStackTrace(this, this.constructor)
  }
}

class AppError extends Error {
  constructor(message, error) {
    super(message)
    this.error = error
    Error.captureStackTrace(this, this.constructor)
  }
}

export default { APIError, AppError }