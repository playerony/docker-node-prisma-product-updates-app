import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import type {Request, Response, NextFunction} from 'express'
import type {User} from '@prisma/client'

export const createToken = ({id, name}: Pick<User, 'id' | 'name'>) => {
  const token = jwt.sign({id, name}, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })

  return token
}

export const protectMiddleware = (
  request: Request & {user?: User},
  response: Response,
  next: NextFunction,
) => {
  const fullToken = request.headers.authorization

  if (!fullToken) {
    return response.status(401).send('Unauthorized')
  }

  const [prefix, token] = fullToken.split(' ')
  if (prefix !== 'Bearer') {
    return response.status(401).send('Unauthorized')
  }

  try {
    const tokenPayload = jwt.verify(token, process.env.JWT_SECRET)
    console.log('tokenPayload', tokenPayload)
    request.user = tokenPayload
    next()
  } catch {
    return response.status(401).send('Unauthorized')
  }
}

export const comparePassword = async (password: string, hash: string) =>
  bcrypt.compare(password, hash)

export const hashPassword = async (password: string) =>
  bcrypt.hash(password, 10)
