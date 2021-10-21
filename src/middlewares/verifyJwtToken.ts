import jwt from 'express-jwt'

export const verifyJwtToken = () => {
  return jwt({
    secret: process.env.AUTH_SECRET || 'thisisasecretkey',
    algorithms: ['HS256'],
    getToken: (req) => req.cookies.dgNOTES
  })
}
