import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const permissionHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (request.query.userId) {
    const token = request.cookies.dgNOTES
    const decoded: any = jwt.verify(
      token,
      process.env.AUTH_SECRET ?? 'thisisasecretkey'
    )

    if (request.query.userId !== decoded.id) {
      response.status(401).json({
        status: 401,
        message: 'No permission'
      })
    } else {
      next()
    }
  } else {
    next()
  }
}
