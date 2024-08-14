import type {Request, Response, NextFunction} from 'express'
import {validationResult} from 'express-validator'
import {BaseError, ValidationError} from './error.js'

export const handleExpressValidatorErrorsMiddleware = (
  request: Request,
  _: Response,
  next: NextFunction,
) => {
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    next(new ValidationError(JSON.stringify(errors.array())))
    return
  }

  next()
}

export const globalErrorHandlerMiddleware = (
  error: Error | BaseError,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error instanceof BaseError) {
    return response.status(error.statusCode).json({
      name: error.name,
      stack: error.stack,
      status: error.status,
      message: error.message,
    })
  }

  response.status(500).json({
    status: 'error',
    message: error.message,
  })
}
