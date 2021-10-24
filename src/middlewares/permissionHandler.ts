import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const permissionHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log('ggggg', request.params)
  if (request.params.userId) {
    const token = request.cookies.dgNOTES
    const decoded: any = jwt.verify(
      token,
      process.env.AUTH_SECRET ?? 'thisisasecretkey'
    )

    if (request.params.userId === decoded.id) {
      console.log('goood')
      response.status(401).json({
        status: 401,
        message: 'No permission'
      })
    }
  }
}
