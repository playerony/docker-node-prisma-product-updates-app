import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import type {Request, Response, NextFunction} from 'express'
import type {User} from '@prisma/client'
import {UnauthorizedError} from './error.js'

export const createToken = ({id, name}: Pick<User, 'id' | 'name'>) => {
  const token = jwt.sign({id, name}, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })

  return token
}

export const protectMiddleware = (
  request: Request & {user?: Pick<User, 'id' | 'name'>},
  response: Response,
  next: NextFunction,
) => {
  const fullToken = request.headers.authorization

  if (!fullToken) {
    throw new UnauthorizedError('Unauthorized')
  }

  const [prefix, token] = fullToken.split(' ')
  if (prefix !== 'Bearer') {
    throw new UnauthorizedError('Unauthorized')
  }

  try {
    const tokenPayload = jwt.verify(token, process.env.JWT_SECRET)

    if (typeof tokenPayload === 'object') {
      request.user = {
        id: tokenPayload.id as string,
        name: tokenPayload.name as string,
      }
    }

    next()
  } catch {
    throw new UnauthorizedError('Unauthorized')
  }
}

export const comparePassword = async (password: string, hash: string) =>
  bcrypt.compare(password, hash)

export const hashPassword = async (password: string) =>
  bcrypt.hash(password, 10)
