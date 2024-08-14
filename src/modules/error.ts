export class BaseError extends Error {
  statusCode: number
  status: 'error' | 'fail'
  isOperational: boolean

  constructor(message: string, statusCode = 500, name = 'BaseError') {
    super(message)
    this.name = name
    this.isOperational = true
    this.statusCode = statusCode
    this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error'

    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends BaseError {
  constructor(message: string) {
    super(message, 400, 'ValidationError')
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404, 'NotFoundError')
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, 401, 'UnauthorizedError')
  }
}
