import HttpException from '../types/httpException'
import { NextFunction, Request, Response } from 'express'

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log('lili', error)
  const status = error.status || 500
  const message = error.message || 'Something went wrong'
  response.status(status).json({
    status,
    message
  })
}
